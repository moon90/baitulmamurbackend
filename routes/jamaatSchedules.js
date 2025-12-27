// routes/jamaatSchedules.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @route   GET /api/jamaat-schedules
// @desc    Get jamaat schedules (optional location filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const location = req.query.location;
    if (location) {
      const { rows } = await db.query(
        'SELECT * FROM jamaat_schedules WHERE location = $1 ORDER BY start_date DESC',
        [location]
      );
      return res.json(rows);
    }

    const { rows } = await db.query(
      'SELECT * FROM jamaat_schedules ORDER BY start_date DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
