import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Info, Zap, Hash, Database, GitBranch, Key, Activity, BookOpen } from 'lucide-react';

const topics = [
  {
    id: 'why-trie',
    title: 'Why Blockchain State?',
    description: 'Understand the unique challenges of storing global state in a decentralized network.',
    icon: Database,
    color: 'text-blue-500',
    tag: 'Fundamentals'
  },
  {
    id: 'trie-vs-map',
    title: 'Trie vs Tree vs Map',
    description: 'Compare different data structures and see why the Patricia Trie wins for blockchain.',
    icon: Info,
    color: 'text-indigo-500',
    tag: 'Fundamentals'
  },
  {
    id: 'nibble-paths',
    title: 'Key Encoding (Nibbles)',
    description: 'Learn how keys are broken down into nibbles and encoded for the trie.',
    icon: Key,
    color: 'text-amber-500',
    tag: 'Structure'
  },
  {
    id: 'node-types',
    title: 'Node Archetypes',
    description: 'Master the three building blocks: Branch, Extension, and Leaf nodes.',
    icon: GitBranch,
    color: 'text-emerald-500',
    tag: 'Structure'
  },
  {
    id: 'path-compression',
    title: 'Path Compression',
    description: 'How the Trie stays shallow and fast by merging redundant nodes.',
    icon: Zap,
    color: 'text-purple-500',
    tag: 'Optimization'
  },
  {
    id: 'merkle-proofs',
    title: 'Merkle Proofs',
    description: 'The magic of verifying data without downloading the whole state.',
    icon: Hash,
    color: 'text-rose-500',
    tag: 'Verification'
  },
  {
    id: 'state-updates',
    title: 'State Updates & Deltas',
    description: 'How the trie handles changes between blocks efficiently.',
    icon: Activity,
    color: 'text-cyan-500',
    tag: 'Lifecycle'
  },
  {
    id: 'state-root',
    title: 'The State Root',
    description: 'Master the final 32-byte cryptographic fingerprint of the network.',
    icon: Database,
    color: 'text-blue-600',
    tag: 'Finality'
  }
];

const Learn: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <header className="mb-16 relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-primary/20 rounded-full hidden lg:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <BookOpen size={12} />
            Educational Path
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Mastering <span className="text-primary">Patricia Tries</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl font-medium leading-relaxed">
            A comprehensive, step-by-step journey through the cryptographic heart of the blockchain state machine.
          </p>
        </motion.div>
      </header>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[27px] sm:left-12 top-0 bottom-0 w-0.5 bg-neutral-100 dark:bg-neutral-800 hidden sm:block" />

        <div className="grid gap-8 relative">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Path Node Indicator */}
              <div className="absolute left-[27px] sm:left-12 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-neutral-950 border-4 border-neutral-200 dark:border-neutral-800 z-10 hidden sm:block group-hover:border-primary transition-colors" />

              <Link
                to={`/learn/${topic.id}`}
                className="group flex flex-col sm:flex-row items-start sm:items-center p-6 sm:p-8 sm:ml-24 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-[32px] hover:border-primary hover:bg-white dark:hover:bg-neutral-900 transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.99]"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner`}>
                    <topic.icon size={28} className={`${topic.color} group-hover:text-white transition-colors`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">Lesson 0{i + 1}</span>
                      <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{topic.tag}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-medium line-clamp-2">
                      {topic.description}
                    </p>
                  </div>

                  <div className="hidden sm:flex w-12 h-12 rounded-full border border-neutral-100 dark:border-neutral-800 items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 shrink-0">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="mt-20 p-8 rounded-[40px] bg-neutral-900 dark:bg-neutral-950 text-white overflow-hidden relative border border-neutral-800 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Database size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
              <h4 className="text-xl font-black mb-2">Ready to experiment?</h4>
              <p className="text-neutral-400 text-sm max-w-sm">Jump into the Playground to build your own trie from scratch and see these concepts in action.</p>
           </div>
           <Link 
             to="/playground"
             className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-primary/20 active:scale-95"
           >
             Go to Playground
           </Link>
        </div>
      </footer>
    </div>
  );
};

export default Learn;
