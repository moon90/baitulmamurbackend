const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth'); // Assuming admin protection for CRUD operations

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM news ORDER BY published_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/news/:slug
// @desc    Get single news article by slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const result = await db.query('SELECT * FROM news WHERE slug = $1', [slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'News article not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/news
// @desc    Create a news article
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    try {
        const {
            title_en,
            title_de,
            slug,
            excerpt_en,
            excerpt_de,
            content_en,
            content_de,
            image_url,
            is_published,
            published_at
        } = req.body;

        const result = await db.query(
            'INSERT INTO news (title_en, title_de, slug, excerpt_en, excerpt_de, content_en, content_de, image_url, is_published, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [title_en, title_de, slug, excerpt_en, excerpt_de, content_en, content_de, image_url, is_published, published_at]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/news/:id
// @desc    Update a news article
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title_en,
            title_de,
            slug,
            excerpt_en,
            excerpt_de,
            content_en,
            content_de,
            image_url,
            is_published,
            published_at
        } = req.body;

        const result = await db.query(
            'UPDATE news SET title_en = $1, title_de = $2, slug = $3, excerpt_en = $4, excerpt_de = $5, content_en = $6, content_de = $7, image_url = $8, is_published = $9, published_at = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *',
            [title_en, title_de, slug, excerpt_en, excerpt_de, content_en, content_de, image_url, is_published, published_at, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'News article not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/news/:id
// @desc    Delete a news article
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM news WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'News article not found' });
        }
        res.json({ msg: 'News article deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
