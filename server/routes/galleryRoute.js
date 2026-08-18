const express = require('express');
const { protect } = require('../middleware/auth');
const { createGalleryItem, getAllGalleryItems, deleteGalleryItem } = require('../controller/galleryController');
const router = express.Router();


router.post('/', protect, createGalleryItem);
router.get('/', getAllGalleryItems);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
