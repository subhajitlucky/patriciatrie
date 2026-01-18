import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minimize2, Maximize2, Zap, ArrowRight, Layout, Info } from 'lucide-react';

const PathCompressionVisualizer: React.FC = () => {
  const [isCompressed, setIsCompressed] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8">
      {/* Optimization Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {isCompressed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </div>
          <div className="min-w-0">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Structural Mode</h4>
            <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">
              {isCompressed ? 'Radix Optimization' : 'Uncompressed Trie'}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsCompressed(!isCompressed)}
          className={`
            px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
            ${isCompressed 
              ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
              : 'bg-primary text-white shadow-primary/30'}
            shadow-lg active:scale-95 flex items-center justify-center gap-2
          `}
        >
          <Zap size={14} />
          {isCompressed ? 'Reset' : 'Compress Path'}
        </button>
      </div>

      {/* Animation Area */}
      <div className="relative min-h-[400px] sm:min-h-[450px] bg-neutral-50 dark:bg-neutral-950 rounded-[40px] border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02]" />
        
        <AnimatePresence mode="wait">
          {!isCompressed ? (
            <motion.div 
              key="uncompressed"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              {[0, 1, 2].map((i) => (
                <React.Fragment key={i}>
                  <div className="w-40 sm:w-48 p-3 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col items-center gap-1 shadow-sm">
                    <span className="text-[7px] sm:text-[8px] font-black text-neutral-400 uppercase">Single Branch</span>
                    <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                       <div className="w-1/4 h-full bg-primary/30" />
                    </div>
                  </div>
                  <div className="w-0.5 h-4 bg-neutral-200 dark:border-neutral-800" />
                </React.Fragment>
              ))}
              <div className="p-3 bg-neutral-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest">Leaf Data</div>
            </motion.div>
          ) : (
            <motion.div 
              key="compressed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div 
                layoutId="node"
                className="w-56 sm:w-64 p-5 sm:p-6 rounded-[32px] border-4 border-emerald-500/30 bg-emerald-500/10 flex flex-col items-center gap-3 shadow-2xl shadow-emerald-500/10"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-center">
                  <h5 className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Extension Node</h5>
                  <p className="text-lg sm:text-xl font-mono font-black text-neutral-900 dark:text-white tracking-widest">0x1234</p>
                </div>
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-500/20 text-emerald-600 text-[9px] font-black uppercase">
                  Collapsed Path
                </div>
              </motion.div>
              <div className="w-0.5 h-8 bg-emerald-500/30" />
              <div className="p-3 bg-neutral-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">Leaf Data</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-sm">
           <div className="flex items-center gap-3 mb-4 text-neutral-400">
              <Layout size={16} />
              <h4 className="text-[10px] font-black uppercase tracking-widest">I/O Analysis</h4>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-500">Reads:</span>
                <span className={`text-sm font-black ${isCompressed ? 'text-emerald-500' : 'text-neutral-900 dark:text-white'}`}>
                  {isCompressed ? '1 IO' : '4 IO'}
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
              <Info size={60} />
           </div>
           <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <ArrowRight size={12} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50">Why?</h4>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-medium">
                Compression prevents "Deep Path Attacks" by collapsing redundant nodes into a single atomic lookup.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PathCompressionVisualizer;