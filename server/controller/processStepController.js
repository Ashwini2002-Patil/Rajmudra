const ProcessStep = require('../model/ProcessStep');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Add process step
// @route   POST /api/process-steps
// @access  Private/Admin
const createProcessStep = async (req, res) => {
    try {
        const { title, description } = req.body;

        const data = { ...req.body };

        // If an image file came in (multipart/form-data), push it to Cloudinary
        // right here and store the returned secure URL on the process step.
        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'rajmudar/process-steps');
            data.image = result.secure_url;
        }

        if (!title || !description || !data.image) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: title, description, image',
            });
        }

        const step = await ProcessStep.create(data);

        res.status(201).json({
            success: true,
            message: 'Process step added successfully',
            data: step,
        });
    } catch (error) {
        console.error('Create process step error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', '),
            });
        }

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all process steps (ordered)
// @route   GET /api/process-steps
// @access  Public
const getAllProcessSteps = async (req, res) => {
    try {
        const steps = await ProcessStep.find().sort({ order: 1, createdAt: 1 });

        res.json({
            success: true,
            count: steps.length,
            data: steps,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete process step
// @route   DELETE /api/process-steps/:id
// @access  Private/Admin
const deleteProcessStep = async (req, res) => {
    try {
        const step = await ProcessStep.findById(req.params.id);

        if (!step) {
            return res.status(404).json({
                success: false,
                message: 'Process step not found',
            });
        }

        await step.deleteOne();

        res.json({
            success: true,
            message: 'Process step deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createProcessStep,
    getAllProcessSteps,
    deleteProcessStep,
};
