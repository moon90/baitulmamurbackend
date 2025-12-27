// routes/appointments.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/appointments
// @desc    Get all appointments for the logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM appointments WHERE user_id = $1 ORDER BY appointment_date DESC', [req.user.id]);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/appointments/all
// @desc    Get all appointments
// @access  Admin
router.get('/all', adminAuth, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM appointments ORDER BY appointment_date DESC');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/appointments/:id
// @desc    Get a single appointment by ID with access control
// @access  Private (Admin or Author)
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM appointments WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Appointment not found' });
    }

    const appointment = rows[0];

    // Check if the user is an admin
    if (req.user && req.user.role === 'admin') {
      return res.json(appointment);
    }

    // Check if the user is the author of the appointment
    if (req.user && appointment.user_id === req.user.id) {
      return res.json(appointment);
    }

    // If none of the above, access is forbidden
    return res.status(403).json({ msg: 'Access to this appointment is forbidden' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Private
router.post('/', auth, async (req, res) => {
    const { service_type, appointment_date, appointment_time, notes } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO appointments (user_id, service_type, appointment_date, appointment_time, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [req.user.id, service_type, appointment_date, appointment_time, notes]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/appointments/:id
// @desc    Update an appointment
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    const { user_id, service_type, appointment_date, appointment_time, status, notes } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE appointments SET user_id = $1, service_type = $2, appointment_date = $3, appointment_time = $4, status = $5, notes = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [user_id, service_type, appointment_date, appointment_time, status, notes, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM appointments WHERE id = $1', [id]);
        res.json({ msg: 'Appointment deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
