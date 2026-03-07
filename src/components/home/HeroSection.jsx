"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingBag, Percent, Truck, Zap, ShieldCheck, ChevronRight, Star, ArrowUpRight, Cpu, Layers, MousePointer2 } from "lucide-react";
import Image from "next/image";

const products = [
  {
    _id: "69a9ce3d075ab734aa92d9e5",
    name: "Modern Smartwatch",
    brand: "TECHFIT",
    price: 115,
    discountPrice: 90,
    img: "https://i.ibb.co/LzYmX7q/smartwatch.png", 
    shortDescription: "Ultra-precise fitness tracking with Amoled Display.",
    category: "Wearables",
    accent: "from-orange-500 to-red-600"
  },
  {
    _id: "69a9ce3d075ab734aa92d9e6",
    name: "Robot Vacuum",
    brand: "CLEANBOT",
    price: 320,
    discountPrice: 280,
    img: "https://i.ibb.co/vYf8M3Z/robot-vacuum.png", 
    shortDescription: "AI-powered room mapping & silent operation.",
    category: "Home AI",
    accent: "from-blue-500 to-cyan-400"
  }
];

export default function NextGenHeroUI() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseY, [-400, 400], [15, -15]);
  const rotateY = useTransform(mouseX, [-400, 400], [-15, 15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - (rect.left + rect.width / 2));
      y.set(e.clientY - (rect.top + rect.height / 2));
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#020202] text-white overflow-hidden selection:bg-orange-500 selection:text-black"
    >
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      {/* Floating UI Elements */}
      <motion.div 
        style={{ x: useTransform(mouseX, [0, 1], [0, 0.1]), y: useTransform(mouseY, [0, 1], [0, 0.1]) }}
        className="absolute top-20 right-20 z-10 hidden lg:block"
      >
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <Zap className="text-orange-500" size={24} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Deals</p>
            <p className="text-sm font-bold">24% Flash Sale</p>
          </div>
        </div>
      </motion.div>

      <div className="relative z-20 container mx-auto px-6 pt-12">
        
        {/* Top Navbar Simulation */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-lg flex items-center justify-center font-black text-black">G</div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Gemini.AI</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-orange-500 transition-colors">Catalog</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Lab Edition</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Community</a>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all cursor-pointer">
              <Search size={18} />
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-orange-600 text-black hover:bg-orange-500 transition-all cursor-pointer">
              <ShoppingBag size={18} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Section */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "circOut" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[1px] bg-orange-600"></span>
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-orange-500">
                    New Generation {products[index].category}
                  </span>
                </div>

                <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter uppercase">
                  {products[index].name.split(" ")[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                    {products[index].name.split(" ")[1]}
                  </span>
                </h1>

                <p className="text-gray-400 text-xl max-w-md mb-12 leading-relaxed font-medium italic">
                  &quot;{products[index].shortDescription}&quot;
                </p>

                <div className="flex flex-wrap items-center gap-8">
                  <button className="relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full overflow-hidden group transition-all">
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Purchase <ArrowUpRight size={16} />
                    </span>
                    <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pricing Model</span>
                    <span className="text-3xl font-black font-mono text-orange-500">${products[index].discountPrice}.00</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual Section (The Image/3D Box) */}
          <div className="relative perspective-[2000px]">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full aspect-square max-w-[500px] mx-auto"
            >
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-[60px] animate-spin-slow" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 1.5, opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className={`absolute w-[80%] h-[80%] bg-gradient-to-br ${products[index].accent} rounded-full opacity-20 blur-[100px]`} />
                  
                  <div className="relative w-full h-full p-10">
                     <Image
                        src={products[index].img}
                        alt={products[index].name}
                        fill
                        className="object-contain z-20 drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                        priority
                        unoptimized
                      />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* HUD Elements */}
              <div className="absolute -bottom-10 -right-10 bg-black/80 border border-white/10 p-6 rounded-3xl backdrop-blur-xl z-30 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu size={14} className="text-orange-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Specs</span>
                  </div>
                  <p className="text-xs font-bold leading-tight uppercase">Quantum Core v2.0 Architecture Enabled</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Metrics */}
        <div className="mt-24 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Durability", value: "99.9%", icon: ShieldCheck },
              { label: "Fastest Delivery", value: "24h", icon: Truck },
              { label: "Global Stock", value: "70+", icon: Layers },
              { label: "Rating", value: "4.9/5", icon: Star },
            ].map((stat, i) => (
              <div key={stat.label} className="group cursor-crosshair">
                <div className="flex items-center gap-3 text-gray-500 mb-2 group-hover:text-orange-500 transition-colors">
                  <stat.icon size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
                <p className="text-2xl font-black font-mono tracking-tighter">{stat.value}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Background Dots/Grid */}
      <div className="absolute inset-0 z-[-1] opacity-20" 
           style={{backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px'}}>
      </div>
    </section>
  );
}