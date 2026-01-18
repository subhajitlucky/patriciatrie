import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, Fingerprint, Activity } from 'lucide-react';
import { MerklePatriciaTrie } from '../../utils/mpt';
import TrieNodeVisualizer from './TrieNodeVisualizer';
import type { TrieNode } from '../../types/trie';

const TrieComparisonVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trie' | 'tree' | 'map'>('trie');
  const [searchKey, setSearchKey] = useState('car');
  const [selectedNode, setSelectedNode] = useState<TrieNode | null>(null);

  const trie = useMemo(() => {
    const t = new MerklePatriciaTrie();
    t.insert('cat', 'meow');
    t.insert('car', 'vroom');
    t.insert('dog', 'woof');
    t.insert('caravan', 'travel');
    return t;
  }, []);

  const highlightedNodes = useMemo(() => {
    const proof = trie.getProof(searchKey);
    const nodes = new Set<string>();
    proof.forEach(node => {
      if (node) nodes.add(node.hash);
    });
    return nodes;
  }, [searchKey, trie]);

  const stats = useMemo(() => {
    const keyLen = searchKey.length;
    const itemsCount = 4;
    
    return {
      trie: {
        complexity: 'O(k)',
        steps: keyLen * 2,
        explanation: 'The search depth is strictly bounded by the key length (nibbles), making it immune to "State Explosion" performance degradation.'
      },
      tree: {
        complexity: 'O(log N)',
        steps: Math.ceil(Math.log2(itemsCount)),
        explanation: 'In a standard balanced tree, every new account added to the blockchain would make every search slightly slower for everyone.'
      },
      map: {
        complexity: 'O(1)',
        steps: 1,
        explanation: 'Instant, but structurally disconnected. A map cannot prove that a specific account was part of a specific block without the entire dataset.'
      }
    };
  }, [searchKey]);

  return (
    <div className="w-full h-full flex flex-col gap-6 lg:gap-8">
      {/* Premium Header */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-white/20 dark:border-neutral-800 rounded-3xl shadow-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
            <input 
              type="text" 
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value.toLowerCase())}
              placeholder="Trace key path (e.g., car, caravan)..."
              className="w-full bg-transparent pl-12 pr-4 py-3 font-mono text-base lg:text-lg focus:ring-0 border-none outline-none dark:text-white placeholder:text-neutral-400"
            />
          </div>

          <div className="flex p-1.5 bg-neutral-100 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-inner">
            {(['trie', 'tree', 'map'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                  ${activeTab === tab 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Simulation Environment */}
      <div className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-white dark:bg-neutral-950 rounded-[32px] lg:rounded-[40px] border border-neutral-200 dark:border-neutral-800 p-4 sm:p-8 lg:p-12 shadow-2xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05]" />
        
        <AnimatePresence mode="wait">
          {activeTab === 'trie' && (
            <motion.div 
              key="trie"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full overflow-auto custom-scrollbar"
            >
              <div className="min-w-max min-h-full flex items-center justify-center p-4 sm:p-8 scale-[0.8] sm:scale-[0.9] lg:scale-100 origin-center transition-transform">
                <TrieNodeVisualizer 
                  nodeHash={trie.rootHash!} 
                  getTrieNode={(h) => trie.getNode(h)} 
                  affectedNodes={highlightedNodes}
                  onNodeClick={setSelectedNode}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'tree' && (
            <motion.div 
              key="tree"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full flex items-center justify-center p-2 sm:p-8 overflow-auto custom-scrollbar"
            >
               <div className="w-full max-w-[500px] aspect-[4/3] min-w-[320px]">
                 <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-sm overflow-visible">
                    <g className="text-neutral-200 dark:text-neutral-800">
                      <line x1="200" y1="50" x2="100" y2="150" stroke="currentColor" strokeWidth="3" />
                      <line x1="200" y1="50" x2="300" y2="150" stroke="currentColor" strokeWidth="3" />
                      <line x1="100" y1="150" x2="50" y2="250" stroke="currentColor" strokeWidth="3" />
                      <line x1="100" y1="150" x2="150" y2="250" stroke="currentColor" strokeWidth="3" />
                    </g>
                    
                    {/* Nodes within SVG coordinate space */}
                    <foreignObject x="150" y="25" width="100" height="50">
                      <TreeNode label="car" active={searchKey === 'car'} />
                    </foreignObject>
                    <foreignObject x="50" y="125" width="100" height="50">
                      <TreeNode label="cat" active={searchKey === 'cat'} />
                    </foreignObject>
                    <foreignObject x="250" y="125" width="100" height="50">
                      <TreeNode label="dog" active={searchKey === 'dog'} />
                    </foreignObject>
                    <foreignObject x="0" y="225" width="100" height="50">
                      <TreeNode label="caravan" active={searchKey === 'caravan'} />
                    </foreignObject>
                 </svg>
               </div>
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center p-4 overflow-auto custom-scrollbar"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl scale-[0.8] sm:scale-100 origin-center min-w-[280px]">
                {['cat', 'car', 'dog', 'caravan'].map((k) => (
                  <motion.div 
                    key={k}
                    whileHover={{ y: -5 }}
                    className={`
                      relative p-3 sm:p-6 rounded-[24px] border-2 transition-all duration-300 flex flex-col items-center gap-2 sm:gap-3
                      ${searchKey === k 
                        ? 'border-primary bg-primary/5 shadow-xl scale-105' 
                        : 'border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900'}
                    `}
                  >
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center text-xs sm:text-sm font-mono shadow-inner border border-neutral-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {Math.abs(k.split('').reduce((a,b) => a + b.charCodeAt(0), 0) % 100)}
                    </div>
                    <span className="font-bold text-xs sm:text-base tracking-tight text-neutral-900 dark:text-neutral-100">{k}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Node Inspector Overlay */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="absolute top-6 right-6 bottom-6 w-80 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 z-50 overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h5 className="text-xs font-black uppercase tracking-widest text-primary">Node Inspector</h5>
                <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">✕</button>
              </div>
              
              <div className="space-y-6">
                <div>
                   <div className="flex items-center gap-2 text-neutral-400 mb-2">
                      <Fingerprint size={14} />
                      <span className="text-[10px] font-bold uppercase">Hash Signature</span>
                   </div>
                   <p className="font-mono text-xs break-all bg-neutral-100 dark:bg-neutral-950 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 leading-relaxed">
                     {selectedNode.hash}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-[8px] font-black text-neutral-400 uppercase block mb-1">Type</span>
                    <p className="text-xs font-bold text-primary">{selectedNode.type}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-[8px] font-black text-neutral-400 uppercase block mb-1">Depth</span>
                    <p className="text-xs font-bold">Node Level 4</p>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                   <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed italic">
                     This node is a cryptographic commitment to its children. Any change below it will cascade a new hash up to the Root.
                   </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Analytical Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Performance Engine */}
        <div className="lg:col-span-5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          <div className="h-full p-8 bg-neutral-900 dark:bg-neutral-900 text-white rounded-[40px] border border-neutral-800 flex flex-col justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                 <Activity size={20} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Engine Metrics</h4>
            </div>

            <div className="flex flex-row justify-between items-end">
              <div>
                <span className="text-[10px] uppercase font-black opacity-50 block mb-2">Complexity Class</span>
                <p className="text-5xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">{stats[activeTab].complexity}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-black opacity-50 block mb-2">IO Traversal</span>
                <p className="text-3xl font-black text-primary">{stats[activeTab].steps} ops</p>
              </div>
            </div>
          </div>
        </div>

        {/* Observation Matrix */}
        <div className="lg:col-span-7 p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[40px] shadow-sm">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center text-primary border border-neutral-200 dark:border-neutral-800">
                 <Info size={20} />
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Advanced Observation Matrix</h4>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Path Tracing', desc: 'Type "caravan" and watch the path pulse. Notice how "car" and "caravan" diverge exactly at the "a" nibble.' },
                { title: 'Verification', desc: 'Every pulse you see represents a SHA-256 (or Keccak) verification point in a real blockchain.' }
              ].map((item, i) => (
                <div key={i} className="group p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 hover:border-primary/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center text-[10px] font-black mb-3 border border-neutral-200 dark:border-neutral-700 group-hover:bg-primary group-hover:text-white transition-colors">
                    0{i+1}
                  </div>
                  <h5 className="font-black text-sm mb-2 text-neutral-900 dark:text-neutral-100">{item.title}</h5>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const TreeNode = ({ label, active }: { label: string, active: boolean }) => (
  <motion.div 
    animate={{ 
      scale: active ? 1.1 : 1,
      boxShadow: active ? '0 10px 20px rgba(59,130,246,0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
    }}
    className={`
      w-full h-full flex items-center justify-center rounded-xl border-2 text-xs font-black transition-all duration-500
      ${active 
        ? 'bg-primary text-white border-primary' 
        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'}
    `}
  >
    {label}
  </motion.div>
);

export default TrieComparisonVisualizer;