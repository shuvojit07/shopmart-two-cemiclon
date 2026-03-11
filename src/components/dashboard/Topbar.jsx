"use client";
import { Bell, Search, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Topbar({ user }) {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Search Section */}
      <div className="relative hidden md:block w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm"
        />
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 leading-none">{user?.name}</p>
            <p className="text-[10px] font-bold text-amber-600 uppercase mt-1 tracking-widest">{user?.role}</p>
          </div>
          
          <button 
            onClick={() => signOut()}
            className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-amber-600 transition-colors shadow-lg shadow-slate-200"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}