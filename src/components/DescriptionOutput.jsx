import React, { useState } from "react";
import { Copy, Check, RefreshCw, Sparkles } from "lucide-react";

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
    <div className="bg-white border border-slate-100 rounded-2xl flex flex-col h-full min-h-[460px] overflow-hidden shadow-sm relative p-6">
      
      {/* Title */}
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Generated Description
      </h3>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[280px] space-y-3 text-center bg-slate-50/50 rounded-xl border border-slate-100 p-6">
            <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-blue-600 animate-spin"></div>
            <p className="text-sm font-semibold text-slate-700">Generating copy...</p>
          </div>
        ) : !result ? (
          /* Empty State Banner (Matches Mockup) */
          <div className="flex-1 flex flex-col items-center justify-center min-h-[280px] text-center bg-[#F4F7FE] border border-blue-100/50 rounded-xl p-8 space-y-4">
            <div className="p-3 bg-white rounded-full shadow-sm text-blue-600 animate-pulse">
              <Sparkles size={24} fill="currentColor" className="text-blue-500 fill-blue-100" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">
                Your AI generated description will appear here...
              </h4>
              <p className="text-xs text-slate-500 max-w-[340px] leading-relaxed">
                Fill the product details above and click on "Generate Description" to create amazing content.
              </p>
            </div>
          </div>
        ) : (
          /* Active Result Display */
          <div className="flex-1 space-y-4 text-slate-700 text-sm leading-relaxed overflow-y-auto max-h-[300px] pr-2 select-text">
            <div>
              <h4 className="text-base font-bold text-slate-900">{result.title}</h4>
              <p className="text-xs font-semibold text-slate-400 italic">"{result.tagline}"</p>
            </div>
            
            <p className="text-xs text-slate-600 whitespace-pre-wrap">{result.description}</p>
            
            <div className="space-y-1">
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features</h5>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                {result.bullets.map((b, idx) => (
                  <li key={idx}>
                    {b.replace(/\*\*/g, "")}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-0.5">Call To Action</span>
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
          className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            copied
              ? "bg-emerald-50 border-emerald-500 text-white"
              : "border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>Copy</span>
        </button>

        <button
          onClick={onRegenerate}
          disabled={!result || isGenerating}
          className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
          <span>Regenerate</span>
        </button>
      </div>

    </div>
  );
}

export default DescriptionOutput;
