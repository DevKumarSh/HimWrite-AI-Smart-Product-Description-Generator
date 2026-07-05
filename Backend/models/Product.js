const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  inputs: {
    productName: { type: String, required: true },
    ingredients: { type: String },
    weight: { type: String },
    features: { type: String },
    tone: { type: String, required: true }
  },
  result: {
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    bullets: [{ type: String }],
    callToAction: { type: String }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
