const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true,
        },
        phone: {
            type: String,
        },
        subject: {
            type: String,
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactSchema);
