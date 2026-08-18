const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        category: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
