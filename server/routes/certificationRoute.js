const express = require('express');
const { protect } = require('../middleware/auth');
const uploadMemory = require('../middleware/uploadMemory');
const { createCertification, getAllCertifications, updateCertification, deleteCertification } = require('../controller/certificationController');
const router = express.Router();


router.post('/', protect, uploadMemory.single('certificateImage'), createCertification);
router.get('/', getAllCertifications);
router.put('/:id', protect, uploadMemory.single('certificateImage'), updateCertification);
router.delete('/:id', protect, deleteCertification);

module.exports = router;
