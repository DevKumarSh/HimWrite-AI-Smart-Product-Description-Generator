const express = require('express');
const router = express.Router();
const { getHistory, deleteHistoryItem, clearHistory, updateHistoryItem } = require('../controllers/historyController');

const { protect } = require('../middleware/authMiddleware');

// History Routes
router.get('/history', protect, getHistory);
router.put('/history/:id', protect, updateHistoryItem);
router.delete('/history/:id', protect, deleteHistoryItem);
router.delete('/history', protect, clearHistory);

module.exports = router;
