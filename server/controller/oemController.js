const OEMInquiry = require('../model/OEMInquiry');

// @desc    Submit OEM / Private Label inquiry
// @route   POST /api/oem-inquiry
// @access  Public
const submitOEMInquiry = async (req, res) => {
    try {
        console.log('OEM inquiry request body:', req.body);

        const { contactPerson, email } = req.body;

        if (!contactPerson || !email) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: contactPerson, email',
            });
        }

        const inquiry = await OEMInquiry.create(req.body);

        res.status(201).json({
            success: true,
            message: 'OEM inquiry received. Our team will contact you soon.',
            data: inquiry,
        });
    } catch (error) {
        console.error('OEM inquiry error:', error);

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

// @desc    Get all OEM inquiries (Admin only)
// @route   GET /api/oem-inquiry
// @access  Private/Admin
const getAllOEMInquiries = async (req, res) => {
    try {
        const inquiries = await OEMInquiry.find().sort({ createdAt: -1 });

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

// @desc    Delete OEM inquiry
// @route   DELETE /api/oem-inquiry/:id
// @access  Private/Admin
const deleteOEMInquiry = async (req, res) => {
    try {
        const inquiry = await OEMInquiry.findById(req.params.id);

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
    submitOEMInquiry,
    getAllOEMInquiries,
    deleteOEMInquiry,
};
