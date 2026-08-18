const ShowcaseProduct = require('../model/ShowcaseProduct');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Add showcase product
// @route   POST /api/showcase-products
// @access  Private/Admin
const createShowcaseProduct = async (req, res) => {
    try {
        const { title, description } = req.body;

        const data = { ...req.body };

        // If an image file came in (multipart/form-data), push it to Cloudinary
        // right here and store the returned secure URL on the showcase product.
        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'rajmudar/showcase-products');
            data.image = result.secure_url;
        }

        // multipart/form-data only carries text fields, so array fields arrive
        // JSON-encoded — decode them back before handing off to Mongoose.
        if (typeof data.specs === 'string') {
            try {
                data.specs = JSON.parse(data.specs);
            } catch {
                data.specs = [];
            }
        }

        if (!title || !description || !data.image) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: title, description, image',
            });
        }

        const item = await ShowcaseProduct.create(data);

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
