import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Zap, ShieldCheck, Activity, Globe, Lock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* Premium Hero Section */}
      <section className="relative pt-8 sm:pt-16 overflow-visible">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-6xl aspect-square opacity-20 dark:opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f6_0%,transparent_70%)] blur-[100px]" />
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[conic-gradient(from_0deg,#3b82f6,#6366f1,#3b82f6)] rounded-full animate-[spin_10s_linear_infinite] blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-8"
          >
            <Activity size={14} className="animate-pulse" />
            Blockchain Infrastructure
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-neutral-900 dark:text-white"
          >
            The Mechanical Heart of <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">State Storage</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-3xl font-medium"
          >
            Patricia Tries are the architectural backbone of modern blockchains. They enable the efficient storage, secure update, and cryptographic verification of millions of global accounts in real-time.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              to="/learn" 
              className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-primary/30 active:scale-95 group"
            >
              Start Masterclass <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/playground" 
              className="px-10 py-5 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all active:scale-95 shadow-lg"
            >
              Open Sandbox
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Pillar Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 max-w-6xl mx-auto">
        {[
          {
            icon: Layers,
            title: "Path Compression",
            description: "Optimization that collapses non-branching node sequences, keeping the trie shallow and disk I/O at a minimum.",
            color: "text-blue-500",
            bg: "bg-blue-500/5"
          },
          {
            icon: Lock,
            title: "Cryptographic Proofs",
            description: "Generate Merkle Proofs to verify any state fragment trustlessly without downloading the full blockchain database.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/5"
          },
          {
            icon: Globe,
            title: "Deterministic Consensus",
            description: "Ensures all network participants arrive at the exact same 32-byte State Root for every block transition.",
            color: "text-amber-500",
            bg: "bg-amber-500/5"
          }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-8 rounded-[32px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary/30 transition-all group shadow-sm hover:shadow-2xl overflow-hidden"
          >
            <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              <feature.icon size={28} className={feature.color} />
            </div>
            <h3 className="text-2xl font-black mb-4 text-neutral-900 dark:text-white">{feature.title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium text-sm sm:text-base">{feature.description}</p>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          </motion.div>
        ))}
      </section>

      {/* Advanced Engineering Section */}
      <section className="px-4 max-w-6xl mx-auto">
        <div className="bg-neutral-900 dark:bg-neutral-950 rounded-[48px] p-8 md:p-20 overflow-hidden relative border border-neutral-800 shadow-2xl group">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05] group-hover:opacity-[0.08] transition-opacity" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest">
                Technical Deep Dive
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Beyond Standard <br/>
                <span className="text-primary">Key-Value Stores</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed font-medium">
                Standard hash maps provide O(1) local access but fail in distributed consensus. Patricia Tries provide the perfect balance: Radix-based performance with Merkle-based security.
              </p>
              
              <div className="grid gap-6">
                {[
                  { icon: ShieldCheck, text: "Merkle-Radix Hybrid Architecture", label: "Security" },
                  { icon: Zap, text: "Copy-on-Write State Transitions", label: "Efficiency" },
                  { icon: Cpu, text: "Hardware-Optimized Nibble Addressing", label: "Performance" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all">
                      <item.icon size={18} />
                    </div>
                    <div>
                       <span className="text-[8px] font-black text-neutral-500 uppercase tracking-widest block mb-0.5">{item.label}</span>
                       <span className="text-white font-bold text-sm sm:text-base">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square">
               {/* High-Tech Visual Mockup */}
               <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
               <div className="relative h-full w-full bg-neutral-900 rounded-[40px] border border-white/10 shadow-3xl overflow-hidden p-8 flex items-center justify-center">
                  <div className="flex flex-col gap-6 w-full">
                     <div className="h-16 w-full rounded-2xl bg-white/5 border border-white/10 flex items-center px-6 gap-4 animate-pulse">
                        <div className="w-8 h-8 rounded-lg bg-primary/20" />
                        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="h-32 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center gap-2">
                           <Activity className="text-primary" size={24} />
                           <span className="text-[8px] font-black text-primary/50 uppercase">Syncing</span>
                        </div>
                        <div className="h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2">
                           <Globe className="text-neutral-500" size={24} />
                           <span className="text-[8px] font-black text-neutral-500 uppercase">Peer Count</span>
                        </div>
                     </div>
                     <div className="h-32 w-full border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center">
                        <div className="text-center">
                           <span className="block text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-2">Trie Fingerprint</span>
                           <span className="font-mono text-xs text-primary/60">0x7f3a...c291</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;