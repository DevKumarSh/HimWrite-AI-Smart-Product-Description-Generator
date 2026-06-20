import { useState } from "react";
import ToneSelector from "./ToneSelector";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { Sparkles } from "lucide-react";

function ProductForm({ onSubmit, isGenerating }) {
  const [productName, setProductName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [weight, setWeight] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("premium");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!productName.trim()) {
      newErrors.productName = "Product name is required to generate marketing copy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);
    // Clear field-specific error if typing starts
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ productName, ingredients, weight, features, tone });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Left Card: Product Information */}
      <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
        <div className="space-y-5">
          <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
            Product Information
          </h3>
          
          <div className="space-y-4">
            {/* Product Name */}
            <InputField
              id="productName"
              label="Product Name"
              value={productName}
              onChange={handleInputChange(setProductName, "productName")}
              placeholder="Enter product name (e.g., Lavender Herbal Tea)"
              error={errors.productName}
              required
            />

            {/* Ingredients */}
            <TextAreaField
              id="ingredients"
              label="Ingredients"
              value={ingredients}
              onChange={handleInputChange(setIngredients, "ingredients")}
              placeholder="Enter key ingredients (e.g., Organic Lavender, Chamomile, Mint)"
              rows={3}
              error={errors.ingredients}
            />

            {/* Weight and Features (Side-by-side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Weight */}
              <InputField
                id="weight"
                label="Weight / Size"
                value={weight}
                onChange={handleInputChange(setWeight, "weight")}
                placeholder="e.g., 50g, 16oz"
                error={errors.weight}
              />

              {/* Features */}
              <TextAreaField
                id="features"
                label="Key Features"
                value={features}
                onChange={handleInputChange(setFeatures, "features")}
                placeholder="e.g., Eco-friendly, caffeine-free, hand-picked"
                rows={2}
                error={errors.features}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Card: Select Tone & Button */}
      <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow duration-200">
        <ToneSelector selectedTone={tone} onSelectTone={setTone} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-xs transform active:scale-[0.99] select-none shadow-blue-600/10 shadow-md"
        >
          <Sparkles size={14} className={isGenerating ? "animate-spin" : ""} fill="currentColor" />
          <span>{isGenerating ? "Generating Copy..." : "Generate Description"}</span>
        </button>
      </div>

    </form>
  );
}

export default ProductForm;
