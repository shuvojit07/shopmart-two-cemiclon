"use client";

import { motion } from "framer-motion";
import { 
  Zap, Sun, Moon, Type, 
  Layers, Search, Check, 
  Mail, Code, Calendar 
} from "lucide-react";
import Image from "next/image";

export default function RiddleFeaturesGrid() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="bg-[#020617] text-slate-50 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HERO HEADER --- */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Lighting-fast design
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            Power Up Your Process
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience lightning-fast design with our powerful features that streamline your workflow and help bring your vision to life.
          </p>
        </motion.div>

        {/* --- BENTO GRID START --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. 12k+ Components Card (Wide) */}
          <motion.section 
            {...fadeIn}
            className="lg:col-span-2 bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-white/5 rounded-[32px] p-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <Layers className="text-blue-500" size={20}/> 12k+ components
              </h3>
              <p className="text-slate-400 max-w-md text-sm">
                Fuel your creativity with an expansive array of adaptable and dynamic design components.
              </p>
            </div>

            {/* UI Showcase Elements */}
            <div className="space-y-6 opacity-80 scale-95 origin-left">
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-sky-500 text-white rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Primary</button>
                <button className="px-4 py-2 bg-slate-800 border border-white/5 text-slate-300 rounded-md text-[10px] font-bold uppercase">Secondary</button>
                <button className="px-4 py-2 bg-white text-black rounded-md text-[10px] font-bold uppercase">Inverse</button>
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-700" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">+9</div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-5 bg-blue-600 rounded-full relative p-0.5">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                   </div>
                   <div className="w-5 h-5 rounded border border-white/10" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-lg">
                <div className="space-y-2">
                   <label className="text-[10px] text-slate-500 uppercase font-black">Email</label>
                   <div className="bg-black/40 border border-white/5 rounded-lg p-3 text-xs text-slate-500">Your account email</div>
                </div>
                <div className="flex gap-2 self-end">
                  {[Code, Zap, Check].map((Icon, i) => (
                    <div key={i} className="p-2.5 bg-white/5 border border-white/5 rounded-lg text-blue-500"><Icon size={16}/></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 2. Light & Dark Card */}
          <motion.section 
            {...fadeIn}
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-white/5 rounded-[32px] p-8 flex flex-col"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-3">Light & Dark</h3>
              <p className="text-slate-400 text-sm">Enhance user experience with Dark & Light mode.</p>
            </div>
            
            <div className="bg-black/40 rounded-2xl border border-white/5 p-6 flex-grow space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-black italic">R</div>
                <span className="font-black text-sm uppercase">Riddle UI</span>
              </div>
              <div className="grid grid-cols-2 bg-slate-900 rounded-lg p-1">
                <div className="py-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1"><Sun size={12}/> Light</div>
                <div className="py-2 text-center bg-slate-800 rounded text-[10px] font-bold flex items-center justify-center gap-1"><Moon size={12}/> Darkest</div>
              </div>
              <div className="space-y-3 pt-4">
                <div className="h-2 w-full bg-white/5 rounded" />
                <div className="h-2 w-2/3 bg-white/5 rounded" />
              </div>
            </div>
          </motion.section>

          {/* 3. Figma Variables Card */}
          <motion.section 
            {...fadeIn}
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-white/5 rounded-[32px] p-8"
          >
            <h3 className="text-2xl font-bold mb-3">Figma variables</h3>
            <p className="text-slate-400 text-sm mb-8">Dynamic design control with Figma Variables.</p>
            <div className="h-32 bg-black/40 rounded-2xl border border-white/5 flex items-end p-6">
              <div className="w-full h-3 bg-blue-500/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  className="h-full bg-blue-500" 
                />
              </div>
            </div>
          </motion.section>

          {/* 4. Typography Card (Wide) */}
          <motion.section 
            {...fadeIn}
            className="lg:col-span-2 bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-white/5 rounded-[32px] p-8"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2"><Type className="text-blue-500"/> Typography</h3>
                <p className="text-slate-400 text-sm max-w-sm">
                  Transform your designs with stylish and expressive typography choices for captivating visual experiences.
                </p>
              </div>
              <div className="flex-1 w-full space-y-3 opacity-30">
                <div className="h-6 w-full bg-white/10 rounded-lg" />
                <div className="h-6 w-5/6 bg-white/10 rounded-lg" />
                <div className="h-6 w-4/6 bg-white/10 rounded-lg" />
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </section>
  );
}