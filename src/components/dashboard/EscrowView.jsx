"use client";
import { useState, useEffect } from "react";
import { Unlock, ShieldCheck, AlertCircle } from "lucide-react";

export default function EscrowView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/escrow-list")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const handleRelease = async (orderId) => {
    if (!confirm("Are you sure you want to release these funds to the seller?")) return;

    const res = await fetch("/api/orders/confirm-delivery", { // আগে তৈরি করা এপিআইটিই ব্যবহার করছি
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    if (res.ok) {
      alert("Funds released successfully!");
      setOrders(orders.filter(o => o._id !== orderId));
    }
  };

  if (loading) return <div className="p-10 text-center font-black italic">Loading Escrow Tasks...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-amber-500" size={28} />
        <h2 className="text-2xl font-black italic text-slate-900">Escrow <span className="text-amber-500">Operations</span></h2>
      </div>
      
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b-2 border-slate-50">
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th className="p-6">Transaction ID</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Customer Confirmation</th>
              <th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-bold text-sm">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-slate-400 italic">No pending fund releases.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-mono text-slate-600">{order.tran_id}</td>
                  <td className="p-6 font-black text-slate-900">৳{order.amount}</td>
                  <td className="p-6 text-emerald-500 italic text-xs">✓ Delivered & Verified</td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => handleRelease(order._id)}
                      className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black hover:bg-emerald-500 transition-all flex items-center gap-2 ml-auto"
                    >
                      <Unlock size={14} /> Release Funds
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}