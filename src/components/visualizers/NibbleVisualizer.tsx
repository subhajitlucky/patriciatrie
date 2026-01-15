import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { stringToNibbles } from '../../utils/mpt';
import { Binary, Cpu, ArrowRight, Info, Fingerprint } from 'lucide-react';

const NibbleVisualizer: React.FC = () => {
  const [text, setText] = useState('ABC');
  const nibbles = useMemo(() => stringToNibbles(text), [text]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 lg:gap-12">
      {/* Premium Input Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 opacity-20 blur-xl group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative p-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-2xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Cpu size={18} />
              </div>
              <label className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Data Input Buffer</label>
            </div>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={6}
              placeholder="Type to encode..."
              className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-6 py-4 text-3xl font-mono focus:border-primary outline-none transition-all dark:text-white shadow-inner"
            />
            <div className="flex items-center gap-2 text-xs text-neutral-500 italic px-2">
              <Info size={12} />
              <span>Each ASCII character is decomposed into two 4-bit "Nibbles" (High & Low).</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decomposition Engine */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-4">
          <Binary className="text-emerald-500" size={20} />
          <h3 className="text-sm font-black uppercase tracking-widest text-neutral-500">Binary Decomposition Engine</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {text.split('').map((char, i) => {
            const code = char.charCodeAt(0);
            const binary = code.toString(2).padStart(8, '0');
            const n1 = nibbles[i * 2];
            const n2 = nibbles[i * 2 + 1];

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden p-4 sm:p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[24px] shadow-sm flex flex-col lg:flex-row items-center gap-6 lg:gap-12"
              >
                {/* Source Character */}
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-[10px] font-black text-neutral-400 uppercase mb-2">Source</span>
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-3xl font-black border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    {char}
                  </div>
                  <span className="mt-2 font-mono text-[10px] font-bold text-neutral-500">0x{code.toString(16).toUpperCase()}</span>
                </div>

                {/* Bit Stream */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center px-2">
                       <span className="text-[10px] font-black text-neutral-400 uppercase">8-Bit Stream</span>
                       <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{binary}</span>
                    </div>
                    <div className="h-3 bg-neutral-100 dark:bg-neutral-950 rounded-full flex overflow-hidden border border-neutral-200 dark:border-neutral-800">
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
                    <div className="flex justify-between text-[10px] font-bold text-neutral-400 px-1">
                       <span>HIGH NIBBLE</span>
                       <span>LOW NIBBLE</span>
                    </div>
                  </div>
                </div>

                {/* Resulting Nibbles */}
                <div className="flex gap-4 shrink-0">
                  <div className="relative">
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[8px] text-white font-black z-10 shadow-lg">H</div>
                    <NibbleBox value={n1} color="bg-primary" />
                  </div>
                  <div className="relative">
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white font-black z-10 shadow-lg">L</div>
                    <NibbleBox value={n2} color="bg-emerald-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Advanced Matrix - Hex-Prefix Encoding */}
      <div className="p-8 bg-neutral-900 dark:bg-neutral-950 rounded-[40px] text-white border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Fingerprint size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
              <ArrowRight size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Next Step: Hex-Prefix Encoding</h4>
              <p className="text-[10px] text-neutral-500 font-bold uppercase">The Backbone of Patricia Trie Path Compression</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">
                In Ethereum, raw nibbles aren't enough. We must distinguish between <span className="text-white font-bold">Leaf</span> nodes and <span className="text-white font-bold">Extension</span> nodes within the path data.
              </p>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-500">Total Nibbles</span>
                <span className="text-xl font-black text-primary">{nibbles.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { label: 'Even Path', prefix: '0x0 or 0x2', desc: 'Used when the path length is even.' },
                 { label: 'Odd Path', prefix: '0x1 or 0x3', desc: 'Used when the path length is odd.' }
               ].map((item, i) => (
                 <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-mono text-xs font-black text-primary">
                      {item.prefix}
                    </div>
                    <div>
                      <h5 className="text-xs font-black uppercase mb-1">{item.label}</h5>
                      <p className="text-[10px] text-neutral-500">{item.desc}</p>
                    </div>
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
    <div className={`w-16 h-16 ${color} text-white rounded-2xl flex flex-col items-center justify-center shadow-xl shadow-black/20 border border-white/10`}>
      <span className="text-2xl font-mono font-black tracking-tighter">{value.toString(16).toUpperCase()}</span>
      <span className="text-[9px] font-mono font-bold opacity-60">{value.toString(2).padStart(4, '0')}</span>
    </div>
  </div>
);

export default NibbleVisualizer;
