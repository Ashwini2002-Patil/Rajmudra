const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a certification name'],
            trim: true,
        },
        certificateImage: {
            type: String,
        },
        issuedBy: {
            type: String,
        },
        validTill: {
            type: Date,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
