import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Zap, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold leading-tight"
          >
            The Mechanical Heart of <span className="text-primary">State Storage</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl"
          >
            Patricia Tries are the magic behind how blockchains like Ethereum store millions of account states efficiently, securely, and with cryptographic proof.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link 
              to="/playground" 
              className="px-8 py-4 bg-primary text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
            >
              Open Playground <ArrowRight size={20} />
            </Link>
            <Link 
              to="/learn" 
              className="px-8 py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              Start Learning
            </Link>
          </motion.div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full" />
      </section>

      {/* Quick Overview Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Layers,
            title: "Path Compression",
            description: "No more deep, empty trees. Patricia Tries compress long paths into single 'Extension' nodes for maximum efficiency."
          },
          {
            icon: ShieldCheck,
            title: "Merkle Proofs",
            description: "Verify any piece of state with just a handful of sibling hashes. Trustless verification made possible."
          },
          {
            icon: Zap,
            title: "O(log n) Performance",
            description: "State updates and lookups remain lightning fast even as the global state grows to millions of entries."
          }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-colors group"
          >
            <div className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-neutral-100 dark:border-neutral-700">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Visual Teaser */}
      <section className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[40px] p-8 md:p-16 overflow-hidden relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why not just a Hash Map?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 leading-relaxed">
              Standard hash maps are great for local storage, but they don't support Merkle Roots. 
              In a blockchain, we need to be able to hash the entire state into a single 32-byte string. 
              Patricia Tries give us the performance of a map with the cryptographic properties of a tree.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-600 dark:text-green-500 flex items-center justify-center mt-1">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <span className="font-bold">Cryptographic Integrity</span>
                  <p className="text-neutral-500 text-sm">Every change ripple up to a single Root Hash.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-500 flex items-center justify-center mt-1">
                  <Cpu size={14} />
                </div>
                <div>
                  <span className="font-bold">Space Efficient</span>
                  <p className="text-neutral-500 text-sm">Shared prefixes are stored only once.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square bg-white dark:bg-neutral-950 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 flex items-center justify-center">
             <div className="w-full h-full flex flex-col gap-4">
                <div className="h-1/4 w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
                <div className="flex gap-4 h-1/4">
                  <div className="w-1/2 bg-primary/10 rounded-xl border border-primary/20" />
                  <div className="w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
                </div>
                <div className="h-2/4 w-full border border-neutral-200 dark:border-neutral-800 border-dashed rounded-xl flex items-center justify-center">
                  <span className="text-neutral-400 dark:text-neutral-600 text-sm font-mono uppercase tracking-widest">Trie Visualization</span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
