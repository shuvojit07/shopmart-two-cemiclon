"use client";

import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle2, AlertCircle, Search } from "lucide-react";

export default function SellerSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch("/api/orders"); // Ekhane backend e shudhu ei seller er data filter hobe
        const data = await res.json();
        setSales(data);
      } catch (error) {
        console.error("Failed to fetch sales", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSales();
  }, []);

  // Status Badge UI logic
  const getStatusBadge = (status) => {
    switch (status) {
      case "hold":
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1"><Clock size={12}/> In Escrow</span>;
      case "released":
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1"><CheckCircle2 size={12}/> Paid</span>;
      case "disputed":
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1"><AlertCircle size={12}/> Disputed</span>;
      default:
        return <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black uppercase">{status}</span>;
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading Sales Data...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Recent <span className="text-amber-500">Sales</span></h1>
          <p className="text-slate-500 mt-1 font-medium">Monitor your orders and escrow status here.</p>
        </div>
        
        {/* Quick Search UI */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {sales.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
             <Package className="mx-auto text-slate-200 mb-4" size={48} />
             <p className="text-slate-400 font-bold">No sales found yet.</p>
          </div>
        ) : (
          sales.map((sale) => (
            <div key={sale._id} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Package size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">{sale.product?.name || "Premium Product"}</h2>
                  <p className="text-sm text-slate-500 font-medium">Buyer: <span className="text-slate-900">{sale.buyer?.name}</span></p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">ID: {sale.tran_id}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center md:text-right">
                  <p className="text-2xl font-black text-slate-900">${sale.amount}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sale Amount</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(sale.escrowStatus)}
                  {sale.escrowStatus === "hold" && (
                    <p className="text-[9px] text-amber-600 font-bold animate-pulse italic">Waiting for Buyer to confirm</p>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}