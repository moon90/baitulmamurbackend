// routes/imamQuestions.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const optionalAuth = require('../middleware/optionalAuth');
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth'); // Import auth middleware

// @route   GET /api/imam-questions/my-questions
// @desc    Get all questions asked by the authenticated user
// @access  Private
router.get('/my-questions', auth, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM imam_questions WHERE user_id = $1 ORDER BY asked_at DESC', [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/imam-questions/public
// @desc    Get all public questions
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM imam_questions WHERE is_public = true ORDER BY asked_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/imam-questions/all
// @desc    Get all questions
// @access  Admin
router.get('/all', adminAuth, async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM imam_questions ORDER BY asked_at DESC");
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/imam-questions/:id
// @desc    Get a single question by ID with access control
// @access  Public, Admin, or Author
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM imam_questions WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    const question = rows[0];

    // Check if the question is public
    if (question.is_public) {
      return res.json(question);
    }

    // Check if the user is an admin
    if (req.user && req.user.role === 'admin') {
      return res.json(question);
    }

    // Check if the user is the author of the question
    if (req.user && question.user_id === req.user.id) {
      return res.json(question);
    }

    // If none of the above, access is forbidden
    return res.status(403).json({ msg: 'Access to this question is forbidden' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/imam-questions
// @desc    Ask a new question
// @access  Public
router.post('/', optionalAuth, async (req, res) => {
    const { question, is_public } = req.body;
    const user_id = req.user ? req.user.id : null;
    try {
        const { rows } = await db.query(
            'INSERT INTO imam_questions (question, user_id, is_public) VALUES ($1, $2, $3) RETURNING *',
            [question, user_id, is_public]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/imam-questions/:id/answer
// @desc    Answer a question
// @access  Admin
router.put('/:id/answer', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE imam_questions SET answer = $1, status = $2, answered_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [answer, 'answered', id]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/imam-questions/:id
// @desc    Delete a question
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM imam_questions WHERE id = $1', [id]);
        res.json({ msg: 'Question deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
