const mongoose = require('mongoose');

const exportInquirySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
        },
        country: {
            type: String,
            required: [true, 'Please provide your country'],
        },
        contactPerson: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true,
        },
        phone: {
            type: String,
        },
        productInterested: {
            type: String,
        },
        quantity: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.ExportInquiry || mongoose.model('ExportInquiry', exportInquirySchema);
