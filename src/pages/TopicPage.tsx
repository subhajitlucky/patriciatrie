import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lightbulb, PlayCircle, Database } from 'lucide-react';
import { topicData } from '../utils/topicContent';
import NibbleVisualizer from '../components/visualizers/NibbleVisualizer';
import { MerklePatriciaTrie } from '../utils/mpt';
import MerkleProofVisualizer from '../components/visualizers/MerkleProofVisualizer';
import StateUpdateVisualizer from '../components/visualizers/StateUpdateVisualizer';
import TrieComparisonVisualizer from '../components/visualizers/TrieComparisonVisualizer';
import NodeArchetypeVisualizer from '../components/visualizers/NodeArchetypeVisualizer';
import PathCompressionVisualizer from '../components/visualizers/PathCompressionVisualizer';
import StateRootVisualizer from '../components/visualizers/StateRootVisualizer';

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
        return <TrieComparisonVisualizer />;
      case 'archetypes':
        return <NodeArchetypeVisualizer />;
      case 'compression':
        return <PathCompressionVisualizer />;
      case 'root-anchor':
        return <StateRootVisualizer />;
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

        <div className="w-full min-h-[500px] lg:min-h-[700px]">
          <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 rounded-[24px] md:rounded-[32px] border border-neutral-200 dark:border-neutral-800 flex flex-col items-center relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            
            <div className="w-full h-full overflow-auto p-4 md:p-12 custom-scrollbar">
               <div className="w-full min-h-full flex items-center justify-center">
                  <div className="w-full max-w-full transform-gpu transition-transform duration-500 origin-center">
                    {renderVisualizer()}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          {(() => {
            const topicIds = Object.keys(topicData);
            const currentIndex = topicIds.indexOf(topic.id);
            const prevTopicId = currentIndex > 0 ? topicIds[currentIndex - 1] : null;
            const nextTopicId = currentIndex < topicIds.length - 1 ? topicIds[currentIndex + 1] : null;
            const prevTopic = prevTopicId ? topicData[prevTopicId] : null;
            const nextTopic = nextTopicId ? topicData[nextTopicId] : null;

            return (
              <>
                <div className="flex-1">
                  {prevTopic && (
                    <Link
                      to={`/learn/${prevTopic.id}`}
                      className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-2xl sm:rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all h-full"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div className="text-left min-w-0">
                        <span className="block text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Previous</span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base truncate block">{prevTopic.title}</span>
                      </div>
                    </Link>
                  )}
                </div>

                <div className="flex-1">
                  {nextTopic && (
                    <Link
                      to={`/learn/${nextTopic.id}`}
                      className="group flex items-center justify-end gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-2xl sm:rounded-full bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all h-full"
                    >
                      <div className="text-right min-w-0">
                        <span className="block text-[10px] text-white/80 font-medium uppercase tracking-wider">Next Topic</span>
                        <span className="font-bold text-sm sm:text-base truncate block">{nextTopic.title}</span>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                      </div>
                    </Link>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default TopicPage;