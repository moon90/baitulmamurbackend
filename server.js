// server.js
if (!process.env.DATABASE_URL) {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import the db connection
const auth = require('./middleware/auth');
const optionalAuth = require('./middleware/optionalAuth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Basic route
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    const now = new Date(result.rows[0].now);
    res.send(`BaitulMamur Backend is running! Database connected at: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
  } catch (err) {
    console.error('Database connection error', err);
    res.status(500).send('BaitulMamur Backend is running, but database connection failed!');
  }
});

// Define Routes
app.use('/api/news', require('./routes/news'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/prayer-times', require('./routes/prayerTimes'));
app.use('/api/events', require('./routes/events'));
app.use('/api/imam-questions', require('./routes/imamQuestions'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/educational-programs', require('./routes/educationalPrograms'));
app.use('/api/content-pages', require('./routes/contentPages'));
app.use('/api/translations', require('./routes/translations'));
app.use('/api/users', optionalAuth, require('./routes/users'));
app.use('/api/media', require('./routes/media'));
app.use('/api/live-stream', require('./routes/liveStream'));

// Start the server only if this file is run directly (not imported for testing)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
