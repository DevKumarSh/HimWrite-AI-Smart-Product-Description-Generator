const express = require('express');
const router = express.Router();
const { generateDescription } = require('../controllers/generateController');
const { getHistory, deleteHistoryItem, clearHistory, updateHistoryItem } = require('../controllers/historyController');

const { protect } = require('../middleware/authMiddleware');

// POST /api/generate
router.post('/generate', protect, generateDescription);

// History Routes
router.get('/history', protect, getHistory);
router.put('/history/:id', protect, updateHistoryItem);
router.delete('/history/:id', protect, deleteHistoryItem);
router.delete('/history', protect, clearHistory);

module.exports = router;
