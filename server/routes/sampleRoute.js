const express = require('express');
const { submitSampleRequest, getAllSampleRequests, updateSampleRequestStatus, deleteSampleRequest } = require('../controller/sampleController');
const { protect } = require('../middleware/auth');
const router = express.Router();


router.post('/', submitSampleRequest);
router.get('/', protect, getAllSampleRequests);
router.put('/:id/status', protect, updateSampleRequestStatus);
router.delete('/:id', protect, deleteSampleRequest);

module.exports = router;
