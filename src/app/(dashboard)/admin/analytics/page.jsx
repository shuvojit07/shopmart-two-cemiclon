import Order from "@/models/Order";
import Product from "@/models/Product"; // Populate kaj korar jonno model gulo thaka dorkar
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { BarChart3, TrendingUp, ShieldCheck, Clock } from "lucide-react";

export default async function AdminAnalytics() {
  await connectDB();

  // 1. Stats Aggregation (Data fetch korar somoy 0 handle kora hoyeche)
  const stats = await Order.aggregate([
    {
      $group: {
        _id: "$escrowStatus",
        count: { $sum: 1 },
        total: { $sum: "$amount" },
      },
    },
  ]);

  // 2. Recent Transactions (Safe Populate)
  const recentTransactions = await Order.find()
    .populate({ path: "buyer", select: "name email", model: User })
    .populate({ path: "seller", select: "name email", model: User })
    .populate({ path: "product", select: "name price", model: Product })
    .sort({ createdAt: -1 })
    .limit(10);

  return (
    <div className="p-4 sm:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
          <BarChart3 className="text-amber-500" size={36} />
          System <span className="text-amber-500 font-black">Monitoring</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2 italic text-lg">Real-time platform overview and fund tracking.</p>
      </div>

      {/* Stats Grid - Aro sundor Amber design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.length > 0 ? stats.map((s) => (
          <div key={s._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-amber-200 transition-all">
            <div className="relative z-10">
              <p className="text-slate-400 uppercase text-[11px] font-black tracking-[0.2em] mb-2">
                {s._id || "In Review"} Status
              </p>
              <h3 className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">${s.total.toLocaleString()}</h3>
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm bg-amber-50 w-fit px-3 py-1 rounded-full border border-amber-100">
                <TrendingUp size={14} />
                {s.count} Orders
              </div>
            </div>
            {/* Background Icon Decor */}
            <div className="absolute -right-4 -bottom-4 text-slate-50 opacity-10 group-hover:text-amber-500 group-hover:opacity-10 transition-all">
               <ShieldCheck size={120} />
            </div>
          </div>
        )) : (
          <p className="text-slate-400 italic">No transaction data available yet.</p>
        )}
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/30">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
               <Clock className="text-amber-500" size={20} /> Recent Operations
            </h3>
            <button className="text-amber-600 font-black text-xs uppercase tracking-widest hover:underline">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Parties (S/B)</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Escrow Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {recentTransactions.map((tx) => (
                <tr key={tx._id} className="group hover:bg-amber-50/30 transition-all duration-300">
                  <td className="p-6">
                    <span className="font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                      {tx.product?.name || "Deleted Product"}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700 leading-none">Seller: {tx.seller?.name || "N/A"}</p>
                      <p className="text-[10px] font-medium text-slate-400 leading-none">Buyer: {tx.buyer?.name || "N/A"}</p>
                    </div>
                  </td>
                  <td className="p-6 font-black text-slate-900 text-lg">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border shadow-sm ${
                      tx.escrowStatus === 'released' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {tx.escrowStatus}
                    </span>
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