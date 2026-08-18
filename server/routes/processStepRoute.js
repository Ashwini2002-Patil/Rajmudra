const express = require('express');
const { protect } = require('../middleware/auth');
const { createProcessStep, getAllProcessSteps, deleteProcessStep } = require('../controller/processStepController');
const router = express.Router();

router.post('/', protect, createProcessStep);
router.get('/', getAllProcessSteps);
router.delete('/:id', protect, deleteProcessStep);

module.exports = router;
