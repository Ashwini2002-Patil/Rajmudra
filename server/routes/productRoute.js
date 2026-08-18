const express = require('express');
const { protect } = require('../middleware/auth');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();


router.post('/', protect, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
