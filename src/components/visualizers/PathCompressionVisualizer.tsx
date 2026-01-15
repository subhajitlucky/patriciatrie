import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minimize2, Maximize2, Zap, ArrowRight, Layout, Info } from 'lucide-react';

const PathCompressionVisualizer: React.FC = () => {
  const [isCompressed, setIsCompressed] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 p-4 sm:p-0">
      {/* Optimization Switcher */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            {isCompressed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">Structural Mode</h4>
            <p className="text-sm font-bold text-neutral-900 dark:text-white">
              {isCompressed ? 'Radix Optimization Active' : 'Standard Uncompressed Trie'}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsCompressed(!isCompressed)}
          className={`
            px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
            ${isCompressed 
              ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
              : 'bg-primary text-white shadow-primary/30'}
            shadow-lg active:scale-95 flex items-center gap-2
          `}
        >
          <Zap size={14} />
          {isCompressed ? 'Reset' : 'Compress Path'}
        </button>
      </div>

      {/* Animation Area */}
      <div className="relative min-h-[450px] bg-neutral-50 dark:bg-neutral-950 rounded-[40px] border border-neutral-200 dark:border-neutral-800 p-8 flex items-center justify-center overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02]" />
        
        <AnimatePresence mode="wait">
          {!isCompressed ? (
            <motion.div 
              key="uncompressed"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              {[0, 1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <div className="w-48 p-3 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col items-center gap-1 shadow-sm">
                    <span className="text-[8px] font-black text-neutral-400 uppercase">Single Branch Node</span>
                    <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                       <div className="w-1/4 h-full bg-primary/30" />
                    </div>
                  </div>
                  {i < 3 && <div className="w-0.5 h-6 bg-neutral-200 dark:border-neutral-800" />}
                </React.Fragment>
              ))}
              <div className="mt-4 p-3 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Leaf Data</div>
            </motion.div>
          ) : (
            <motion.div 
              key="compressed"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div 
                layoutId="node"
                className="w-64 p-6 rounded-[32px] border-4 border-emerald-500/30 bg-emerald-500/10 flex flex-col items-center gap-3 shadow-2xl shadow-emerald-500/10"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <Minimize2 size={20} />
                </div>
                <div className="text-center">
                  <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Extension Node</h5>
                  <p className="text-xl font-mono font-black text-neutral-900 dark:text-white tracking-widest">0x1234</p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase">
                  4 Levels Collapsed
                </div>
              </motion.div>
              <div className="w-0.5 h-10 bg-emerald-500/30" />
              <div className="p-4 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/5">Leaf Data</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-sm">
           <div className="flex items-center gap-3 mb-4 text-neutral-400">
              <Layout size={16} />
              <h4 className="text-[10px] font-black uppercase tracking-widest">I/O Analysis</h4>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-500">Disk Reads required:</span>
                <span className={`text-sm font-black ${isCompressed ? 'text-emerald-500' : 'text-neutral-900 dark:text-white'}`}>
                  {isCompressed ? '1 Read' : '4 Reads'}
                </span>
              </div>
              <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: isCompressed ? '25%' : '100%' }}
                   className={`h-full ${isCompressed ? 'bg-emerald-500' : 'bg-primary'}`}
                 />
              </div>
           </div>
        </div>

        <div className="p-6 bg-neutral-900 text-white rounded-[32px] shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
              <Info size={80} />
           </div>
           <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <ArrowRight size={14} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50">Engineering Why</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                Compression prevents "Deep Path Attacks" where an attacker creates keys that force the network to process 64 levels of nodes just to retrieve a single zero balance.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PathCompressionVisualizer;
