const express = require('express');
const { submitOEMInquiry, getAllOEMInquiries, deleteOEMInquiry } = require('../controller/oemController');
const { protect } = require('../middleware/auth');
const router = express.Router();


router.post('/', submitOEMInquiry);
router.get('/', protect, getAllOEMInquiries);
router.delete('/:id', protect, deleteOEMInquiry);

module.exports = router;
