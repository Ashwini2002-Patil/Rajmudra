const express = require('express');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();


router.post('/', protect, uploadMemory.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, uploadMemory.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
