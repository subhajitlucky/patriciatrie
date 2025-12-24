import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { stringToNibbles } from '../../utils/mpt';

const NibbleVisualizer: React.FC = () => {
  const [text, setText] = useState('ABC');
  const nibbles = stringToNibbles(text);

  return (
    <div className="w-full space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Input String</label>
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={8}
          className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-6 py-4 text-3xl font-mono focus:border-primary outline-none transition-all dark:text-white shadow-sm focus:ring-4 focus:ring-primary/10"
        />
        <p className="text-xs text-neutral-500 italic">Each character generates 2 nibbles (8 bits total).</p>
      </div>

      <div className="space-y-4">
        {text.split('').map((char, i) => {
          const n1 = nibbles[i * 2];
          const n2 = nibbles[i * 2 + 1];
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[80px_1fr_auto] items-center gap-6 p-4 bg-white dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-sm"
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 mb-1">ASCII</span>
                <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center text-2xl font-bold border border-neutral-200 dark:border-neutral-700">
                  {char}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                 <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="absolute inset-y-0 left-0 bg-primary/20"
                    />
                 </div>
                 <div className="flex justify-between font-mono text-[10px] text-neutral-400">
                    <span>0x{char.charCodeAt(0).toString(16).toUpperCase()}</span>
                    <span>{char.charCodeAt(0).toString(2).padStart(8, '0')}</span>
                 </div>
              </div>

              <div className="flex gap-3">
                <NibbleBox value={n1} label="High" />
                <NibbleBox value={n2} label="Low" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const NibbleBox = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-14 h-14 bg-primary text-white rounded-xl flex flex-col items-center justify-center shadow-lg shadow-primary/20">
      <span className="text-xl font-mono font-bold">{value.toString(16).toUpperCase()}</span>
      <span className="text-[8px] font-mono opacity-80">{value.toString(2).padStart(4, '0')}</span>
    </div>
    <span className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-600">{label}</span>
  </div>
);

export default NibbleVisualizer;