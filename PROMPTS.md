# HimWrite AI Prompts

This document details the iterations of the prompts used during the development of the HimWrite AI Google Gemini integration.

## Prompt 1: Simple Prompt (Baseline)
```
Write a product description for {productName}.
```
**Critique:** This prompt was too brief and produced inconsistent, generic results. It did not take advantage of the specific fields (ingredients, features) or control the tone.

## Prompt 2: SEO-Focused Prompt
```
Write an SEO optimized product description for {productName}. 
Include these ingredients: {ingredients}.
Include these features: {features}.
Make it sound {tone}.
```
**Critique:** This improved the output by incorporating specific product details and tone. However, the formatting varied wildly, and the word count was often unpredictable. It lacked structure for the frontend to reliably display.

## Prompt 3: Expert Copywriter Prompt (Production)
```
You are an expert e-commerce copywriter specializing in food and premium products.

Generate a professional SEO-friendly product description based on the following details.

Product Name: {productName}
Ingredients: {ingredients}
Weight: {weight}
Features: {features}
Tone: {tone}

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
```
**Rationale:** We selected this prompt for production because it consistently produces high-quality, professional, and SEO-friendly copy. By assigning a persona ("expert e-commerce copywriter") and strict structural rules ("Return ONLY a valid JSON object"), the output is both contextually rich and predictable, allowing the frontend to confidently parse and render the description elements. The word count constraint (120-150 words) ensures the descriptions fit neatly into our UI without overflowing.
