// routes/prayerTimes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/prayer-times
// @desc    Get all prayer times
// @access  Public
router.get('/', async (req, res) => {
  try {
    const location = req.query.location || 'Vienna';
    const { rows } = await db.query(
      'SELECT * FROM prayer_times WHERE location = $1 ORDER BY prayer_date DESC',
      [location]
    );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/prayer-times/:id
// @desc    Get a single prayer time entry by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM prayer_times WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Prayer time entry not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/prayer-times
// @desc    Create prayer times
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
    const { location, prayer_date, fajr, sunrise, dhuhr, asr, maghrib, isha, source } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO prayer_times (location, prayer_date, fajr, sunrise, dhuhr, asr, maghrib, isha, source) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [location, prayer_date, fajr, sunrise, dhuhr, asr, maghrib, isha, source]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/prayer-times/:id
// @desc    Update prayer times
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { location, prayer_date, fajr, sunrise, dhuhr, asr, maghrib, isha, source } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE prayer_times SET location = $1, prayer_date = $2, fajr = $3, sunrise = $4, dhuhr = $5, asr = $6, maghrib = $7, isha = $8, source = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
            [location, prayer_date, fajr, sunrise, dhuhr, asr, maghrib, isha, source, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/prayer-times/:id
// @desc    Delete prayer times
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM prayer_times WHERE id = $1', [id]);
        res.json({ msg: 'Prayer times deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
