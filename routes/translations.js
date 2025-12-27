// routes/translations.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/translations/all
// @desc    Get all translations
// @access  Admin
router.get('/all', adminAuth, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM translations');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/translations/:language
// @desc    Get all translations for a language
// @access  Public
router.get('/:language', async (req, res) => {
    const { language } = req.params;
  try {
    const { rows } = await db.query('SELECT key, value FROM translations WHERE language_code = $1', [language]);
    const translations = rows.reduce((acc, row) => {
        acc[row.key] = row.value;
        return acc;
    }, {});
    res.json(translations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/translations
// @desc    Create a translation
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    const { key, language_code, value } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO translations (key, language_code, value) VALUES ($1, $2, $3) RETURNING *',
            [key, language_code, value]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/translations/:id
// @desc    Update a translation
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { key, language_code, value } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE translations SET key = $1, language_code = $2, value = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
            [key, language_code, value, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/translations/:id
// @desc    Delete a translation
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM translations WHERE id = $1', [id]);
        res.json({ msg: 'Translation deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
