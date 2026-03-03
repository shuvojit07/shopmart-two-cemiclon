"use client";
import { motion } from "framer-motion";
import { Laptop, Shirt, Home, Sparkles, Trophy, Watch, Smartphone, Camera } from "lucide-react";

const categories = [
  { name: "Electronics", icon: <Smartphone size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Fashion", icon: <Shirt size={20} />, color: "text-pink-600", bg: "bg-pink-50" },
  { name: "Home", icon: <Home size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Beauty", icon: <Sparkles size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Sports", icon: <Trophy size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
  { name: "Gadgets", icon: <Laptop size={20} />, color: "text-indigo-600", bg: "bg-indigo-50" },
  { name: "Luxury", icon: <Watch size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
  { name: "Cameras", icon: <Camera size={20} />, color: "text-cyan-600", bg: "bg-cyan-50" },
];

export default function CompactCategoryBar() {
  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Popular Categories</h2>
          <button className="text-sm font-bold text-orange-600 hover:underline">View All</button>
        </div>

        {/* Horizontal Scroll on Mobile, Flex on Desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {categories.map((cat, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap transition-all border border-transparent hover:border-slate-200 hover:shadow-sm ${cat.bg}`}
            >
              <span className={cat.color}>{cat.icon}</span>
              <span className="text-sm font-bold text-slate-700">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}