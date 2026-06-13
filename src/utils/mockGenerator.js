/**
 * Generates a realistic and high-quality product description on the client side
 * based on input specs, tone, ingredients, weight, and features.
 */
export function generateProductDescription({ productName, ingredients, weight, features, tone }) {
  const name = productName.trim() || "Artisanal Blend";
  const wgt = weight.trim() || "Standard Size";
  const ingList = ingredients
    ? ingredients.split(/[,\n]+/).map(i => i.trim()).filter(Boolean)
    : ["Premium active components"];
  const featuresArr = features
    ? features.split(/[,\n]+/).map(f => f.trim()).filter(Boolean)
    : ["Meticulously sourced", "Quality assured", "Expertly prepared"];

  let title = "";
  let tagline = "";
  let description = "";
  let bullets = [];
  let callToAction = "";

  const ingredientsString = ingList.length > 0 ? ingList.join(", ") : "Premium ingredients";

  switch (tone.toLowerCase()) {
    case "premium":
      title = `The ${name} — Exclusive Luxury Edition (${wgt})`;
      tagline = `Indulge in a premium experience crafted for the most discerning tastes.`;
      description = `Immerse yourself in the exceptional quality of ${name}. Handcrafted utilizing only the finest select ingredients—including ${ingredientsString}—this exquisite ${wgt} blend represents the absolute pinnacle of luxury and refinement. Every detail has been meticulously curated to deliver an unparalleled sensory journey that is sophisticated, opulent, and utterly unforgettable.`;
      bullets = [
        `**Elite Curation**: Made using premium grade **${ingList[0] || "sought-after materials"}** for rich complexity.`,
        `**Artisanal Craftsmanship**: Optimized with features like **${featuresArr[0] || "refined finishing"}** to assure supreme quality.`,
        `**Lavish Presentation**: Packaged beautifully in an elegant ${wgt} format, perfect as a luxury statement or gift.`,
        ...(featuresArr[1] ? [`**Outstanding Performance**: Characterized by **${featuresArr[1]}** for a superior experience.`] : [])
      ];
      callToAction = `Elevate your lifestyle. Secure your exclusive allocation of ${name} today.`;
      break;

    case "traditional":
      title = `Time-Honored ${name} — Heritage Selection (${wgt})`;
      tagline = `Crafted from timeless recipes passed down through generations.`;
      description = `Bring the authentic taste of legacy into your home with ${name}. Celebrating a rich heritage, this ${wgt} release features wholesome, timeless ingredients like ${ingredientsString}. Prepared according to traditional methods, it captures the warm, comforting essence of classic craftsmanship. It's more than just a product—it's a celebration of culture, history, and genuine dedication to quality.`;
      bullets = [
        `**Authentic Recipe**: Honoring legacy by featuring traditional **${ingList[0] || "natural elements"}**.`,
        `**Artisanal Legacy**: Infused with **${featuresArr[0] || "time-tested techniques"}** to keep heritage alive.`,
        `**Timeless Value**: A robust ${wgt} size designed for families who appreciate authentic quality.`,
        ...(featuresArr[1] ? [`**Natural Simplicity**: Enhanced with **${featuresArr[1]}** for an authentic feel.`] : [])
      ];
      callToAction = `Reconnect with heritage. Order your traditional package of ${name} now.`;
      break;

    case "health-focused":
    case "health_focused":
      title = `Wholesome ${name} — Daily Wellness Active (${wgt})`;
      tagline = `Nourish your body and fuel your vitality with pure, clean ingredients.`;
      description = `Empower your health journey with the clean, nutrient-dense profile of ${name}. Specially designed for active body performance and mental clarity, this ${wgt} pack contains energy-boosting, clean ingredients like ${ingredientsString}. Absolutely free of artificial fillers, it provides clean, wholesome nourishment that integrates seamlessly into your daily wellness routine to keep you feeling energized, focused, and refreshed.`;
      bullets = [
        `**Nutrient-Rich Fuel**: Formulated with wellness-boosting **${ingList[0] || "active superfoods"}** for vitality.`,
        `**Pure Clean Profile**: Built around **${featuresArr[0] || "zero-artificial processing"}** for reliable nutrition.`,
        `**Ideal Daily Support**: A convenient ${wgt} serving layout that supports your healthy lifestyle goals.`,
        ...(featuresArr[1] ? [`**Wholesome Action**: Powered by **${featuresArr[1]}** to support physical wellness.`] : [])
      ];
      callToAction = `Invest in your health. Claim your pack of ${name} and feel the clean difference today.`;
      break;

    default:
      title = `${name} (${wgt})`;
      tagline = `A high-quality blend featuring premium ingredients.`;
      description = `Experience the excellence of ${name}. Formulated with ${ingredientsString}, this ${wgt} offering is crafted to meet high standards. Featuring ${featuresArr.join(", ")}, it provides great utility and satisfaction for your everyday needs.`;
      bullets = [
        `**Core Ingredients**: Contains **${ingredientsString}** for quality assurance.`,
        `**Primary Feature**: Stands out with **${featuresArr[0] || "durable quality"}**.`,
        `**Standard Spec**: Delivered in a convenient **${wgt}** size.`,
      ];
      callToAction = `Try ${name} today.`;
      break;
  }

  return {
    title,
    tagline,
    description,
    bullets,
    callToAction,
  };
}
