// routes/events.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Select all multilingual fields
    const { rows } = await db.query('SELECT id, title, description, start_time, end_time, location, image_url, category, is_featured, title_en, title_de, description_en, description_de, location_en, location_de, created_at, updated_at FROM events ORDER BY start_time DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/:id
// @desc    Get a single event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Select all multilingual fields
    const { rows } = await db.query('SELECT id, title, description, start_time, end_time, location, image_url, category, is_featured, title_en, title_de, description_en, description_de, location_en, location_de, created_at, updated_at FROM events WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/events
// @desc    Create an event
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    const {
        title, description, start_time, end_time, location, image_url, category, is_featured,
        title_en, title_de, description_en, description_de, location_en, location_de
    } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO events (title, description, start_time, end_time, location, image_url, category, is_featured, title_en, title_de, description_en, description_de, location_en, location_de) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [title, description, start_time, end_time, location, image_url, category, is_featured, title_en, title_de, description_en, description_de, location_en, location_de]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const {
        title, description, start_time, end_time, location, image_url, category, is_featured,
        title_en, title_de, description_en, description_de, location_en, location_de
    } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE events SET title = $1, description = $2, start_time = $3, end_time = $4, location = $5, image_url = $6, category = $7, is_featured = $8, title_en = $9, title_de = $10, description_en = $11, description_de = $12, location_en = $13, location_de = $14, updated_at = CURRENT_TIMESTAMP WHERE id = $15 RETURNING *',
            [title, description, start_time, end_time, location, image_url, category, is_featured, title_en, title_de, description_en, description_de, location_en, location_de, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM events WHERE id = $1', [id]);
        res.json({ msg: 'Event deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;