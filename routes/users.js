// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;
    try {
        // Check if user exists
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await db.query(
            'INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, first_name, last_name, role, created_at',
            [username, email, password_hash, first_name, last_name]
        );

        // Create JWT
        const payload = {
            user: {
                id: newUser.rows[0].id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users/login
// @desc    Login user and get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/users
// @desc    Get all users
// @access  Admin
router.get('/', adminAuth, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT id, username, email, first_name, last_name, role, created_at FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT id, username, email, first_name, last_name, role, created_at FROM users WHERE id = $1', [req.user.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Admin
router.get('/:id', adminAuth, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT id, username, email, first_name, last_name, role, created_at FROM users WHERE id = $1', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { username, email, first_name, last_name, role } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE users SET username = $1, email = $2, first_name = $3, last_name = $4, role = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING id, username, email, first_name, last_name, role, created_at',
            [username, email, first_name, last_name, role, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
