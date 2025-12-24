import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, PlayCircle, Database } from 'lucide-react';
import { topicData } from '../utils/topicContent';
import NibbleVisualizer from '../components/visualizers/NibbleVisualizer';
import { MerklePatriciaTrie } from '../utils/mpt';
import TrieNodeVisualizer from '../components/visualizers/TrieNodeVisualizer';
import MerkleProofVisualizer from '../components/visualizers/MerkleProofVisualizer';
import StateUpdateVisualizer from '../components/visualizers/StateUpdateVisualizer';

const demoTrie = new MerklePatriciaTrie();
demoTrie.insert('cat', 'meow');
demoTrie.insert('car', 'vroom');
demoTrie.insert('dog', 'woof');

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topicId ? topicData[topicId] : null;

  if (!topic) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">Topic not found</h2>
        <Link to="/learn" className="text-primary mt-4 inline-block">Return to Learn</Link>
      </div>
    );
  }

  const renderVisualizer = () => {
    switch (topic.visualType) {
      case 'encoding':
        return <NibbleVisualizer />;
      case 'nodes':
        return (
          <div className="w-full flex justify-center transform-gpu">
            <TrieNodeVisualizer 
              nodeHash={demoTrie.rootHash!} 
              getTrieNode={(h) => demoTrie.getNode(h)} 
            />
          </div>
        );
      case 'state':
        return <StateUpdateVisualizer />;
      case 'proof':
        return <MerkleProofVisualizer />;
      default:
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Database size={40} />
            </div>
            <h4 className="text-lg font-bold mb-2">Interactive Visualizer</h4>
            <p className="text-neutral-500 text-sm max-w-xs mx-auto">
              This visualizer is coming soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/learn" className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Learning Path
      </Link>

      <div className="flex flex-col gap-12">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
              {topic.definition}
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Lightbulb size={20} />
              </div>
              <div>
                <span className="font-bold text-primary block mb-1">Analogy</span>
                <p className="text-neutral-600 dark:text-neutral-400 italic">"{topic.analogy}"</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-neutral-100 dark:bg-neutral-800/50 rounded-3xl border border-neutral-200 dark:border-neutral-700/50"
          >
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database size={16} /> Senior Engineer's Deep Dive
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              {topic.deepDive}
            </p>
          </motion.div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <PlayCircle className="text-primary" size={20} /> Key Concepts
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {topic.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-400 shrink-0 border border-neutral-100 dark:border-neutral-700">
                    {i + 1}
                  </div>
                  <div>
                    <span className="font-bold block mb-1">{step.title}</span>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full min-h-[600px] lg:min-h-[700px]">
          <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 rounded-[32px] border border-neutral-200 dark:border-neutral-800 flex flex-col items-center relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            
            <div className="w-full h-full overflow-auto p-12 custom-scrollbar">
               <div className="min-w-max min-h-full flex items-center justify-center">
                  <div className="transform-gpu transition-transform duration-500 origin-center">
                    {renderVisualizer()}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;