const Certification = require('../model/Certification');

// @desc    Add certification
// @route   POST /api/certifications
// @access  Private/Admin
const createCertification = async (req, res) => {
    try {
        console.log('Certification request body:', req.body);

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide required field: name',
            });
        }

        const certification = await Certification.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Certification added successfully',
            data: certification,
        });
    } catch (error) {
        console.error('Create certification error:', error);

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

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
const getAllCertifications = async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: certifications.length,
            data: certifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private/Admin
const updateCertification = async (req, res) => {
    try {
        const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        res.json({
            success: true,
            message: 'Certification updated successfully',
            data: certification,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private/Admin
const deleteCertification = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);

        if (!certification) {
            return res.status(404).json({
                success: false,
                message: 'Certification not found',
            });
        }

        await certification.deleteOne();

        res.json({
            success: true,
            message: 'Certification deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCertification,
    getAllCertifications,
    updateCertification,
    deleteCertification,
};
