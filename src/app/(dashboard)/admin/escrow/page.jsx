"use client"; // Client component na hole action kaj korbe na

import { useState, useEffect } from "react";
import { ShieldCheck, AlertTriangle, Search, Loader2, DollarSign, User, ExternalLink } from "lucide-react";

export default function AdminEscrowDashboard() {
  const [escrows, setEscrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // Data Fetching
  useEffect(() => {
    async function fetchEscrows() {
      try {
        const res = await fetch("/api/admin/escrows"); // Ensure this API exists
        const data = await res.json();
        setEscrows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEscrows();
  }, []);

  const handleAction = async (id, action) => {
    if (!confirm(`Are you sure you want to ${action} this?`)) return;
    setProcessingId(id);
    
    // API Call for Release/Dispute
    try {
      const res = await fetch(`/api/admin/escrows/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      if (res.ok) {
        setEscrows(prev => prev.map(item => item._id === id ? { ...item, status: action } : item));
      }
    } finally {
      setProcessingId(null);
    }
  };

  // Filter Search by Order ID or Buyer/Seller
  const filteredEscrows = escrows.filter(item => 
    item.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.buyer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Loader2 className="animate-spin text-amber-500" size={40} />
    </div>
  );

  return (
    <div className="p-4 sm:p-10 max-w-7xl mx-auto">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Escrow <span className="text-amber-500">Dashboard</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage and secure all platform transactions.</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search Order ID or User..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                <th className="p-6">Order Info</th>
                <th className="p-6">Parties</th>
                <th className="p-6">Amount</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEscrows.map((escrow) => (
                <tr key={escrow._id} className="hover:bg-amber-50/30 transition-colors group">
                  {/* Order ID */}
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-lg text-sm">
                        #{escrow.orderId}
                      </span>
                    </div>
                  </td>

                  {/* Parties (Buyer & Seller) */}
                  <td className="p-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <span className="text-amber-500 w-12">Buyer:</span> {escrow.buyer}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <span className="w-12">Seller:</span> {escrow.seller}
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-6">
                    <div className="flex items-center gap-1 font-black text-lg text-slate-900">
                      <DollarSign size={16} className="text-amber-600" />
                      {escrow.amount}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-6">
                    <span className={`
                      px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border
                      ${escrow.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                        escrow.status === 'disputed' ? 'bg-red-50 border-red-200 text-red-600' : 
                        'bg-emerald-50 border-emerald-200 text-emerald-700'}
                    `}>
                      {escrow.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-6">
                    <div className="flex justify-center gap-2">
                      <button 
                        disabled={processingId === escrow._id || escrow.status === 'released'}
                        onClick={() => handleAction(escrow._id, "released")}
                        className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-30"
                        title="Release Funds"
                      >
                        <ShieldCheck size={20} />
                      </button>
                      <button 
                        disabled={processingId === escrow._id || escrow.status === 'disputed'}
                        onClick={() => handleAction(escrow._id, "disputed")}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-30"
                        title="Open Dispute"
                      >
                        <AlertTriangle size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}