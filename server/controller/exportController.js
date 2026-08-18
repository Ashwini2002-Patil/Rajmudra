const ExportInquiry = require('../model/ExportInquiry');

// @desc    Submit export inquiry
// @route   POST /api/export-inquiry
// @access  Public
const submitExportInquiry = async (req, res) => {
    try {
        console.log('Export inquiry request body:', req.body);

        const { country, email } = req.body;

        if (!country || !email) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: country, email',
            });
        }

        const inquiry = await ExportInquiry.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Export inquiry received. Our team will contact you soon.',
            data: inquiry,
        });
    } catch (error) {
        console.error('Export inquiry error:', error);

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

// @desc    Get all export inquiries (Admin only)
// @route   GET /api/export-inquiry
// @access  Private/Admin
const getAllExportInquiries = async (req, res) => {
    try {
        const inquiries = await ExportInquiry.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: inquiries.length,
            data: inquiries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete export inquiry
// @route   DELETE /api/export-inquiry/:id
// @access  Private/Admin
const deleteExportInquiry = async (req, res) => {
    try {
        const inquiry = await ExportInquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: 'Inquiry not found',
            });
        }

        await inquiry.deleteOne();

        res.json({
            success: true,
            message: 'Inquiry deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitExportInquiry,
    getAllExportInquiries,
    deleteExportInquiry,
};
