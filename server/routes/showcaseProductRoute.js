const express = require('express');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');
const {
    createShowcaseProduct,
    getAllShowcaseProducts,
    deleteShowcaseProduct,
} = require('../controller/showcaseProductController');
const router = express.Router();

router.post('/', protect, uploadMemory.single('image'), createShowcaseProduct);
router.get('/', getAllShowcaseProducts);
router.delete('/:id', protect, deleteShowcaseProduct);

module.exports = router;
