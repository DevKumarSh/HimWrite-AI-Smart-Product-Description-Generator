const express = require('express');
const router = express.Router();
const { generateDescription } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/ai/generate
router.post('/generate', protect, generateDescription);

module.exports = router;
