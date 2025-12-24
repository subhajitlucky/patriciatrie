import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Info, Zap, Hash, Database, GitBranch, Key } from 'lucide-react';

const topics = [
  {
    id: 'why-trie',
    title: 'Why Blockchain State?',
    description: 'Understand the unique challenges of storing global state in a decentralized network.',
    icon: Database,
    color: 'bg-blue-500'
  },
  {
    id: 'trie-vs-map',
    title: 'Trie vs Tree vs Map',
    description: 'Compare different data structures and see why the Patricia Trie wins for blockchain.',
    icon: Info,
    color: 'bg-indigo-500'
  },
  {
    id: 'nibble-paths',
    title: 'Key Encoding (Nibbles)',
    description: 'Learn how keys are broken down into nibbles and encoded for the trie.',
    icon: Key,
    color: 'bg-amber-500'
  },
  {
    id: 'node-types',
    title: 'Branch, Extension, Leaf',
    description: 'The three building blocks of the Merkle Patricia Trie.',
    icon: GitBranch,
    color: 'bg-emerald-500'
  },
  {
    id: 'path-compression',
    title: 'Path Compression',
    description: 'How the Trie stays shallow and fast by merging redundant nodes.',
    icon: Zap,
    color: 'bg-purple-500'
  },
  {
    id: 'merkle-proofs',
    title: 'Merkle Proofs',
    description: 'The magic of verifying data without downloading the whole state.',
    icon: Hash,
    color: 'bg-rose-500'
  },
  {
    id: 'state-updates',
    title: 'State Updates & Deltas',
    description: 'How the trie handles changes between blocks efficiently.',
    icon: Zap,
    color: 'bg-cyan-500'
  },
  {
    id: 'state-root',
    title: 'The State Root',
    description: 'Master the final 32-byte cryptographic fingerprint of the network.',
    icon: Database,
    color: 'bg-blue-600'
  }
];

const Learn: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Learning Path</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Master the concepts of Patricia Tries through step-by-step interactive lessons.
        </p>
      </header>

      <div className="grid gap-4">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/learn/${topic.id}`}
              className="group flex items-center p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-primary/50 transition-all hover:translate-x-1 shadow-sm hover:shadow-md"
            >
              <div className={`w-12 h-12 ${topic.color}/10 ${topic.color.replace('bg-', 'text-')} rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}>
                <topic.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{topic.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">{topic.description}</p>
              </div>
              <ChevronRight className="text-neutral-400 dark:text-neutral-600 group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
