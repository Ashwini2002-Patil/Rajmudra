const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Short-lived OTP codes for admin login verification (2FA, after password).
// The `expiresAt` TTL index lets MongoDB auto-delete expired documents —
// no cron/cleanup job needed.
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    purpose: {
        type: String,
        enum: ['login'],
        required: true,
    },
    otpHash: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
        default: 0,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 },
    },
});

otpSchema.methods.matchOtp = async function (enteredOtp) {
    return bcrypt.compare(enteredOtp, this.otpHash);
};

module.exports = mongoose.models.Otp || mongoose.model('Otp', otpSchema);
