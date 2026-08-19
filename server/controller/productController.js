const Product = require('./../model/Projuct');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        console.log('Product request body:', req.body);

        const { name, category } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: name, category',
            });
        }

        const data = { ...req.body };

        // If an image file came in (multipart/form-data), push it to Cloudinary
        // right here and store the returned secure URL on the product.
        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'rajmudar/products');
            data.images = [result.secure_url];
        }

        // multipart/form-data only carries text fields, so array fields arrive
        // JSON-encoded — decode them back before handing off to Mongoose.
        if (typeof data.packagingOptions === 'string') {
            try {
                data.packagingOptions = JSON.parse(data.packagingOptions);
            } catch {
                data.packagingOptions = [];
            }
        }

        const product = await Product.create(data);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product,
        });
    } catch (error) {
        console.error('Create product error:', error);

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

// @desc    Get all products (optional ?category= filter)
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const data = { ...req.body };

        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'rajmudar/products');
            data.images = [result.secure_url];
        }

        if (typeof data.packagingOptions === 'string') {
            try {
                data.packagingOptions = JSON.parse(data.packagingOptions);
            } catch {
                data.packagingOptions = [];
            }
        }

        const product = await Product.findByIdAndUpdate(req.params.id, data, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        await product.deleteOne();

        res.json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
