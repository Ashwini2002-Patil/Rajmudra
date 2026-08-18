const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const {
    registerAdmin,
    loginAdmin,
    verifyLoginOtp,
    logoutAdmin,
    getMe,
} = require('../controller/authController');

router.post('/register', registerAdmin); // public — anyone can self-register as admin, no OTP

// Login requires an OTP after password verification (2FA).
router.post('/login', loginAdmin);
router.post('/login/verify-otp', verifyLoginOtp);

router.post('/logout', logoutAdmin);
router.get('/me', protect, getMe);

module.exports = router;
