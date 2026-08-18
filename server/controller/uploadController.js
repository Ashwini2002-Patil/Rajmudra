const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please attach an image file (field name: image)',
            });
        }

        const folder = req.body.folder ? `rajmudar/${req.body.folder}` : 'rajmudar';
        const result = await uploadBuffer(req.file.buffer, folder);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Image upload failed',
        });
    }
};

module.exports = { uploadImage };
