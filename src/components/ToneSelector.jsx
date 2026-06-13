import React from "react";
import { Crown, Leaf, Heart, CheckCircle2 } from "lucide-react";

const TONES = [
  {
    id: "premium",
    name: "Premium",
    description: "Luxury and high-quality tone",
    icon: Crown,
    circleColor: "bg-blue-50 text-blue-600",
    borderColor: "border-slate-200",
    activeBorderColor: "border-blue-600 ring-1 ring-blue-600/30",
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Authentic and heritage-focused tone",
    icon: Leaf,
    circleColor: "bg-emerald-50 text-emerald-600",
    borderColor: "border-slate-200",
    activeBorderColor: "border-blue-600 ring-1 ring-blue-600/30",
  },
  {
    id: "health-focused",
    name: "Health-Focused",
    description: "Health and wellness focused tone",
    icon: Heart,
    circleColor: "bg-rose-50 text-rose-600",
    borderColor: "border-slate-200",
    activeBorderColor: "border-blue-600 ring-1 ring-blue-600/30",
  },
];

function ToneSelector({ selectedTone, onSelectTone }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-slate-800">
        Select Tone
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TONES.map((tone) => {
          const IconComponent = tone.icon;
          const isActive = selectedTone === tone.id;
          
          return (
            <button
              key={tone.id}
              type="button"
              onClick={() => onSelectTone(tone.id)}
              className={`relative text-center p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md cursor-pointer bg-white flex flex-col items-center justify-center ${
                isActive
                  ? tone.activeBorderColor
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              {/* Checkmark in top-right for active tone */}
              {isActive && (
                <div className="absolute top-3 right-3 text-blue-600 animate-scaleIn">
                  <CheckCircle2 size={18} fill="currentColor" className="text-white fill-blue-600" />
                </div>
              )}

              {/* Centered circular icon */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${tone.circleColor}`}>
                <IconComponent size={24} />
              </div>

              {/* Title & Description */}
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                {tone.name}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[150px] mx-auto">
                {tone.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ToneSelector;
