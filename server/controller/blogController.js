const Blog = require('../model/Blog');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
    try {
        console.log('Blog request body:', req.body);

        const { title, slug, content } = req.body;

        if (!title || !slug || !content) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: title, slug, content',
            });
        }

        const data = { ...req.body };

        // If an image file came in (multipart/form-data), push it to Cloudinary
        // right here and store the returned secure URL on the blog.
        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'rajmudar/blogs');
            data.coverImage = result.secure_url;
        }

        // multipart/form-data only carries text fields, so array fields arrive
        // JSON-encoded — decode them back before handing off to Mongoose.
        if (typeof data.tags === 'string') {
            try {
                data.tags = JSON.parse(data.tags);
            } catch {
                data.tags = [];
            }
        }

        const blog = await Blog.create(data);

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: blog,
        });
    } catch (error) {
        console.error('Create blog error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A blog with this slug already exists',
            });
        }

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

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        res.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
    try {
        const data = { ...req.body };

        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'rajmudar/blogs');
            data.coverImage = result.secure_url;
        }

        if (typeof data.tags === 'string') {
            try {
                data.tags = JSON.parse(data.tags);
            } catch {
                data.tags = [];
            }
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        res.json({
            success: true,
            message: 'Blog updated successfully',
            data: blog,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        await blog.deleteOne();

        res.json({
            success: true,
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
};
