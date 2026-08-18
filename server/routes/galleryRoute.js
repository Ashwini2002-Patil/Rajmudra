const express = require('express');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');
const { createGalleryItem, getAllGalleryItems, deleteGalleryItem } = require('../controller/galleryController');
const router = express.Router();


router.post('/', protect, uploadMemory.single('imageUrl'), createGalleryItem);
router.get('/', getAllGalleryItems);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
