const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../model/Admin');
const Otp = require('../model/Otp');
const { sendOtpEmail } = require('../utils/mailer');

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;

const generateToken = (admin) => {
    return jwt.sign(
        { id: admin._id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

const sendTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

// Creates/replaces the OTP record for an email+purpose and emails the code.
const issueOtp = async (email, purpose) => {
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({ email, purpose });
    await Otp.create({
        email,
        purpose,
        otpHash,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
    });

    await sendOtpEmail(email, otp, purpose);
};

// Looks up + validates an OTP record, incrementing attempts on mismatch.
// Returns the record on success, or { error, status } on failure.
const consumeOtp = async (email, purpose, enteredOtp) => {
    const record = await Otp.findOne({ email, purpose });

    if (!record) {
        return { error: 'OTP expired or not requested. Please request a new one.', status: 400 };
    }

    if (record.attempts >= MAX_OTP_ATTEMPTS) {
        await record.deleteOne();
        return { error: 'Too many incorrect attempts. Please request a new OTP.', status: 429 };
    }

    const isMatch = await record.matchOtp(enteredOtp);
    if (!isMatch) {
        record.attempts += 1;
        await record.save();
        return { error: 'Invalid OTP', status: 400 };
    }

    await record.deleteOne();
    return { record };
};

// @desc    Register a new admin — direct, no OTP (only login is OTP-gated).
// @route   POST /api/auth/register
// @access  Public
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: name, email, password',
            });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists with this email',
            });
        }

        const admin = await Admin.create({ name, email, password, phone });

        // Only switch the browser's session cookie to the new admin when
        // nobody was logged in already (e.g. a one-off bootstrap script).
        if (!req.admin) {
            const token = generateToken(admin);
            sendTokenCookie(res, token);
        }

        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Register error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', '),
            });
        }

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Step 1 of login — verify email+password, email an OTP.
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // password field 'select: false' aahe, tyamule explicitly select kar
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                success: false,
                message: 'This account has been deactivated',
            });
        }

        await issueOtp(admin.email, 'login');

        res.status(200).json({
            success: true,
            otpRequired: true,
            message: 'OTP sent to your email. It expires in 10 minutes.',
            data: { email: admin.email },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Step 2 of login — verify OTP, issue the session cookie.
// @route   POST /api/auth/login/verify-otp
// @access  Public
const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
        }

        const { error, status } = await consumeOtp(email.toLowerCase(), 'login', otp);
        if (error) {
            return res.status(status).json({ success: false, message: error });
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin || !admin.isActive) {
            return res.status(403).json({ success: false, message: 'Account not found or deactivated' });
        }

        const token = generateToken(admin);
        sendTokenCookie(res, token);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Verify login OTP error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
const logoutAdmin = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};

// @desc    Get logged-in admin's own profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found',
            });
        }

        res.status(200).json({
            success: true,
            data: admin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    verifyLoginOtp,
    logoutAdmin,
    getMe,
};
