const express = require('express');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');
const { uploadImage } = require('../controller/uploadController');
const router = express.Router();

router.post('/', protect, uploadMemory.single('image'), uploadImage);

module.exports = router;
