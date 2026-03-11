// src/app/(dashboard)/seller/sales/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next-auth/next";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { ShoppingBag, TrendingUp, Clock } from "lucide-react";

export default async function SalesPage() {
  const session = await getServerSession(authOptions);
  
  // Role Protection
  if (!session || session.user.role?.toLowerCase() !== "seller") {
    redirect("/login");
  }

  await connectDB();

  // আপনার Order Model থেকে রিয়েল ডেটা ফেচ করা
  const sales = await Order.find({ seller: session.user.id })
    .populate("product")
    .sort({ createdAt: -1 });

  return (
    <div className="space-y-8 p-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Sales & <span className="text-amber-500">Orders</span>
          </h1>
          <p className="text-slate-500 font-medium">Track your revenue and shipping status.</p>
        </div>
        
        {/* Quick Stats Summary */}
        <div className="flex gap-4">
          <div className="bg-white border p-4 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="bg-green-50 p-2 rounded-xl text-green-600"><TrendingUp size={20} /></div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Net Earnings</p>
              <p className="text-lg font-black text-slate-900">
                ৳{sales.reduce((acc, curr) => acc + (curr.escrowStatus === 'released' ? curr.netSellerAmount : 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Order details</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Net Amount</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Escrow Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold">
                        <ShoppingBag size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{sale.product?.name || "Product Deleted"}</p>
                        <p className="text-[10px] font-mono text-slate-400 uppercase">ID: #{sale.tran_id?.slice(-8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="font-black text-slate-900">৳{sale.netSellerAmount?.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 line-through">৳{sale.amount?.toLocaleString()}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold text-slate-600">{new Date(sale.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 w-fit
                      ${sale.escrowStatus === 'released' ? 'bg-green-100 text-green-700' : 
                        sale.escrowStatus === 'held' || sale.escrowStatus === 'shipped' ? 'bg-amber-100 text-amber-700' : 
                        'bg-slate-100 text-slate-600'}`}>
                      {sale.escrowStatus === 'shipped' && <Clock size={12} />}
                      {sale.escrowStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sales.length === 0 && (
          <div className="p-20 text-center">
            <ShoppingBag size={48} className="mx-auto text-slate-100 mb-4" />
            <p className="text-slate-400 font-bold">No sales data recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}