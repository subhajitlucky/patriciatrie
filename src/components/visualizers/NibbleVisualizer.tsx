import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { stringToNibbles } from '../../utils/mpt';
import { Binary, Cpu, ArrowRight, Info, Fingerprint } from 'lucide-react';

const NibbleVisualizer: React.FC = () => {
  const [text, setText] = useState('ABC');
  const nibbles = useMemo(() => stringToNibbles(text), [text]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-10">
      {/* Premium Input Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative p-5 sm:p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-[28px] sm:rounded-[32px] shadow-2xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Cpu size={18} />
              </div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Data Input Buffer</label>
            </div>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={6}
              placeholder="Type..."
              className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-5 py-3 sm:py-4 text-2xl sm:text-3xl font-mono focus:border-primary outline-none transition-all dark:text-white shadow-inner"
            />
            <div className="flex items-start gap-2 text-[10px] text-neutral-500 italic px-1">
              <Info size={12} className="shrink-0 mt-0.5" />
              <span>ASCII characters decompose into two 4-bit "Nibbles" (High & Low).</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decomposition Engine */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <Binary className="text-emerald-500" size={18} />
          <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500">Decomposition Engine</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {text.split('').map((char, i) => {
            const code = char.charCodeAt(0);
            const binary = code.toString(2).padStart(8, '0');
            const n1 = nibbles[i * 2];
            const n2 = nibbles[i * 2 + 1];

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[24px] shadow-sm flex flex-col md:flex-row items-center gap-4 md:gap-8"
              >
                {/* Source Character */}
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-0 shrink-0">
                  <span className="hidden md:block text-[8px] font-black text-neutral-400 uppercase mb-2">Source</span>
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center text-xl font-black border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    {char}
                  </div>
                  <span className="font-mono text-[9px] font-bold text-neutral-500">0x{code.toString(16).toUpperCase()}</span>
                </div>

                {/* Bit Stream */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center px-1">
                       <span className="text-[8px] font-black text-neutral-400 uppercase">8-Bit Stream</span>
                       <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{binary}</span>
                    </div>
                    <div className="h-2.5 bg-neutral-100 dark:bg-neutral-950 rounded-full flex overflow-hidden border border-neutral-200 dark:border-neutral-800">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '50%' }}
                         className="h-full bg-primary/40 border-r border-white/20"
                       />
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '50%' }}
                         className="h-full bg-emerald-500/40"
                       />
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-neutral-400 px-1">
                       <span>HIGH</span>
                       <span>LOW</span>
                    </div>
                  </div>
                </div>

                {/* Resulting Nibbles */}
                <div className="flex gap-3 shrink-0">
                  <div className="relative">
                    <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center text-[7px] text-white font-black z-10 shadow-lg">H</div>
                    <NibbleBox value={n1} color="bg-primary" />
                  </div>
                  <div className="relative">
                    <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[7px] text-white font-black z-10 shadow-lg">L</div>
                    <NibbleBox value={n2} color="bg-emerald-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Advanced Matrix - Hex-Prefix Encoding */}
      <div className="p-6 sm:p-8 bg-neutral-900 dark:bg-neutral-950 rounded-[32px] sm:rounded-[40px] text-white border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Fingerprint size={100} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-primary">
              <ArrowRight size={16} />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Hex-Prefix Encoding</h4>
              <p className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">The Backbone of Path Compression</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-xs text-neutral-400 leading-relaxed">
              In Ethereum, we must distinguish between <span className="text-white font-bold">Leaf</span> nodes and <span className="text-white font-bold">Extension</span> nodes within the path data using a 4-bit prefix.
            </p>
            <div className="grid grid-cols-1 gap-2">
               {[
                 { label: 'Even Path', prefix: '0x0 or 0x2' },
                 { label: 'Odd Path', prefix: '0x1 or 0x3' }
               ].map((item, i) => (
                 <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-mono text-[10px] font-black text-primary shrink-0">
                      {item.prefix}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NibbleBox = ({ value, color }: { value: number, color: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${color} text-white rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-xl shadow-black/20 border border-white/10`}>
      <span className="text-xl sm:text-2xl font-mono font-black tracking-tighter">{value.toString(16).toUpperCase()}</span>
      <span className="text-[8px] font-mono font-bold opacity-60">{value.toString(2).padStart(4, '0')}</span>
    </div>
  </div>
);

export default NibbleVisualizer;