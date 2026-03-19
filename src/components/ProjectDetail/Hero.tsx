import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../../types';

interface HeroProps {
  project: Project;
  onBack: () => void;
  theme: any;
}

export const Hero: React.FC<HeroProps> = ({ project, onBack, theme }) => {
  return (
    <section className={`relative min-h-[50vh] flex flex-col justify-center px-4 sm:px-8 py-20 z-10 mx-4 sm:mx-8`}>
      <motion.button 
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className={`absolute top-8 left-0 flex items-center gap-3 text-sm uppercase tracking-widest hover:text-[#8c7355] transition-colors group ${theme.muted}`}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </motion.button>

      <div className="max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-6">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="h-1 bg-[#8c7355]"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight ${theme.text}`}
          >
            {project.title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
};
