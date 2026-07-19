# HimWrite AI – Smart Product Description Generator

HimWrite AI is a MERN Stack application that helps e-commerce sellers generate professional, SEO-friendly product descriptions in seconds.

## AI Feature Overview
The application utilizes Google Gemini AI to automatically write product descriptions based on specific details (Product Name, Ingredients, Weight, Features) and a chosen Tone (Premium, Traditional, Health-Focused). The generated output is neatly structured, avoiding generic AI responses and providing actionable, ready-to-use e-commerce copy.

## Google Gemini Integration Details
Our backend integrates the `@google/generative-ai` SDK via a custom `geminiService.js`.
- Uses `gemini-2.5-flash` model for optimal speed and cost.
- Implements robust error handling for Rate Limits (HTTP 429), Timeouts (HTTP 504), and General Failures (HTTP 502/500).
- Guarantees standardized JSON responses using a carefully crafted "Expert Copywriter" system prompt, ensuring the UI receives reliable data fields (title, tagline, description, bullets, callToAction).

## Environment Variables
The application requires the following environment variables to function properly. Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GEMINI_API_KEY=your_gemini_api_key
```

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd HimWrite
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   # Create .env and populate variables
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

## API Documentation

### `POST /api/ai/generate`
Generates a product description using Gemini AI.

**Headers:**
- `Authorization`: Bearer `<token>` (Requires valid JWT)

**Request Body:**
```json
{
  "productName": "string",
  "ingredients": "string",
  "weight": "string",
  "features": "string",
  "tone": "Premium | Traditional | Health-Focused"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "description": {
    "title": "...",
    "tagline": "...",
    "description": "...",
    "bullets": ["..."],
    "callToAction": "..."
  },
  "data": { ...savedProductDocument... }
}
```

## Screenshots
*(Insert screenshots of the Dashboard, Loading State, and Generated Description Card here)*
![Dashboard Generator](Frontend/src/assets/logo.png)
