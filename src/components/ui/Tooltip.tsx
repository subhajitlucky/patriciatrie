import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, delay = 0.2 }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, delay }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none"
          >
            {content}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-4 border-transparent border-t-neutral-900 dark:border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
