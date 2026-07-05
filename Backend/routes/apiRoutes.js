const express = require('express');
const router = express.Router();
const { generateDescription } = require('../controllers/generateController');
const { getHistory, deleteHistoryItem, clearHistory } = require('../controllers/historyController');

// POST /api/generate
router.post('/generate', generateDescription);

// History Routes
router.get('/history', getHistory);
router.delete('/history/:id', deleteHistoryItem);
router.delete('/history', clearHistory);

module.exports = router;
