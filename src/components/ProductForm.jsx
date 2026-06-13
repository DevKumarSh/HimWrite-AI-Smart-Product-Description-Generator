import React, { useState } from "react";
import ToneSelector from "./ToneSelector";
import { Sparkles } from "lucide-react";

function ProductForm({ onSubmit, isGenerating }) {
  const [productName, setProductName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [weight, setWeight] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("premium");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      setError("Product Name is required");
      return;
    }
    setError("");
    onSubmit({ productName, ingredients, weight, features, tone });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Left Card: Product Information */}
      <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 mb-4">
            Product Information
          </h3>
          
          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Product Name */}
            <div className="space-y-1.5">
              <label htmlFor="productName" className="block text-xs font-bold text-slate-700">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all text-xs"
              />
            </div>

            {/* Ingredients */}
            <div className="space-y-1.5">
              <label htmlFor="ingredients" className="block text-xs font-bold text-slate-700">
                Ingredients
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter key ingredients"
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all text-xs resize-none"
              />
            </div>

            {/* Weight and Features (Side-by-side) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Weight */}
              <div className="space-y-1.5">
                <label htmlFor="weight" className="block text-xs font-bold text-slate-700">
                  Weight
                </label>
                <input
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 500g"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all text-xs"
                />
              </div>

              {/* Features */}
              <div className="space-y-1.5">
                <label htmlFor="features" className="block text-xs font-bold text-slate-700">
                  Features
                </label>
                <textarea
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Enter key features"
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all text-xs resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Card: Select Tone & Button */}
      <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
        <ToneSelector selectedTone={tone} onSelectTone={setTone} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-xs"
        >
          <Sparkles size={14} className={isGenerating ? "animate-spin" : ""} fill="currentColor" />
          <span>{isGenerating ? "Generating..." : "Generate Description"}</span>
        </button>
      </div>

    </form>
  );
}

export default ProductForm;
