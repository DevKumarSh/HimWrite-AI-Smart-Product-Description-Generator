const Product = require('../models/Product');
const geminiService = require('../services/geminiService');

const generateDescription = async (req, res) => {
  try {
    const { productName, ingredients, weight, features, tone } = req.body;

    // Validation
    if (!productName || !ingredients || !weight || !features || !tone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields (productName, ingredients, weight, features, tone) are required' 
      });
    }

    if (!['premium', 'traditional', 'health-focused'].includes(tone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid tone selected' 
      });
    }

    // Call AI Service
    const generatedContent = await geminiService.generateProductDescription({
      productName, ingredients, weight, features, tone
    });

    // Save to Database
    const savedProduct = new Product({
      user: req.user._id,
      inputs: {
        productName,
        ingredients,
        weight,
        features,
        tone
      },
      result: generatedContent
    });
    
    await savedProduct.save();

    // Respond with consistent format expected by frontend and PRD spec
    return res.status(200).json({
      success: true,
      description: generatedContent.description, // Strict PRD compliance
      data: savedProduct // For Frontend history compliance
    });

  } catch (error) {
    console.error('Error in aiController:', error);

    if (error.name === 'TimeoutError') {
      return res.status(504).json({ success: false, message: 'AI service timed out, please try again' });
    }

    if (error.name === 'RateLimitError') {
      return res.status(429).json({ success: false, message: 'Rate limit reached, please try again shortly' });
    }

    if (error.name === 'GeminiError') {
      return res.status(502).json({ success: false, message: 'AI service is currently unavailable' });
    }

    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

module.exports = {
  generateDescription
};
