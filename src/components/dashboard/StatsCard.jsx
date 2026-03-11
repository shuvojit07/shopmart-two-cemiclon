"use client";

import { 
  ShoppingBag, 
  Hourglass, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  Wallet 
} from "lucide-react";
import { motion } from "framer-motion";

export default function StatsCard({ role, data }) {
  // Config for different roles
  const statsConfig = {
    buyer: [
      { label: "Total Orders", value: data.totalOrders, icon: ShoppingBag, color: "bg-blue-500" },
      { label: "In Escrow", value: `$${data.escrowAmount}`, icon: Hourglass, color: "bg-amber-500" },
      { label: "Completed", value: data.completedOrders, icon: CheckCircle2, color: "bg-green-500" },
    ],
    seller: [
      { label: "Active Sales", value: data.activeSales, icon: TrendingUp, color: "bg-blue-500" },
      { label: "Held in Escrow", value: `$${data.heldAmount}`, icon: Hourglass, color: "bg-amber-500" },
      { label: "Total Earnings", value: `$${data.earnings}`, icon: Wallet, color: "bg-green-500" },
    ],
    admin: [
      { label: "Total Disputes", value: data.disputes, icon: AlertCircle, color: "bg-red-500" },
      { label: "Platform Escrow", value: `$${data.platformEscrow}`, icon: Hourglass, color: "bg-amber-500" },
      { label: "Total Users", value: data.totalUsers, icon: CheckCircle2, color: "bg-indigo-500" },
    ],
  };

  const currentStats = statsConfig[role] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {currentStats.map((stat, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={stat.label}
          className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          {/* Subtle Background Pattern */}
          <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-150 ${stat.color}`} />
          
          <div className="flex items-center gap-5">
            <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
              <stat.icon size={24} />
            </div>
            
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
          
          {/* Progress Indicator (Optional visual) */}
          <div className="mt-4 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              className={`h-full ${stat.color} opacity-30`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}