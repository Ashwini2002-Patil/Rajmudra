const mongoose = require('mongoose');

const sampleRequestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Please provide your phone number'],
        },
        companyName: {
            type: String,
        },
        productInterested: {
            type: String,
            enum: ['Makhana', 'Moringa Powder', 'Spices', 'Other Agro Products'],
            default: 'Makhana',
        },
        addressLine1: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'contacted', 'sample-sent', 'closed'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.SampleRequest || mongoose.model('SampleRequest', sampleRequestSchema);
