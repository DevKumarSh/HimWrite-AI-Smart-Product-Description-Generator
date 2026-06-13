import React from "react";
import logo from "../assets/logo.png";
import { LayoutDashboard, History, Settings, ChevronDown, User } from "lucide-react";

function Sidebar({ currentTab, setCurrentTab }) {
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "history", name: "History", icon: History },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#080F1E] text-white flex flex-col justify-between border-r border-slate-900 shrink-0">
      
      {/* Top Branding Section */}
      <div>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="HimWrite AI"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                HimWrite AI
              </h1>
              <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                Smart Product Description Generator
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 py-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-600/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                <Icon size={18} />
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
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700/50">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <h5 className="text-xs font-bold text-white leading-tight">Guest User</h5>
              <p className="text-[10px] text-slate-500 truncate">guest@example.com</p>
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-500 cursor-pointer hover:text-slate-300 transition" />
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;