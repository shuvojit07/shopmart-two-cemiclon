"use client";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Percent, Truck, Zap } from "lucide-react";


export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-white pt-6 pb-20 overflow-hidden">
      {/* Top Promotional Bar (Optional) */}
      <div className="bg-orange-600 text-white text-center py-2 text-sm font-medium">
        🎉 Flash Sale starts in 05:12:44 - Up to 70% Off!
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Side Categories (Desktop Only) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block lg:col-span-3 bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-sm"
          >
            <h3 className="font-bold text-slate-800 mb-4 px-2">Top Categories</h3>
            <nav className="space-y-1">
              {['Electronics', 'Fashion & Beauty', 'Home & Decor', 'Health & Fitness', 'Groceries'].map((cat) => (
                <a key={cat} href="#" className="block px-3 py-2 text-slate-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors text-sm font-medium">
                  {cat}
                </a>
              ))}
              <hr className="my-2 border-slate-200" />
              <a href="#" className="block px-3 py-2 text-orange-600 font-bold text-sm">View All Categories</a>
            </nav>
          </motion.div>

          {/* 2. Main Banner & Search */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search Bar Container */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-2xl"
            >
              <input 
                type="text" 
                placeholder="Search for products, brands and more..." 
                className="w-full pl-12 pr-32 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none text-slate-700 shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all text-sm">
                Search
              </button>
            </motion.div>

            {/* Main Interactive Banner */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative h-[400px] lg:h-[450px] rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden shadow-2xl"
            >
              {/* Decorative Background Circles */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-16">
                <motion.span variants={fadeInUp} className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                  <Zap size={16} fill="currentColor" /> New Season Arrival
                </motion.span>
                <motion.h1 variants={fadeInUp} className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Upgrade Your <br /> 
                  <span className="text-orange-500">Digital Lifestyle.</span>
                </motion.h1>
                <motion.div variants={fadeInUp} className="flex gap-4">
                  <button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-900/20">
                    Shop Now
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold transition-all border border-white/20">
                    Learn More
                  </button>
                </motion.div>
              </div>

              {/* Floating Product Tag (Optional visual) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 hidden lg:block bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl"
              >
                <div className="w-48 h-32 bg-slate-700 rounded-lg mb-3 animate-pulse" />
                <p className="text-white font-bold">Latest Tech</p>
                <p className="text-orange-400 text-sm">Starting at $299</p>
              </motion.div>
            </motion.div>

            {/* 3. Benefit Cards (Trust Bar) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: ShoppingBag, label: "Secure Payment", sub: "100% Protected" },
                { icon: Percent, label: "Best Prices", sub: "Guaranteed" },
                { icon: ShieldCheck, label: "Easy Returns", sub: "7 Day Policy" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.label}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Helper icon component for the map
function ShieldCheck({ size, className }) {
  return <path className={className} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />;
}