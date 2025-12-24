import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { NodeType } from '../../types/trie';
import type { TrieNode } from '../../types/trie';
import { nibblesToHex } from '../../utils/mpt';
import { Share2, Database, Layers } from 'lucide-react';

interface TrieNodeVisualizerProps {
  nodeHash: string;
  getTrieNode: (hash: string) => TrieNode | null;
  affectedNodes?: Set<string>;
  onNodeClick?: (node: TrieNode) => void;
  depth?: number;
}

const TrieNodeVisualizer: React.FC<TrieNodeVisualizerProps> = ({ 
  nodeHash, 
  getTrieNode, 
  affectedNodes,
  onNodeClick,
  depth = 0 
}) => {
  const node = getTrieNode(nodeHash);
  const isAffected = affectedNodes?.has(nodeHash);

  if (!node) return <div className="text-red-500 text-xs">Missing: {nodeHash.substring(0,6)}</div>;

  const containerVariants: Variants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
    }
  };

  const renderNodeContent = () => {
    const commonClasses = `
      transition-all duration-500 min-w-[200px] border-2 cursor-pointer group/node
      ${isAffected ? 'border-primary ring-4 ring-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-neutral-200 dark:border-neutral-800 hover:border-primary/50'}
    `;

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onNodeClick?.(node);
    };

    switch (node.type) {
      case NodeType.LEAF:
        return (
          <div onClick={handleClick} className={`${commonClasses} bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl p-4 shadow-sm`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                <Database size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Leaf</span>
              </div>
              <span className="text-[8px] font-mono text-neutral-400 group-hover/node:text-primary transition-colors">{node.hash}</span>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase font-bold">Path</span>
                <p className="font-mono text-sm bg-white dark:bg-neutral-950 p-1 rounded border border-neutral-100 dark:border-neutral-800 text-emerald-700 dark:text-emerald-300">
                  {nibblesToHex(node.path)}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase font-bold">Value</span>
                <p className="font-bold text-xs truncate dark:text-white">{node.value}</p>
              </div>
            </div>
          </div>
        );

      case NodeType.EXTENSION:
        return (
          <div className="flex flex-col items-center">
            <div onClick={handleClick} className={`${commonClasses} bg-amber-50 dark:bg-amber-500/10 rounded-2xl p-4 shadow-sm`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                  <Layers size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Ext</span>
                </div>
                <span className="text-[8px] font-mono text-neutral-400 group-hover/node:text-primary transition-colors">{node.hash.substring(0,8)}</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase font-bold">Shared</span>
                  <p className="font-mono text-sm bg-white dark:bg-neutral-950 p-1 rounded border border-neutral-100 dark:border-neutral-800 text-amber-700 dark:text-amber-200">
                    {nibblesToHex(node.path)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800 my-2" />
            <TrieNodeVisualizer 
              nodeHash={node.nextNodeHash} 
              getTrieNode={getTrieNode} 
              affectedNodes={affectedNodes}
              onNodeClick={onNodeClick}
              depth={depth + 1} 
            />
          </div>
        );

      case NodeType.BRANCH:
        return (
          <div className="flex flex-col items-center">
            <div onClick={handleClick} className={`${commonClasses} bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-4 shadow-sm`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
                  <Share2 size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Branch</span>
                </div>
                <span className="text-[8px] font-mono text-neutral-400 group-hover/node:text-primary transition-colors">{node.hash.substring(0,8)}</span>
              </div>
              <div className="grid grid-cols-8 gap-1 mb-4">
                {Array.from({ length: 16 }).map((_, i) => {
                  const hasChild = node.branches[i] !== null;
                  return (
                    <div 
                      key={i} 
                      className={`
                        w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono border
                        ${hasChild ? 'bg-primary text-white font-bold border-primary' : 'bg-white dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 border-neutral-100 dark:border-neutral-700'}
                      `}
                    >
                      {i.toString(16).toUpperCase()}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex gap-8 mt-8">
              {node.branches.map((branchHash, i) => (
                branchHash && (
                  <div key={i} className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4">
                       <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800" />
                       <div className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px] font-mono text-primary font-bold -mt-1 border border-neutral-200 dark:border-neutral-700">
                          {i.toString(16).toUpperCase()}
                       </div>
                    </div>
                    <TrieNodeVisualizer 
                      nodeHash={branchHash} 
                      getTrieNode={getTrieNode} 
                      affectedNodes={affectedNodes}
                      onNodeClick={onNodeClick}
                      depth={depth + 1} 
                    />
                  </div>
                )
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center"
    >
      {renderNodeContent()}
    </motion.div>
  );
};

export default TrieNodeVisualizer;