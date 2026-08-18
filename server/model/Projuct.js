const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
        },
        category: {
            type: String,
            enum: ['Makhana'],
            required: [true, 'Please provide a category'],
        },
        description: {
            type: String,
        },
        images: {
            type: [String],
            default: [],
        },
        price: {
            type: Number,
        },
        unit: {
            type: String,
        },
        packagingOptions: {
            type: [String],
            default: [],
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
