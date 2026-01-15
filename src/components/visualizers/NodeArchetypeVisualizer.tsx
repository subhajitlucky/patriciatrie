import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Layers, Database, Cpu, ChevronRight, Info } from 'lucide-react';

const NodeArchetypeVisualizer: React.FC = () => {
  const [activeType, setActiveType] = useState<'branch' | 'extension' | 'leaf'>('branch');

  const nodeData = {
    branch: {
      title: 'Branch Node',
      icon: Share2,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      desc: 'A 17-element array facilitating multi-way path divergence.',
      memory: '32 bytes per slot × 17 slots = 544 bytes (raw)',
      logic: 'The search nibble (0-F) acts as the direct index into this array.'
    },
    extension: {
      title: 'Extension Node',
      icon: Layers,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      desc: 'A optimization node that stores a shared nibble path and a single pointer.',
      memory: 'Partial Path + 1 Child Hash',
      logic: 'Collapses 10+ empty branches into one single lookup operation.'
    },
    leaf: {
      title: 'Leaf Node',
      icon: Database,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      desc: 'The terminal node containing the final path suffix and the actual state value.',
      memory: 'Path Suffix + RLP Data',
      logic: 'The cryptographic end-of-path where the search key finally resolves.'
    }
  };

  const active = nodeData[activeType];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 lg:gap-12 p-4 sm:p-0">
      {/* Archetype Selector */}
      <div className="flex p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-[24px] border border-neutral-200 dark:border-neutral-800 shadow-inner">
        {(['branch', 'extension', 'leaf'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
              ${activeType === type 
                ? 'bg-white dark:bg-neutral-800 text-primary shadow-lg' 
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}
            `}
          >
            {React.createElement(nodeData[type].icon, { size: 14 })}
            <span className="hidden sm:inline">{nodeData[type].title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Visual Mockup */}
        <div className="lg:col-span-3 min-h-[350px] bg-white dark:bg-neutral-950 rounded-[40px] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative z-10 w-full flex flex-col items-center p-8"
            >
              {activeType === 'branch' && (
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                      {i.toString(16).toUpperCase()}
                    </div>
                  ))}
                  <div className="col-span-4 sm:col-span-8 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-[10px] font-black uppercase tracking-widest">
                    Slot 17: Value Field
                  </div>
                </div>
              )}

              {activeType === 'extension' && (
                <div className="flex flex-col items-center gap-4">
                  <div className="px-8 py-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black text-amber-600 uppercase">Partial Path</span>
                    <p className="text-2xl font-mono font-black text-amber-700 dark:text-amber-400 tracking-widest">0x1A2B</p>
                  </div>
                  <div className="w-1 h-8 bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                    <ChevronRight size={24} />
                  </div>
                </div>
              )}

              {activeType === 'leaf' && (
                <div className="w-full max-w-xs p-6 rounded-[32px] bg-emerald-500/10 border-2 border-emerald-500/30">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Database className="text-emerald-500" size={24} />
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Storage Unit</span>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-3 rounded-2xl border border-emerald-500/20">
                      <span className="text-[8px] font-black text-neutral-400 uppercase block mb-1">Key Suffix</span>
                      <p className="font-mono text-xs font-bold text-emerald-600 truncate">...f3a2c1</p>
                    </div>
                    <div className="bg-neutral-900 text-white p-4 rounded-2xl shadow-xl">
                      <span className="text-[8px] font-black opacity-50 uppercase block mb-1">RLP Value</span>
                      <p className="font-bold text-sm">1,250.00 ETH</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Technical Data */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className={`p-6 rounded-[32px] ${active.bg} border-2 ${active.border} flex flex-col gap-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-white dark:bg-neutral-900 flex items-center justify-center ${active.color}`}>
                <Cpu size={16} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Node Logic</h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
              {active.logic}
            </p>
          </div>

          <div className="p-6 bg-neutral-900 dark:bg-neutral-950 rounded-[32px] text-white flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary">
                <Info size={16} />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50">Payload</h4>
            </div>
            <div>
              <span className="text-[8px] font-black opacity-30 uppercase block mb-1">Memory Profile</span>
              <p className="text-xs font-bold text-primary">{active.memory}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeArchetypeVisualizer;
