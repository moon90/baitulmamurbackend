// BaitulMamur-Backend/routes/liveStream.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const adminAuth = require('../middleware/adminAuth');

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

const CLOUDFLARE_API_BASE = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}`;

// Helper function to make Cloudflare API requests
const cloudflareRequest = async (method, path, data = null) => {
    try {
        const config = {
            method,
            url: `${CLOUDFLARE_API_BASE}${path}`,
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: data,
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Cloudflare API Error:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.errors[0].message : 'Cloudflare API request failed');
    }
};

// @route   POST /api/live-stream/create
// @desc    Create a new Cloudflare Stream live input
// @access  Admin
router.post('/create', adminAuth, async (req, res) => {
    const { name, recording } = req.body; // name is required, recording is optional (boolean)
    try {
        const response = await cloudflareRequest('POST', '/stream/live_inputs', {
            meta: { name: name || 'New Live Stream' },
            recording: recording !== undefined ? recording : { mode: 'off' }, // Default to off if not specified
        });
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Failed to create live input');
    }
});

// @route   GET /api/live-stream/list
// @desc    List all Cloudflare Stream live inputs
// @access  Admin
router.get('/list', adminAuth, async (req, res) => {
    try {
        const response = await cloudflareRequest('GET', '/stream/live_inputs');
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Failed to list live inputs');
    }
});


// @route   GET /api/live-stream/status/:uid
// @desc    Get status of a specific Cloudflare Stream live input
// @access  Admin
router.get('/status/:uid', adminAuth, async (req, res) => {
    const { uid } = req.params;
    try {
        const response = await cloudflareRequest('GET', `/stream/live_inputs/${uid}`);
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Failed to get live input status');
    }
});

// @route   GET /api/live-stream/playback-url/:uid
// @desc    Get playback URL for a specific Cloudflare Stream live input
// @access  Public (can be restricted later if needed)
router.get('/playback-url/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const response = await cloudflareRequest('GET', `/stream/live_inputs/${uid}`);
        if (response.success && response.result && response.result.uid) {
            // Cloudflare Stream live input playback URL format
            const playbackUrl = `https://cloudflarestream.com/${response.result.uid}/manifest.m3u8`;
            res.json({ playbackUrl, uid: response.result.uid });
        } else {
            res.status(404).json({ msg: 'Live input not found or no UID available' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Failed to get playback URL');
    }
});

module.exports = router;
