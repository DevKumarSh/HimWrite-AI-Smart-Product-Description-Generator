import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProductForm from "../components/ProductForm";
import DescriptionOutput from "../components/DescriptionOutput";
import EmptyState from "../components/EmptyState";
import { generateProductDescription } from "../utils/mockGenerator";
import logo from "../assets/logo.png";
import { 
  History as HistoryIcon, 
  Trash2, 
  LayoutDashboard, 
  ShieldCheck, 
  Copy,
  Check,
  Menu
} from "lucide-react";

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem("himwrite_history");
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      return [];
    }
  });
  const [currentResult, setCurrentResult] = useState(null);
  const [lastFormData, setLastFormData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  // Settings mock state
  const [apiKey, setApiKey] = useState("hw_live_••••••••••••••••••••");
  const [saveLocal, setSaveLocal] = useState(true);

  const saveHistoryToStorage = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem("himwrite_history", JSON.stringify(newHistory));
  };

  const handleGenerate = (formData) => {
    setIsGenerating(true);
    setLastFormData(formData);
    
    // Simulate generation delay
    setTimeout(() => {
      const generated = generateProductDescription(formData);
      const newRecord = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        inputs: formData,
        result: generated
      };

      const updatedHistory = [newRecord, ...history];
      saveHistoryToStorage(updatedHistory);
      setCurrentResult(newRecord);
      setIsGenerating(false);
    }, 1500);
  };

  const handleRegenerate = () => {
    if (lastFormData) {
      handleGenerate(lastFormData);
    }
  };

  const handleClearHistory = () => {
    saveHistoryToStorage([]);
    setCurrentResult(null);
    setConfirmClear(false);
  };

  const handleDeleteHistoryItem = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    saveHistoryToStorage(updatedHistory);
    if (currentResult && currentResult.id === id) {
      setCurrentResult(null);
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // Views rendering
  const renderDashboardView = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Header section with title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Generate Product Description
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
            Create professional, SEO-friendly product descriptions for your products in seconds.
          </p>
        </div>
      </div>

      {/* Product Form containing inputs and Tone Selection side-by-side */}
      <ProductForm onSubmit={handleGenerate} isGenerating={isGenerating} />

      {/* Description Output spanning full width */}
      <DescriptionOutput 
        result={currentResult?.result} 
        isGenerating={isGenerating} 
        onRegenerate={handleRegenerate}
      />
    </div>
  );

  const renderHistoryView = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Copywriting History Log</h2>
          <p className="text-xs text-slate-500 mt-1 font-semibold">Access past generated product marketing copy templates.</p>
        </div>
        {history.length > 0 && (
          <div className="flex items-center gap-2">
            {confirmClear ? (
              <>
                <span className="text-xs font-bold text-slate-500">Clear all history?</span>
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-rose-400 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition cursor-pointer select-none"
                >
                  <Trash2 size={13} />
                  Yes, Clear
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer select-none"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-2 px-4 py-2.5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition cursor-pointer select-none"
              >
                <Trash2 size={14} />
                Clear Log
              </button>
            )}
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyState
          icon={HistoryIcon}
          title="No Past Generations"
          description="Your generated description items will appear here for easy editing and retrieval."
          variant="slate"
        />
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 transition hover:shadow-md">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg uppercase tracking-wider capitalize">
                    {item.inputs.tone} Tone
                  </span>
                  {item.inputs.weight && (
                    <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                      {item.inputs.weight}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-bold">
                    {item.timestamp}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{item.result.title}</h4>
                <p className="text-xs text-slate-500 font-medium italic">Ingredients: {item.inputs.ingredients || "N/A"}</p>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl line-clamp-3 font-medium">{item.result.description}</p>
              </div>

              <div className="flex md:flex-col items-center gap-2 self-end md:self-start">
                <button
                  onClick={() => {
                    setLastFormData(item.inputs);
                    setCurrentResult(item);
                    setCurrentTab("dashboard");
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer select-none"
                >
                  Load to Panel
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      const fullText = `# ${item.result.title}\n\n${item.result.description}`;
                      copyToClipboard(fullText, item.id);
                    }}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      copiedId === item.id
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => handleDeleteHistoryItem(item.id)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettingsView = () => (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Settings Page</h2>
        <p className="text-xs text-slate-500 mt-1 font-semibold">Configure your generation profiles and database settings.</p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Section 1: API Configuration */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-600" /> Key Authentication
          </h3>
          <div className="space-y-2 max-w-2xl">
            <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">HimWrite API Key</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold">
              Settings are stored locally on your device browser.
            </p>
          </div>
        </div>

        {/* Section 2: Generation Preferences */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <LayoutDashboard size={16} className="text-blue-600" /> Preferences
          </h3>
          <div className="flex items-center gap-3">
            <input
              id="saveLocalCheck"
              type="checkbox"
              checked={saveLocal}
              onChange={(e) => setSaveLocal(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="saveLocalCheck" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
              Save descriptions to history logs automatically
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return renderDashboardView();
      case "history":
        return renderHistoryView();
      case "settings":
        return renderSettingsView();
      default:
        return renderDashboardView();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] text-slate-800 antialiased font-sans">
      {/* Sidebar navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-[#080F1E] border-b border-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="HimWrite AI"
              className="w-8 h-8 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-sm font-extrabold text-white leading-tight">HimWrite AI</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">AI Copywriter</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer active:scale-95"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto space-y-6">
            {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;
