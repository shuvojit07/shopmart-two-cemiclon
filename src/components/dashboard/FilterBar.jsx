"use client";

import { Search, Filter, Calendar } from "lucide-react";

export default function FilterBar({ onSearch, onFilterChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
      
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="Search by Transaction ID or Product..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
        />
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        {/* Status Filter */}
        <div className="relative flex-1 md:flex-none">
          <select 
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-100 px-10 py-3 rounded-2xl outline-none text-sm font-bold text-slate-600 cursor-pointer focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Status</option>
            <option value="hold">In Escrow</option>
            <option value="released">Released</option>
            <option value="disputed">Disputed</option>
            <option value="refunded">Refunded</option>
          </select>
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>

        {/* Date Filter */}
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          <Calendar size={16} />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>
    </div>
  );
}   