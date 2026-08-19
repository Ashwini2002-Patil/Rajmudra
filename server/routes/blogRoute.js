const express = require('express');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');
const { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } = require('../controller/blogController');
const router = express.Router();


router.post('/', protect, uploadMemory.single('coverImage'), createBlog);
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.put('/:id', protect, uploadMemory.single('coverImage'), updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
