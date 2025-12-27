// routes/media.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// @route   POST /api/media
// @desc    Upload media metadata
// @access  Private (Authenticated users)
router.post('/', auth, async (req, res) => {
    const { file_name, file_path, file_type, alt_text } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO media (file_name, file_path, file_type, alt_text, uploaded_by_user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [file_name, file_path, file_type, alt_text, req.user.id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/media
// @desc    Get all media metadata
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM media ORDER BY uploaded_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/media/:id
// @desc    Get single media metadata by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM media WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Media not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/media/:id
// @desc    Update media metadata
// @access  Admin or Uploader
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { file_name, file_path, file_type, alt_text } = req.body;
    try {
        const { rows: mediaRows } = await db.query('SELECT uploaded_by_user_id FROM media WHERE id = $1', [id]);

        if (mediaRows.length === 0) {
            return res.status(404).json({ msg: 'Media not found' });
        }

        const media = mediaRows[0];

        // Check if user is admin or the uploader
        if (req.user.role !== 'admin' && media.uploaded_by_user_id !== req.user.id) {
            return res.status(403).json({ msg: 'Access forbidden' });
        }

        const { rows } = await db.query(
            'UPDATE media SET file_name = $1, file_path = $2, file_type = $3, alt_text = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [file_name, file_path, file_type, alt_text, id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/media/:id
// @desc    Delete media metadata
// @access  Admin or Uploader
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const { rows: mediaRows } = await db.query('SELECT uploaded_by_user_id FROM media WHERE id = $1', [id]);

        if (mediaRows.length === 0) {
            return res.status(404).json({ msg: 'Media not found' });
        }

        const media = mediaRows[0];

        // Check if user is admin or the uploader
        if (req.user.role !== 'admin' && media.uploaded_by_user_id !== req.user.id) {
            return res.status(403).json({ msg: 'Access forbidden' });
        }

        await db.query('DELETE FROM media WHERE id = $1', [id]);
        res.json({ msg: 'Media deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
