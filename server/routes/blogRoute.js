const express = require('express');
const { protect } = require('../middleware/auth');
const { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } = require('../controller/blogController');
const router = express.Router();


router.post('/', protect, createBlog);
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
