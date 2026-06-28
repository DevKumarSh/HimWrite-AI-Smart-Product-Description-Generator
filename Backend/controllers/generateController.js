const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateDescription = async (req, res) => {
  try {
    const { productName, ingredients, weight, features, tone } = req.body;

    if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    // Initialize the Gemini API client
    // Expects GEMINI_API_KEY in the environment, or you could pass it from the frontend if preferred
    // For now, we'll try to use the environment variable, or fallback to a dummy if none is provided
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn("WARNING: GEMINI_API_KEY is not set or invalid. Using a mock response for testing.");
      // Fallback for testing if key is not configured
      return res.json({
        title: `${tone.charAt(0).toUpperCase() + tone.slice(1)} ${productName}`,
        tagline: `Experience the exceptional quality of our ${productName}.`,
        description: `Carefully crafted with ${ingredients || 'the finest materials'} to ensure an unforgettable experience. Features: ${features || 'Premium quality'}. Size/Weight: ${weight || 'Standard'}.`,
        bullets: ["Premium quality", "Exceptional value", "Satisfaction guaranteed"],
        callToAction: "Order now and experience the difference!"
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert copywriter. Write a product description based on the following details:
      Product Name: ${productName}
      Ingredients/Materials: ${ingredients || 'N/A'}
      Weight/Size: ${weight || 'N/A'}
      Key Features: ${features || 'N/A'}
      Tone of Voice: ${tone}

      Return ONLY a valid JSON object with the following structure, no markdown formatting or extra text:
      {
        "title": "A catchy title for the product",
        "tagline": "A short, punchy 1-sentence tagline",
        "description": "A compelling paragraph describing the product.",
        "bullets": ["feature 1", "feature 2", "feature 3"],
        "callToAction": "A strong call to action phrase"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up potential markdown blocks from the AI response
    if (text.startsWith('```json')) {
      text = text.substring(7, text.length - 3).trim();
    } else if (text.startsWith('```')) {
      text = text.substring(3, text.length - 3).trim();
    }

    const jsonResult = JSON.parse(text);

    res.json(jsonResult);
  } catch (error) {
    console.error('Error generating description:', error);
    res.status(500).json({ error: 'Failed to generate description' });
  }
};

module.exports = {
  generateDescription
};
