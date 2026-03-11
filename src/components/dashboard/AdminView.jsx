"use client";
import { useState, useEffect } from "react";
import { Users, ShoppingBag, ShieldCheck, TrendingUp, Activity, AlertCircle, Wallet, CheckCircle, XCircle } from "lucide-react";

export default function AdminView() {
  const [stats, setStats] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    try {
      const [statsRes, withdrawRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/withdraw/requests") // এই এপিআইটি নিচে দেওয়া আছে
      ]);

      if (!statsRes.ok || !withdrawRes.ok) throw new Error("Failed to fetch dashboard data");

      const statsData = await statsRes.json();
      const withdrawData = await withdrawRes.json();

      setStats(statsData);
      setWithdrawals(withdrawData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleWithdrawAction = async (requestId, action) => {
    const confirmMsg = action === 'approve' ? "Approve this payout?" : "Reject this payout?";
    if (!confirm(confirmMsg)) return;

    const res = await fetch(`/api/admin/withdraw/${action}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId })
    });

    if (res.ok) {
      alert(`Withdrawal ${action}d successfully!`);
      fetchAdminData(); // ডাটা রিফ্রেশ
    }
  };

  if (loading) return <div className="p-10 text-center font-black italic animate-pulse text-slate-400">Loading System Intelligence...</div>;

  if (error) return (
    <div className="p-10 text-center bg-red-50 rounded-[2rem] border-2 border-red-100">
      <AlertCircle className="mx-auto text-red-500 mb-2" size={40} />
      <p className="text-red-600 font-black uppercase italic">{error}</p>
    </div>
  );

  const cards = [
    { label: "Total Sellers", value: stats?.totalSellers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Buyers", value: stats?.totalBuyers || 0, icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Escrow Held", value: `৳${stats?.escrowBalance || 0}`, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Payouts", value: `৳${stats?.totalPendingPayouts || 0}`, icon: Wallet, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-black italic text-slate-900 tracking-tight">
          Admin <span className="text-amber-500">Overview</span>
        </h2>
        <p className="text-slate-500 font-bold">Monitor marketplace health and manage payouts.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className={`${card.bg} ${card.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>
              <card.icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{card.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Orders Table */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-50 p-8 shadow-sm">
          <h4 className="font-black text-xl italic text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-amber-500" size={20} /> Latest Orders
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-bold">
              <thead className="text-[10px] uppercase text-slate-400 border-b">
                <tr>
                  <th className="pb-4 px-2">ID</th>
                  <th className="pb-4 px-2">Amount</th>
                  <th className="pb-4 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats?.recentOrders?.map((order) => (
                  <tr key={order._id} className="text-slate-700">
                    <td className="py-4 px-2 font-mono text-[10px]">{order.tran_id?.slice(-8)}</td>
                    <td className="py-4 px-2 text-slate-900 font-black">৳{order.amount}</td>
                    <td className="py-4 px-2 text-[10px] uppercase">{order.escrowStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdrawal Requests Table */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-50 p-8 shadow-sm">
          <h4 className="font-black text-xl italic text-slate-900 mb-6 flex items-center gap-2">
            <Wallet className="text-rose-500" size={20} /> Payout Requests
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-bold">
              <thead className="text-[10px] uppercase text-slate-400 border-b">
                <tr>
                  <th className="pb-4 px-2">Seller</th>
                  <th className="pb-4 px-2">Amount</th>
                  <th className="pb-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {withdrawals.length === 0 ? (
                  <tr><td colSpan="3" className="py-10 text-center text-slate-400 italic">No pending requests</td></tr>
                ) : (
                  withdrawals.map((req) => (
                    <tr key={req._id} className="text-slate-700">
                      <td className="py-4 px-2">
                        <p className="text-slate-900 leading-none">{req.seller?.name}</p>
                        <span className="text-[9px] text-slate-400 font-mono">{req.method}: {req.accountDetails}</span>
                      </td>
                      <td className="py-4 px-2 text-rose-600 font-black">৳{req.amount}</td>
                      <td className="py-4 px-2 flex gap-2">
                        <button onClick={() => handleWithdrawAction(req._id, 'approve')} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors">
                          <CheckCircle size={18} />
                        </button>
                        <button onClick={() => handleWithdrawAction(req._id, 'reject')} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-colors">
                          <XCircle size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}