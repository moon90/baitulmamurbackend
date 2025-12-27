// routes/educationalPrograms.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/educational-programs
// @desc    Get all educational programs
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Select all multilingual fields
    const { rows } = await db.query('SELECT id, title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url, title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de, created_at, updated_at FROM educational_programs ORDER BY start_date DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/educational-programs/:id
// @desc    Get a single educational program by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Select all multilingual fields
    const { rows } = await db.query('SELECT id, title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url, title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de, created_at, updated_at FROM educational_programs WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Educational program not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/educational-programs
// @desc    Create an educational program
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    const {
        title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url,
        title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de
    } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO educational_programs (title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url, title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *',
            [title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url, title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/educational-programs/:id
// @desc    Update an educational program
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const {
        title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url,
        title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de
    } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE educational_programs SET title = $1, description = $2, target_audience = $3, start_date = $4, end_date = $5, schedule_details = $6, instructor = $7, price = $8, image_url = $9, title_en = $10, title_de = $11, description_en = $12, description_de = $13, target_audience_en = $14, target_audience_de = $15, schedule_details_en = $16, schedule_details_de = $17, instructor_en = $18, instructor_de = $19, updated_at = CURRENT_TIMESTAMP WHERE id = $20 RETURNING *',
            [title, description, target_audience, start_date, end_date, schedule_details, instructor, price, image_url, title_en, title_de, description_en, description_de, target_audience_en, target_audience_de, schedule_details_en, schedule_details_de, instructor_en, instructor_de, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/educational-programs/:id
// @desc    Delete an educational program
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM educational_programs WHERE id = $1', [id]);
        res.json({ msg: 'Educational program deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;