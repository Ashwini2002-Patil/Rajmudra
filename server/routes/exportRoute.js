const express = require('express');
const { submitExportInquiry, getAllExportInquiries, deleteExportInquiry } = require('../controller/exportController');
const { protect } = require('../middleware/auth');
const router = express.Router();


router.post('/', submitExportInquiry);
router.get('/', protect, getAllExportInquiries);
router.delete('/:id', protect, deleteExportInquiry);

module.exports = router;
