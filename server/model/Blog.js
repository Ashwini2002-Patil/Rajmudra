const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Please provide a slug'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Please provide content'],
        },
        coverImage: {
            type: String,
        },
        author: {
            type: String,
        },
        tags: {
            type: [String],
            default: [],
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
