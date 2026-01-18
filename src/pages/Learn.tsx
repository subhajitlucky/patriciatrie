import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Database, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';
import { allTopics } from '../utils/topicContent';
import { useProgress } from '../hooks/useProgress';

const Learn: React.FC = () => {
  const { completedTopics, isCompleted } = useProgress();
  const progressPercentage = Math.round((completedTopics.length / allTopics.length) * 100);

  const clearProgress = () => {
    localStorage.removeItem('pt-progress');
    window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <header className="mb-16 relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-primary/20 rounded-full hidden lg:block" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
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

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-[32px] shadow-xl min-w-[240px]"
          >
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Progress</span>
                <span className="text-sm font-black text-primary">{progressPercentage}%</span>
             </div>
             <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
             </div>
             <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-500">{completedTopics.length} / {allTopics.length} Lessons</span>
                {completedTopics.length > 0 && (
                  <button 
                    onClick={clearProgress}
                    className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw size={10} /> Reset
                  </button>
                )}
             </div>
          </motion.div>
        </div>
      </header>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[27px] sm:left-12 top-0 bottom-0 w-0.5 bg-neutral-100 dark:bg-neutral-800 hidden sm:block" />

        <div className="grid gap-8 relative">
          {allTopics.map((topic, i) => {
            const completed = isCompleted(topic.id);
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Path Node Indicator */}
                <div className={`
                  absolute left-[27px] sm:left-12 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-neutral-950 border-4 z-10 hidden sm:block transition-colors duration-500
                  ${completed ? 'border-primary' : 'border-neutral-200 dark:border-neutral-800'}
                `} />

                <Link
                  to={`/learn/${topic.id}`}
                  className={`
                    group flex flex-col sm:flex-row items-start sm:items-center p-6 sm:p-8 sm:ml-24 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border rounded-[32px] transition-all shadow-sm hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.99]
                    ${completed ? 'border-primary/30 dark:border-primary/20 bg-primary/[0.02]' : 'border-neutral-200 dark:border-neutral-800 hover:border-primary'}
                  `}
                >
                  <div className="flex items-center gap-6 w-full">
                    <div className={`
                      relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-inner
                      ${completed ? 'bg-primary text-white' : 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary group-hover:text-white'}
                    `}>
                      {topic.icon && <topic.icon size={28} className={`${completed ? 'text-white' : topic.color} group-hover:text-white transition-colors`} />}
                      {completed && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-lg">
                           <CheckCircle2 size={14} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Lesson 0{i + 1}</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{topic.tag}</span>
                      </div>
                      <h3 className={`
                        text-xl sm:text-2xl font-black mb-2 transition-colors
                        ${completed ? 'text-primary' : 'text-neutral-900 dark:text-white group-hover:text-primary'}
                      `}>
                        {topic.title}
                      </h3>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-medium line-clamp-2">
                        {topic.description}
                      </p>
                    </div>

                    <div className={`
                      hidden sm:flex w-12 h-12 rounded-full border items-center justify-center transition-all duration-500 shrink-0
                      ${completed 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-neutral-100 dark:border-neutral-800 group-hover:bg-primary group-hover:border-primary group-hover:text-white'}
                    `}>
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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
