import { CheckCircle2 } from "lucide-react";

function ToneCard({
  name,
  description,
  icon: IconComponent,
  circleColor,
  isActive,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-center p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer bg-white flex flex-col items-center justify-center select-none
        ${
          isActive
            ? "border-blue-600 ring-4 ring-blue-600/10 shadow-md shadow-blue-600/5 translate-y-[-2px]"
            : "border-slate-100 hover:border-slate-200 hover:shadow-sm hover:translate-y-[-1px]"
        }`}
    >
      {/* Checkmark in top-right for active tone */}
      {isActive && (
        <div className="absolute top-3 right-3 text-blue-600 animate-[scaleIn_0.2s_ease-out]">
          <CheckCircle2 size={18} className="text-white fill-blue-600" />
        </div>
      )}

      {/* Centered circular icon */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3.5 transition-all duration-200
          ${isActive ? "scale-105" : ""}
          ${circleColor}`}
      >
        <IconComponent size={20} />
      </div>

      {/* Title & Description */}
      <h4 className="font-extrabold text-slate-800 text-sm mb-1">
        {name}
      </h4>
      <p className="text-[11px] text-slate-500 leading-relaxed max-w-[150px] mx-auto font-medium">
        {description}
      </p>
    </button>
  );
}

export default ToneCard;
