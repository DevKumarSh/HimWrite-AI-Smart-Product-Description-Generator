const express = require('express');
const router = express.Router();
const { generateDescription } = require('../controllers/generateController');

// POST /api/generate
router.post('/generate', generateDescription);

module.exports = router;
