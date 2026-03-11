"use client";
import { useState, useEffect } from "react";
import { Package, Truck, CheckCircle2, AlertCircle, ExternalLink, Clock } from "lucide-react";

export default function BuyerView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/buyer/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "held": return "bg-blue-50 text-blue-600 border-blue-100";
      case "shipped": return "bg-amber-50 text-amber-600 border-amber-100";
      case "confirmed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "disputed": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse font-black italic text-slate-400">Syncing your purchases...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-black italic text-slate-900 tracking-tight">
          My <span className="text-amber-500">Orders</span>
        </h2>
        <p className="text-slate-500 font-bold">Track your escrow protection and delivery status.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <Package className="mx-auto text-slate-200 mb-4" size={60} />
            <p className="text-slate-400 font-black uppercase italic">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white p-6 md:p-8 rounded-[3rem] border-2 border-slate-50 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction ID: {order.tran_id}</p>
                  <h3 className="text-xl font-black text-slate-900 italic">৳{order.amount}</h3>
                </div>
                
                <div className={`px-4 py-2 rounded-2xl border font-black uppercase text-[10px] tracking-wider flex items-center gap-2 ${getStatusColor(order.escrowStatus)}`}>
                  {order.escrowStatus === 'shipped' ? <Truck size={14} /> : <Clock size={14} />}
                  {order.escrowStatus.replace('_', ' ')}
                </div>
              </div>

              {/* Progress Tracker Visual */}
              <div className="mt-8 flex items-center justify-between relative">
                <div className="absolute left-0 right-0 h-1 bg-slate-100 -z-10 top-1/2 -translate-y-1/2"></div>
                {['payment_pending', 'held', 'shipped', 'delivered', 'confirmed'].map((step, idx) => {
                  const isPast = ['payment_pending', 'held', 'shipped', 'delivered', 'confirmed'].indexOf(order.escrowStatus) >= idx;
                  return (
                    <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center border-4 ${isPast ? 'bg-amber-500 border-white text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300'}`}>
                      {isPast ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {order.escrowStatus === 'shipped' && (
                  <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg shadow-slate-200">
                    Confirm Receipt
                  </button>
                )}
                {order.escrowStatus === 'held' && (
                  <button className="bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl font-black text-xs border border-rose-100">
                    Open Dispute
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}