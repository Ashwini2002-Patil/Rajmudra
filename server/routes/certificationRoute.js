const express = require('express');
const { protect } = require('../middleware/auth');
const { createCertification, getAllCertifications, updateCertification, deleteCertification } = require('../controller/certificationController');
const router = express.Router();


router.post('/', protect, createCertification);
router.get('/', getAllCertifications);
router.put('/:id', protect, updateCertification);
router.delete('/:id', protect, deleteCertification);

module.exports = router;
