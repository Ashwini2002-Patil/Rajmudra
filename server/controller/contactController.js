const ContactMessage = require('../model/ContactMessage');
const { sendContactNotification } = require('../utils/mailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        console.log('Contact request body:', req.body);

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields: name, email, message',
            });
        }

        const contact = await ContactMessage.create(req.body);

        // Best-effort — a mail hiccup shouldn't fail the submission; the
        // message is already saved and visible in the admin dashboard.
        sendContactNotification(req.body).catch((err) =>
            console.error('Contact notification email failed:', err.message)
        );

        res.status(201).json({
            success: true,
            message: "Message received. We'll get back to you soon.",
            data: contact,
        });
    } catch (error) {
        console.error('Contact error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', '),
            });
        }

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactMessage.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
    try {
        const contact = await ContactMessage.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Message not found',
            });
        }

        await contact.deleteOne();

        res.json({
            success: true,
            message: 'Message deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitContact,
    getAllContacts,
    deleteContact,
};
