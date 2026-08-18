const mongoose = require('mongoose');

const oemInquirySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
        },
        contactPerson: {
            type: String,
            required: [true, 'Please provide contact person name'],
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
        quantityRequired: {
            type: String,
        },
        packagingRequirement: {
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
    mongoose.models.OEMInquiry || mongoose.model('OEMInquiry', oemInquirySchema);
