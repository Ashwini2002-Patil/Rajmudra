const express = require('express');
const { protect } = require('../middleware/auth');
const {
    createShowcaseProduct,
    getAllShowcaseProducts,
    deleteShowcaseProduct,
} = require('../controller/showcaseProductController');
const router = express.Router();

router.post('/', protect, createShowcaseProduct);
router.get('/', getAllShowcaseProducts);
router.delete('/:id', protect, deleteShowcaseProduct);

module.exports = router;
