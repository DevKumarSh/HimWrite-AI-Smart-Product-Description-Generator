const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Service to interact with Google Gemini AI for generating product descriptions.
 */
class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey && this.apiKey !== 'your_gemini_api_key_here') {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    } else {
      this.genAI = null;
    }
  }

  /**
   * Helper to implement timeout for the API call
   */
  async withTimeout(promise, ms = 10000) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        const error = new Error('AI service timed out');
        error.name = 'TimeoutError';
        reject(error);
      }, ms);
    });

    try {
      const result = await Promise.race([promise, timeoutPromise]);
      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Generates a product description using Gemini API.
   * @param {Object} data - The product data inputs
   * @returns {Object} - The generated description as a parsed JSON object
   */
  async generateProductDescription(data) {
    const { productName, ingredients, weight, features, tone } = data;

    // Expert Copywriter Prompt
    const prompt = `
You are an expert e-commerce copywriter specializing in food and premium products.

Generate a professional SEO-friendly product description based on the following details.

Product Name: ${productName}
Ingredients: ${ingredients || 'N/A'}
Weight: ${weight || 'N/A'}
Features: ${features || 'N/A'}
Tone: ${tone}

Requirements:
- 120–150 words total
- Professional English
- Customer friendly
- SEO optimized
- Highlight benefits
- Mention important features
- No false claims
- Strong Call To Action
- Return ONLY a valid JSON object with the following structure, no markdown formatting or extra text:

{
  "title": "A catchy title for the product",
  "tagline": "A short, punchy 1-sentence tagline",
  "description": "A compelling paragraph describing the product.",
  "bullets": ["feature 1", "feature 2", "feature 3"],
  "callToAction": "A strong call to action phrase"
}
    `;

    // Fallback for testing/missing key
    if (!this.genAI) {
      console.warn("WARNING: GEMINI_API_KEY is not set or invalid. Using a mock response.");
      return {
        title: `${tone.charAt(0).toUpperCase() + tone.slice(1)} ${productName}`,
        tagline: `Experience the exceptional quality of our ${productName}.`,
        description: `Carefully crafted with ${ingredients || 'the finest materials'} to ensure an unforgettable experience. Features: ${features || 'Premium quality'}. Size/Weight: ${weight || 'Standard'}.`,
        bullets: ["Premium quality", "Exceptional value", "Satisfaction guaranteed"],
        callToAction: "Order now and experience the difference!"
      };
    }

    try {
      // Create the generation promise
      const generationPromise = this.model.generateContent(prompt);
      
      // Execute with a 15-second timeout (giving some buffer for network/generation time)
      const result = await this.withTimeout(generationPromise, 15000);
      const response = await result.response;
      let text = response.text().trim();
      
      // Clean up potential markdown blocks from the AI response
      if (text.startsWith('```json')) {
        text = text.substring(7, text.length - 3).trim();
      } else if (text.startsWith('```')) {
        text = text.substring(3, text.length - 3).trim();
      }

      return JSON.parse(text);
      
    } catch (error) {
      if (error.name === 'TimeoutError') {
        throw error;
      }
      
      // Map Gemini specific errors (Rate limiting, API failure)
      if (error.message?.includes('429') || error.status === 429) {
        const rateLimitError = new Error('Rate limit reached');
        rateLimitError.name = 'RateLimitError';
        throw rateLimitError;
      }

      // Any other GoogleGenerativeAI errors or JSON parsing errors
      const genericError = new Error('AI service failed');
      genericError.name = 'GeminiError';
      genericError.originalError = error.message;
      throw genericError;
    }
  }
}

module.exports = new GeminiService();
