const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @route   POST /api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ msg: 'Please enter all required fields: name, email, message' });
        }

        const result = await db.query(
            'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, subject, message]
        );
        res.json({ msg: 'Contact form submitted successfully', submission: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (Admin only)
// @access  Admin
// Assuming you want to be able to view submissions in an admin panel
const adminAuth = require('../middleware/adminAuth'); // Assuming admin protection
router.get('/', adminAuth, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM contact_submissions ORDER BY submitted_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/contact/:id/read
// @desc    Mark a contact submission as read (Admin only)
// @access  Admin
router.put('/:id/read', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(
            'UPDATE contact_submissions SET is_read = TRUE, submitted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Contact submission not found' });
        }
        res.json({ msg: 'Contact submission marked as read', submission: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a contact submission (Admin only)
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM contact_submissions WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Contact submission not found' });
        }
        res.json({ msg: 'Contact submission deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
