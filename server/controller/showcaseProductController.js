const ShowcaseProduct = require('../model/ShowcaseProduct');

// @desc    Add showcase product
// @route   POST /api/showcase-products
// @access  Private/Admin
const createShowcaseProduct = async (req, res) => {
    try {
        const { title, description, image } = req.body;

        if (!title || !description || !image) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: title, description, image',
            });
        }

        const item = await ShowcaseProduct.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Showcase product added successfully',
            data: item,
        });
    } catch (error) {
        console.error('Create showcase product error:', error);

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

// @desc    Get all showcase products (ordered)
// @route   GET /api/showcase-products
// @access  Public
const getAllShowcaseProducts = async (req, res) => {
    try {
        const items = await ShowcaseProduct.find().sort({ order: 1, createdAt: 1 });

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

// @desc    Delete showcase product
// @route   DELETE /api/showcase-products/:id
// @access  Private/Admin
const deleteShowcaseProduct = async (req, res) => {
    try {
        const item = await ShowcaseProduct.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Showcase product not found',
            });
        }

        await item.deleteOne();

        res.json({
            success: true,
            message: 'Showcase product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createShowcaseProduct,
    getAllShowcaseProducts,
    deleteShowcaseProduct,
};
