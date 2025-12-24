import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MerklePatriciaTrie } from '../../utils/mpt';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const MerkleProofVisualizer: React.FC = () => {
  const [trie] = useState(() => {
    const t = new MerklePatriciaTrie();
    t.insert('apple', 'red');
    t.insert('banana', 'yellow');
    t.insert('apricot', 'orange');
    return t;
  });

  const [searchKey, setSearchKey] = useState('apple');
  const proof = trie.getProof(searchKey);

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-4">
        <label className="text-sm font-bold text-neutral-500 uppercase">Key to Prove</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="flex-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 font-mono focus:border-primary outline-none transition-colors dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck size={14} className="text-primary" /> Proof Path
        </h4>
        
        <div className="space-y-2">
          {proof.map((node, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                {i}
              </div>
              <div className="flex-1 p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${node ? 'bg-primary' : 'bg-red-500'}`} />
                  <span className="text-sm font-mono text-neutral-600 dark:text-neutral-300">
                    {node ? node.hash.substring(0, 12) + '...' : 'Null'}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-600 uppercase">
                  {node?.type || 'Not Found'}
                </span>
              </div>
              {i < proof.length - 1 && <ArrowRight size={14} className="text-neutral-300 dark:text-neutral-700" />}
            </motion.div>
          ))}
        </div>

        {proof.length > 0 && proof[proof.length - 1] && (
           <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
              <p className="text-green-600 dark:text-green-500 text-sm font-medium flex items-center gap-2">
                <ShieldCheck size={16} /> Verification Successful
              </p>
              <p className="text-neutral-500 dark:text-neutral-600 text-xs mt-1">
                Combining these {proof.length} nodes reproduces the Root Hash.
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default MerkleProofVisualizer;
