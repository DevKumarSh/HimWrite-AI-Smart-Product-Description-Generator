const Product = require('../models/Product');

// Get all history
const getHistory = async (req, res) => {
  try {
    const history = await Product.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

// Delete a specific history item
const deleteHistoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'History item deleted' });
  } catch (error) {
    console.error('Error deleting history item:', error);
    res.status(500).json({ error: 'Failed to delete history item' });
  }
};

// Clear all history
const clearHistory = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All history cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
};
// Update a specific history item
const updateHistoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { result } = req.body; // Expecting the updated result object
    const updatedItem = await Product.findByIdAndUpdate(
      id,
      { $set: { result } },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'History item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating history item:', error);
    res.status(500).json({ error: 'Failed to update history item' });
  }
};

module.exports = {
  getHistory,
  deleteHistoryItem,
  clearHistory,
  updateHistoryItem
};
