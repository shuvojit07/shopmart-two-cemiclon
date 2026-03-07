"use client";

import { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Image as ImageIcon, 
  CheckCircle, 
  RotateCcw, 
  ExternalLink, 
  Loader2, 
  AlertCircle,
  Clock,
  User,
  DollarSign
} from "lucide-react";

export default function AdminDisputeCenter() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
      const res = await fetch("/api/admin/disputes");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setDisputes(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching disputes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (orderId, action) => {
    if (!confirm(`Are you sure you want to ${action} this escrow?`)) return;

    setProcessingId(orderId);
    try {
      const res = await fetch("/api/admin/dispute/resolve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action }),
      });

      if (res.ok) {
        setDisputes((prev) => prev.filter(d => d._id !== orderId));
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to process decision.");
      }
    } catch (error) {
      alert("Network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
        <Loader2 className="animate-spin text-amber-500" size={48} />
        <p className="text-slate-500 font-bold">Loading active disputes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 p-2 rounded-xl">
              <ShieldAlert className="text-amber-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Dispute <span className="text-amber-500">Center</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">
            Reviewing <span className="text-amber-600 font-bold">{disputes.length} pending</span> cases.
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {disputes.length > 0 ? (
          disputes.map((order) => (
            <div 
              key={order._id} 
              className={`bg-white border-2 border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 lg:p-10 shadow-sm transition-all relative ${processingId === order._id ? 'opacity-40 grayscale pointer-events-none' : 'hover:shadow-xl hover:border-amber-100'}`}
            >
              {processingId === order._id && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Loader2 className="animate-spin text-amber-600" size={40} />
                </div>
              )}

              <div className="flex flex-col lg:flex-row justify-between gap-10">
                {/* Left: Info */}
                <div className="flex-1 order-2 lg:order-1">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-red-100">
                      Disputed
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold font-mono bg-slate-50 px-2 py-1 rounded-md">
                      #{order.tran_id || order._id.slice(-8)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-6 capitalize">
                    {order.product?.name || "Order Item"}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Buyer</p>
                      <p className="text-sm text-slate-800 font-bold flex items-center gap-2">
                        <User size={14} className="text-amber-500" /> {order.buyer?.name || "N/A"}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-1">{order.buyer?.email}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Seller</p>
                      <p className="text-sm text-slate-800 font-bold flex items-center gap-2">
                        <User size={14} className="text-slate-400" /> {order.seller?.name || "N/A"}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-1">{order.seller?.email || "No Email Provided"}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 bg-amber-50 w-fit px-4 py-2 rounded-xl border border-amber-100">
                     <DollarSign size={18} className="text-amber-600" />
                     <span className="text-xl font-black text-amber-700">{order.amount}</span>
                  </div>
                </div>

                {/* Middle: Evidence */}
                <div className="flex-1 order-1 lg:order-2">
                  <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 h-full flex flex-col min-h-[200px]">
                    <h4 className="text-[10px] font-black uppercase text-amber-400 mb-3 tracking-widest flex items-center gap-2">
                      <AlertCircle size={14} /> Dispute Reason
                    </h4>
                    <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed mb-6 italic">
                    {order.disputeDetails || "No details provided by buyer."}
                    </p>
                    
                    {order.proofLink && (
                      <a 
                        href={order.proofLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-auto group flex items-center gap-3 bg-white/10 hover:bg-amber-500 transition-all px-5 py-3 rounded-xl text-white font-bold text-xs w-fit border border-white/5"
                      >
                        <ImageIcon size={16} /> 
                        Inspect Proof 
                        <ExternalLink size={12} className="opacity-50" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-3 justify-center w-full lg:w-64 order-3">
                  <button 
                    onClick={() => handleAction(order._id, "released")}
                    className="group bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95"
                  >
                    <CheckCircle size={18} /> Release to Seller
                  </button>

                  <button 
                    onClick={() => handleAction(order._id, "refunded")}
                    className="group border-2 border-amber-500 text-amber-600 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-amber-600 hover:text-white transition-all active:scale-95"
                  >
                    <RotateCcw size={18} /> Refund to Buyer
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-bold mt-2 px-2 uppercase tracking-tighter">
                    * Final decision. irreversible.
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
             <div className="bg-emerald-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-emerald-500" />
             </div>
             <h3 className="text-xl font-black text-slate-900">No active disputes</h3>
             <p className="text-slate-500">Everything is running smoothly.</p>
          </div>
        )}
      </div>
    </div>
  );
}