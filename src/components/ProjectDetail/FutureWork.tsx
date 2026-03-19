import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';

interface FutureWorkProps {
  project: Project;
  theme: any;
}

export const FutureWork: React.FC<FutureWorkProps> = ({ project, theme }) => {
  if (!project.future) return null;

  return (
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[24px] uppercase tracking-[0.2em] ${theme.accent} font-normal`}
          >
            05 Future Work
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {project.future.map((item, i) => (
            <FlipCard key={i} item={item} index={i} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FlipCard: React.FC<{ item: any, index: number, theme: any }> = ({ item, index, theme }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-[280px] perspective-[1000px] group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 12 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face (Focus Area) */}
        <div 
          className={`absolute inset-0 rounded-2xl border ${theme.border} bg-white p-8 flex flex-col items-center justify-center text-center shadow-sm group-hover:shadow-xl transition-shadow duration-300`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className={`text-[10px] uppercase tracking-widest mb-6 ${theme.accent}`}>Future Focus</span>
          <h3 className={`text-2xl font-normal font-sans ${theme.text}`}>
            {item.title}
          </h3>
          <div className="absolute bottom-8 w-12 h-1 bg-[#8c7355]" />
        </div>

        {/* Back Face (Solution) - Brown Theme */}
        <div 
          className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[#8c7355] border border-[#8c7355]"
          style={{ 
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          <p className="text-sm leading-relaxed text-[#fdfcf8]">
            {item.content}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

