import logo from "../assets/logo.png";
import { LayoutDashboard, History, Settings, ChevronDown, User, X } from "lucide-react";

function Sidebar({ currentTab, setCurrentTab, isOpen, onClose }) {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "history", name: "History", icon: History },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#080F1E] text-white flex flex-col justify-between border-r border-slate-900/60 shrink-0 transform transition-transform duration-300 ease-in-out z-50 lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        
        {/* Top Branding Section */}
        <div>
          <div className="p-6 relative">
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white lg:hidden p-1.5 rounded-xl hover:bg-slate-800/80 transition-all duration-150 cursor-pointer active:scale-95"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="HimWrite AI"
                className="w-10 h-10 object-contain rounded-xl shadow-md shadow-blue-500/10"
              />
              <div>
                <h1 className="text-base font-extrabold text-white tracking-tight leading-tight">
                  HimWrite AI
                </h1>
                <p className="text-[10px] text-slate-400 font-bold leading-tight mt-0.5 tracking-wider uppercase">
                  AI Copywriter
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="px-4 py-2 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    // Close sidebar on mobile after clicking
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer select-none active:scale-[0.99] ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile section */}
        <div className="p-6">
          {/* Guest User Profile Block (Matches Mockup) */}
          <div className="flex items-center justify-between px-2 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700/50 shadow-inner">
                <User size={18} />
              </div>
              <div className="overflow-hidden">
                <h5 className="text-xs font-bold text-white leading-tight">Guest User</h5>
                <p className="text-[10px] text-slate-500 truncate font-semibold mt-0.5">guest@example.com</p>
              </div>
            </div>
            <ChevronDown size={14} className="text-slate-500 cursor-pointer hover:text-slate-300 transition" />
          </div>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;