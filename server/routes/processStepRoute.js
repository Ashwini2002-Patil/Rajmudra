const express = require('express');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');
const { createProcessStep, getAllProcessSteps, deleteProcessStep } = require('../controller/processStepController');
const router = express.Router();

router.post('/', protect, uploadMemory.single('image'), createProcessStep);
router.get('/', getAllProcessSteps);
router.delete('/:id', protect, deleteProcessStep);

module.exports = router;
