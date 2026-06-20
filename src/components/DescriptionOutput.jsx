import { useState } from "react";
import { Copy, Check, RefreshCw, Sparkles } from "lucide-react";
import EmptyState from "./EmptyState";

function DescriptionOutput({ result, isGenerating, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  const getFormattedText = () => {
    if (!result) return "";
    return `# ${result.title}\n\n*${result.tagline}*\n\n${result.description}\n\n## Key Features\n${result.bullets.map(b => `- ${b.replace(/\*\*/g, "")}`).join("\n")}\n\n**${result.callToAction}**`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFormattedText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl flex flex-col h-full min-h-[460px] overflow-hidden shadow-sm relative p-6 hover:shadow-md transition-shadow duration-200">
      
      {/* Title */}
      <h3 className="text-base font-extrabold text-slate-800 mb-4 tracking-tight">
        Generated Description
      </h3>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center">
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[280px] space-y-4 text-center bg-slate-50/50 rounded-xl border border-slate-100 p-6">
            <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-blue-600 animate-spin"></div>
            <p className="text-xs font-bold text-slate-700">Generating copy...</p>
          </div>
        ) : !result ? (
          /* Empty State (Modular Component) */
          <EmptyState
            icon={Sparkles}
            title="Your AI generated description will appear here..."
            description="Fill the product details above and click on 'Generate Description' to create amazing content."
            variant="blue"
          />
        ) : (
          /* Active Result Display */
          <div className="flex-1 space-y-5 text-slate-700 text-xs leading-relaxed overflow-y-auto max-h-[300px] pr-2 select-text font-medium">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{result.title}</h4>
              <p className="text-[11px] font-semibold text-slate-400 italic mt-0.5">"{result.tagline}"</p>
            </div>
            
            <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">{result.description}</p>
            
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Features</h5>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                {result.bullets.map((b, idx) => (
                  <li key={idx} className="text-slate-600">
                    {b.replace(/\*\*/g, "")}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-widest block mb-0.5">Call To Action</span>
              <p className="font-bold text-slate-800 text-xs">{result.callToAction}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons (Matches Mockup bottom-right alignment) */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={handleCopy}
          disabled={!result || isGenerating}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98] ${
            copied
              ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm"
              : "border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300"
          }`}
        >
          {copied ? <Check size={14} className="text-emerald-600 animate-[scaleIn_0.15s_ease-out]" /> : <Copy size={14} />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>

        <button
          onClick={onRegenerate}
          disabled={!result || isGenerating}
          className="px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]"
        >
          <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
          <span>Regenerate</span>
        </button>
      </div>

    </div>
  );
}

export default DescriptionOutput;
