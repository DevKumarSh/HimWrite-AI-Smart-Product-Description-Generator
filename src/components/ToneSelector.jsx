import { Crown, Leaf, Heart } from "lucide-react";
import ToneCard from "./ToneCard";

const TONES = [
  {
    id: "premium",
    name: "Premium",
    description: "Luxury and high-quality tone",
    icon: Crown,
    circleColor: "bg-blue-50 text-blue-600",
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Authentic and heritage-focused tone",
    icon: Leaf,
    circleColor: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "health-focused",
    name: "Health-Focused",
    description: "Health and wellness focused tone",
    icon: Heart,
    circleColor: "bg-rose-50 text-rose-600",
  },
];

function ToneSelector({ selectedTone, onSelectTone }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
        Select Tone
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TONES.map((tone) => {
          const isActive = selectedTone === tone.id;
          
          return (
            <ToneCard
              key={tone.id}
              name={tone.name}
              description={tone.description}
              icon={tone.icon}
              circleColor={tone.circleColor}
              isActive={isActive}
              onClick={() => onSelectTone(tone.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ToneSelector;
