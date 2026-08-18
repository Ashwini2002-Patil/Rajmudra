const mongoose = require('mongoose');

// Powers the "Export-Grade Makhana Range" section on the Home page
// (client/src/components/home/CategoryShowcase.jsx). Distinct from the main
// Product catalog model (Projuct.js) — this is the curated homepage teaser.
const showcaseProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        image: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        specs: {
            type: [
                {
                    label: { type: String, required: true },
                    value: { type: String, required: true },
                    _id: false,
                },
            ],
            default: [],
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.models.ShowcaseProduct || mongoose.model('ShowcaseProduct', showcaseProductSchema);
