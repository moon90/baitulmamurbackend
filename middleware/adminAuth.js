// middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Check if user is admin
        const { rows } = await db.query('SELECT role FROM users WHERE id = $1', [req.user.id]);
        if (rows.length === 0 || rows[0].role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Not an admin.' });
        }

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
