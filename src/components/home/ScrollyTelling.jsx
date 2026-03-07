"use client";

import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimatePresence, 
  useTime 
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ProfessionalMinimalHero({ products }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const time = useTime();

  // --- MOUSE COORDINATES ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springConfig = { stiffness: 80, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // --- 1. CONTINUOUS "ROUND" FLOATING ANIMATION ---
  // We use Math.sin and Math.cos with 'time' to create a circular/orbital path
  const autoRotateX = useTransform(time, (t) => Math.sin(t / 2000) * 8); // Tilts up/down
  const autoRotateY = useTransform(time, (t) => Math.cos(t / 2500) * 10); // Tilts left/right
  const autoFloatY = useTransform(time, (t) => Math.sin(t / 1500) * 25); // Moves up/down 25px

  // --- 2. MOUSE-DRIVEN TRANSFORMS ---
  const mouseRotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const mouseRotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const mouseTiltX = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const mouseTiltY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  // --- 3. COMBINING AUTO + MOUSE (The Magic Sauce) ---
  const finalRotateX = useTransform([mouseRotateX, autoRotateX], ([m, a]) => m + a);
  const finalRotateY = useTransform([mouseRotateY, autoRotateY], ([m, a]) => m + a);
  const finalY = useTransform([mouseTiltX, autoFloatY], ([m, a]) => m + a);

  // Auto-cycle products
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [products.length]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center font-sans"
    >
      {/* BACKGROUND AMBIENT GLOW */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[140px] pointer-events-none"
        style={{ 
          background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          x: useTransform(smoothX, [-0.5, 0.5], [-150, 150]),
          y: useTransform(smoothY, [-0.5, 0.5], [-150, 150]),
        }}
      />

      <div className="relative z-10 w-full max-w-7xl px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* TEXT CONTENT */}
        <div className="flex flex-col items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-orange-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">
                Exclusive Collection
              </span>
              <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] mb-8 tracking-tighter italic">
                {products[index].name}
              </h1>
              <p className="text-gray-400 text-lg max-w-sm mb-12 leading-relaxed border-l border-orange-500/50 pl-6">
                Experience a masterclass in taste. Naturally sourced, 
                meticulously crafted, and designed for the refined palate.
              </p>
              
              <div className="flex items-center gap-8">
                <button className="group relative px-12 py-5 bg-white text-black rounded-full font-black overflow-hidden transition-transform active:scale-95">
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                    BUY NOW — ${products[index].price}
                  </span>
                  <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.23, 1, 0.32, 1]" />
                </button>
                
                <div className="flex gap-2">
                  {products.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-orange-500' : 'w-3 bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D FLOATING HERO IMAGE */}
        <div className="relative h-[500px] md:h-[750px] flex items-center justify-center [perspective:2000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0, rotateY: -45 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 1.2, opacity: 0, rotateY: 45 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              style={{ 
                rotateX: finalRotateX, 
                rotateY: finalRotateY, 
                x: mouseTiltY, 
                y: finalY, 
                transformStyle: "preserve-3d" 
              }}
              className="relative w-full h-full"
            >
              <Image
                src={products[index].img}
                alt={products[index].name}
                fill
                className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
                priority
              />
              
              {/* Dynamic Reflection Light */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full blur-[100px] -z-10"
                style={{ 
                  scale: useTransform(time, (t) => 1 + Math.sin(t/1000) * 0.1) 
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER ACCENT */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="text-white/10 text-[10px] font-mono tracking-widest uppercase">
          <p>Global Shipping Available</p>
          <p>©2024 Premium Juices Co.</p>
        </div>
        <div className="h-[1px] flex-1 mx-12 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="text-orange-500/40 font-black text-4xl opacity-10 select-none">
          REFRESH
        </div>
      </div>
    </section>
  );
}