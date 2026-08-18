const Gallery = require('../model/Gallery');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Add gallery item
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res) => {
    try {
        console.log('Gallery request body:', req.body);

        const data = { ...req.body };

        // If an image file came in (multipart/form-data), push it to Cloudinary
        // right here and store the returned secure URL on the gallery item.
        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'rajmudar/gallery');
            data.imageUrl = result.secure_url;
        }

        if (!data.imageUrl) {
            return res.status(400).json({
                success: false,
                message: 'Please provide required field: imageUrl',
            });
        }

        const item = await Gallery.create(data);

        res.status(201).json({
            success: true,
            message: 'Gallery item added successfully',
            data: item,
        });
    } catch (error) {
        console.error('Create gallery item error:', error);

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

// @desc    Get all gallery items (optional ?category= filter)
// @route   GET /api/gallery
// @access  Public
const getAllGalleryItems = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const items = await Gallery.find(filter).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found',
            });
        }

        await item.deleteOne();

        res.json({
            success: true,
            message: 'Gallery item deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createGalleryItem,
    getAllGalleryItems,
    deleteGalleryItem,
};
