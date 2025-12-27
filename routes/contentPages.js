// routes/contentPages.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth'); // Import adminAuth

// @route   GET /api/content-pages/all
// @desc    Get all content pages
// @access  Admin
router.get('/all', adminAuth, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM content_pages');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/content-pages/:slug/:language
// @desc    Get a content page by slug and language
// @access  Public
router.get('/:slug/:language', async (req, res) => {
    const { slug, language } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM content_pages WHERE slug = $1 AND language_code = $2', [slug, language]);
    if (rows.length > 0) {
        res.json(rows[0]);
    } else {
        res.status(404).json({ msg: 'Content not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/content-pages
// @desc    Create a content page
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    const { slug, title, content, language_code } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO content_pages (slug, title, content, language_code) VALUES ($1, $2, $3, $4) RETURNING *',
            [slug, title, content, language_code]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/content-pages/:id
// @desc    Update a content page
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { slug, title, content, language_code } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE content_pages SET slug = $1, title = $2, content = $3, language_code = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [slug, title, content, language_code, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/content-pages/:id
// @desc    Delete a content page
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM content_pages WHERE id = $1', [id]);
        res.json({ msg: 'Content page deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
