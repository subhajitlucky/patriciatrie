import React, { Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lightbulb, PlayCircle, Database, Loader2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { topicData } from '../utils/topicContent';
import type { VisualizerType } from '../types/topic';
import SimulationErrorBoundary from '../components/visualizers/SimulationErrorBoundary';
import { useProgress } from '../hooks/useProgress';

// Dynamic Imports for Simulations (Code Splitting)
const NibbleVisualizer = lazy(() => import('../components/visualizers/NibbleVisualizer'));
const MerkleProofVisualizer = lazy(() => import('../components/visualizers/MerkleProofVisualizer'));
const StateUpdateVisualizer = lazy(() => import('../components/visualizers/StateUpdateVisualizer'));
const TrieComparisonVisualizer = lazy(() => import('../components/visualizers/TrieComparisonVisualizer'));
const NodeArchetypeVisualizer = lazy(() => import('../components/visualizers/NodeArchetypeVisualizer'));
const PathCompressionVisualizer = lazy(() => import('../components/visualizers/PathCompressionVisualizer'));
const StateRootVisualizer = lazy(() => import('../components/visualizers/StateRootVisualizer'));
const WhyBlockchainStateVisualizer = lazy(() => import('../components/visualizers/WhyBlockchainStateVisualizer'));
const RLPVisualizer = lazy(() => import('../components/visualizers/RLPVisualizer'));

const visualizerMap: Record<VisualizerType, React.ReactNode> = {
  'encoding': <NibbleVisualizer />,
  'nodes': <TrieComparisonVisualizer />,
  'archetypes': <NodeArchetypeVisualizer />,
  'compression': <PathCompressionVisualizer />,
  'root-anchor': <StateRootVisualizer />,
  'state': <WhyBlockchainStateVisualizer />,
  'state-update': <StateUpdateVisualizer />,
  'proof': <MerkleProofVisualizer />,
  'rlp': <RLPVisualizer />,
};

const VisualizerSkeleton = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-neutral-400">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 size={40} className="text-primary/40" />
    </motion.div>
    <p className="text-xs font-black uppercase tracking-[0.2em] animate-pulse">Initializing Neural Engine...</p>
  </div>
);

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topicId ? topicData[topicId] : null;
  const { markAsComplete, isCompleted } = useProgress();

  if (!topic) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">Topic not found</h2>
        <Link to="/learn" className="text-primary mt-4 inline-block">Return to Learn</Link>
      </div>
    );
  }

  const completed = isCompleted(topic.id);

  const handleComplete = () => {
    if (!completed) {
      markAsComplete(topic.id);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#ffffff']
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <Link to="/learn" className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Learning Path
        </Link>
        {completed && (
          <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
            <CheckCircle2 size={12} /> Lesson Mastered
          </div>
        )}
      </div>

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

          {/* Premium Simulation Container */}
          <div className="w-full min-h-[500px] lg:min-h-[700px]">
            <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-[40px] border border-neutral-200 dark:border-neutral-800 flex flex-col items-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] dark:opacity-[0.05] -z-10" />
              
              <div className="w-full h-full overflow-auto p-4 md:p-12 custom-scrollbar">
                <div className="w-full min-h-full flex items-center justify-center">
                    <div className="w-full max-w-full">
                      <SimulationErrorBoundary>
                        <Suspense fallback={<VisualizerSkeleton />}>
                          {visualizerMap[topic.visualType]}
                        </Suspense>
                      </SimulationErrorBoundary>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-neutral-900 dark:bg-black rounded-[40px] border border-neutral-800 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Database size={160} />
            </div>
            <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database size={16} /> Senior Engineer's Deep Dive
            </h3>
            <p className="text-neutral-300 leading-relaxed font-medium relative z-10">
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
                  className="flex gap-4 p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-black text-primary shrink-0 border border-neutral-200 dark:border-neutral-700">
                    {i + 1}
                  </div>
                  <div>
                    <span className="font-bold block mb-1 text-sm">{step.title}</span>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-medium">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-neutral-200 dark:border-neutral-800">
           <div className="flex-1 flex justify-start">
              <button 
                onClick={handleComplete}
                disabled={completed}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                  ${completed 
                    ? 'bg-emerald-500 text-white cursor-default shadow-lg shadow-emerald-500/20' 
                    : 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/25 active:scale-95'}
                `}
              >
                {completed ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                {completed ? 'Lesson Completed' : 'Mark as Complete'}
              </button>
           </div>

           <div className="flex items-center gap-4">
              {(() => {
                const topicIds = Object.keys(topicData);
                const currentIndex = topicIds.indexOf(topic.id);
                const prevTopicId = currentIndex > 0 ? topicIds[currentIndex - 1] : null;
                const nextTopicId = currentIndex < topicIds.length - 1 ? topicIds[currentIndex + 1] : null;
                const prevTopic = prevTopicId ? topicData[prevTopicId] : null;
                const nextTopic = nextTopicId ? topicData[nextTopicId] : null;

                return (
                  <>
                    {prevTopic && (
                      <Link
                        to={`/learn/${prevTopic.id}`}
                        className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 hover:bg-white dark:hover:bg-neutral-900 transition-all text-neutral-500 hover:text-primary"
                        title="Previous Lesson"
                      >
                        <ArrowLeft size={20} />
                      </Link>
                    )}
                    {nextTopic && (
                      <Link
                        to={`/learn/${nextTopic.id}`}
                        className="flex items-center gap-3 px-8 py-4 bg-neutral-900 dark:bg-neutral-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-xl active:scale-95"
                      >
                        Next Lesson <ArrowRight size={16} />
                      </Link>
                    )}
                  </>
                );
              })()}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;