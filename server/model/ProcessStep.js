const mongoose = require('mongoose');

// Powers the "Our Process" section on the About page (client/src/pages/About.jsx).
// icon is a key resolved to a react-icon on the frontend — see ICON_MAP there.
const processStepSchema = new mongoose.Schema(
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
        icon: {
            type: String,
            enum: ['mapPin', 'filter', 'shield', 'settings', 'package', 'truck'],
            default: 'package',
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

module.exports = mongoose.models.ProcessStep || mongoose.model('ProcessStep', processStepSchema);
