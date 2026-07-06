import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Sparkles, Edit2, Save, X } from "lucide-react";
import EmptyState from "./EmptyState";

function DescriptionOutput({ id, result, isGenerating, onRegenerate, onUpdate }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (result) {
      setEditData(result);
    }
    setIsEditing(false);
  }, [result]);

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

  const handleSave = () => {
    if (onUpdate && id) {
      onUpdate(id, editData);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl flex flex-col h-full min-h-[460px] overflow-hidden shadow-sm relative p-6 hover:shadow-md transition-shadow duration-200">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
          Generated Description
        </h3>
        {id && !isGenerating && result && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Edit2 size={14} />
            <span>Edit</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center">
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[280px] space-y-4 text-center bg-slate-50/50 rounded-xl border border-slate-100 p-6">
            <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-blue-600 animate-spin"></div>
            <p className="text-xs font-bold text-slate-700">Generating copy...</p>
          </div>
        ) : !result ? (
          <EmptyState
            icon={Sparkles}
            title="Your AI generated description will appear here..."
            description="Fill the product details above and click on 'Generate Description' to create amazing content."
            variant="blue"
          />
        ) : isEditing && editData ? (
          /* Editing UI */
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[350px] pr-2">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Title</label>
              <input 
                type="text" 
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Tagline</label>
              <input 
                type="text" 
                value={editData.tagline}
                onChange={(e) => setEditData({...editData, tagline: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs italic focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Description</label>
              <textarea 
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Features (one per line)</label>
              <textarea 
                value={editData.bullets.join('\n')}
                onChange={(e) => setEditData({...editData, bullets: e.target.value.split('\n')})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Call To Action</label>
              <input 
                type="text" 
                value={editData.callToAction}
                onChange={(e) => setEditData({...editData, callToAction: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
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

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        {isEditing ? (
          <>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditData(result);
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-200"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

    </div>
  );
}

export default DescriptionOutput;
