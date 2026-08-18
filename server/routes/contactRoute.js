const express = require('express');
const { submitContact, getAllContacts, deleteContact } = require('../controller/contactController');
const { protect } = require('../middleware/auth');
const router = express.Router();


router.post('/', submitContact);
router.get('/', protect, getAllContacts);
router.delete('/:id', protect, deleteContact);

module.exports = router;
