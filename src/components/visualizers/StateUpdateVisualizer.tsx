import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MerklePatriciaTrie } from '../../utils/mpt';
import TrieNodeVisualizer from './TrieNodeVisualizer';
import { RefreshCcw, Zap, Hash } from 'lucide-react';

const StateUpdateVisualizer: React.FC = () => {
  const [trie, setTrie] = useState(() => {
    const t = new MerklePatriciaTrie();
    t.insert('car', 'vroom');
    return t;
  });

  const [step, setStep] = useState(0);

  const updateTrie = () => {
    trie.insert('car', step % 2 === 0 ? 'fast' : 'slow');
    setTrie(trie.clone());
    setStep(s => s + 1);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Hash size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Live State Root</span>
            <p className="font-mono text-sm font-bold text-primary truncate max-w-[150px]">{trie.rootHash}</p>
          </div>
        </div>
        <button 
          onClick={updateTrie}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors"
        >
          <Zap size={14} /> Update 'car'
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl relative custom-scrollbar">
        <div className="min-w-max flex justify-center">
          <TrieNodeVisualizer 
            nodeHash={trie.rootHash!} 
            getTrieNode={(h) => trie.getNode(h)} 
            affectedNodes={trie.affectedNodes}
          />
        </div>

        <AnimatePresence>
          {trie.affectedNodes.size > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
            >
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
                <RefreshCcw size={12} className="animate-spin" /> Hash Ripple Detected
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
        <p className="text-[10px] text-neutral-500 leading-relaxed italic">
          Notice how only the nodes on the path to 'car' are highlighted. These are the "Affected Nodes" that get re-hashed to produce the new State Root.
        </p>
      </div>
    </div>
  );
};

export default StateUpdateVisualizer;
