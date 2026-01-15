import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MerklePatriciaTrie } from '../../utils/mpt';
import { ShieldCheck, Fingerprint, Lock, Search } from 'lucide-react';

const MerkleProofVisualizer: React.FC = () => {
  const trie = useMemo(() => {
    const t = new MerklePatriciaTrie();
    t.insert('apple', 'red');
    t.insert('banana', 'yellow');
    t.insert('apricot', 'orange');
    return t;
  }, []);

  const [searchKey, setSearchKey] = useState('apple');
  const proof = useMemo(() => trie.getProof(searchKey), [trie, searchKey]);

  return (
    <div className="w-full h-full flex flex-col gap-8 lg:gap-12">
      {/* Premium Verification Input */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 opacity-20 blur-xl"></div>
        <div className="relative p-6 sm:p-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-2xl flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Search size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Proof Verification Engine</h4>
              <p className="text-[10px] text-neutral-500 font-bold uppercase">Generate Merkle Inclusion Proofs</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
              <input 
                type="text" 
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value.toLowerCase())}
                placeholder="Enter key to prove..."
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-4 font-mono text-base lg:text-lg focus:border-primary outline-none transition-all dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Chain */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={20} />
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-500">Verification Path</h3>
          </div>
          <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-tighter">
            {proof.length} Nodes in Proof
          </span>
        </div>
        
        <div className="flex flex-col gap-2">
          {proof.map((node, i) => (
            <React.Fragment key={i}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 sm:gap-6"
              >
                {/* Level Indicator */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-black text-neutral-400 border border-neutral-200 dark:border-neutral-700 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    {i}
                  </div>
                </div>

                {/* Node Card */}
                <div className="flex-1 relative overflow-hidden p-4 sm:p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[24px] shadow-sm flex items-center justify-between group-hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center shrink-0 border border-neutral-100 dark:border-neutral-800">
                       <Fingerprint size={18} className={node ? 'text-primary' : 'text-red-500'} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 truncate font-bold">
                        {node ? node.hash : 'Hash Not Found'}
                      </p>
                      <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-1">
                        {node?.type || 'NULL_NODE'}
                      </p>
                    </div>
                  </div>
                  
                  {node && (
                    <div className="hidden sm:flex flex-col items-end shrink-0 ml-4">
                       <span className="text-[8px] font-black text-emerald-500 uppercase">Status</span>
                       <span className="text-[10px] font-bold text-neutral-900 dark:text-white">Verified</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Connecting Link */}
              {i < proof.length - 1 && (
                <div className="flex justify-center sm:justify-start sm:ml-16">
                   <div className="w-0.5 h-6 bg-neutral-200 dark:bg-neutral-800" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Final Root Commitment */}
        <AnimatePresence>
          {proof.length > 0 && proof[proof.length - 1] && (
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="mt-12 p-8 bg-neutral-900 dark:bg-neutral-950 rounded-[40px] text-white border border-neutral-800 shadow-2xl relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-primary/10 opacity-50"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20 shrink-0">
                    <ShieldCheck size={40} className="text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg font-black tracking-tight mb-2 uppercase tracking-[0.1em]">Verification Successful</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-lg">
                      This cryptographic proof confirms the existence of <span className="text-emerald-400 font-bold">"{searchKey}"</span> relative to the State Root. By hashing these {proof.length} nodes upward, any external observer can verify the data without trusting the source.
                    </p>
                  </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MerkleProofVisualizer;