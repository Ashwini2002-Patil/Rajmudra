const SampleRequest = require('../model/SampleRequest');

// @desc    Submit free sample request
// @route   POST /api/sample-request
// @access  Public
const submitSampleRequest = async (req, res) => {
    try {
        console.log('Sample request body:', req.body);

        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: name, email, phone',
            });
        }

        const sampleRequest = await SampleRequest.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Sample request received. Our team will contact you soon.',
            data: sampleRequest,
        });
    } catch (error) {
        console.error('Sample request error:', error);

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

// @desc    Get all sample requests (Admin only)
// @route   GET /api/sample-request
// @access  Private/Admin
const getAllSampleRequests = async (req, res) => {
    try {
        const requests = await SampleRequest.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: requests.length,
            data: requests,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update sample request status
// @route   PUT /api/sample-request/:id/status
// @access  Private/Admin
const updateSampleRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const sampleRequest = await SampleRequest.findById(req.params.id);

        if (!sampleRequest) {
            return res.status(404).json({
                success: false,
                message: 'Sample request not found',
            });
        }

        sampleRequest.status = status;
        await sampleRequest.save();

        res.json({
            success: true,
            message: 'Status updated successfully',
            data: sampleRequest,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete sample request
// @route   DELETE /api/sample-request/:id
// @access  Private/Admin
const deleteSampleRequest = async (req, res) => {
    try {
        const sampleRequest = await SampleRequest.findById(req.params.id);

        if (!sampleRequest) {
            return res.status(404).json({
                success: false,
                message: 'Sample request not found',
            });
        }

        await sampleRequest.deleteOne();

        res.json({
            success: true,
            message: 'Sample request deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitSampleRequest,
    getAllSampleRequests,
    updateSampleRequestStatus,
    deleteSampleRequest,
};
