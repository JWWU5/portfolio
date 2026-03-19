import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface TechnicalChallengesProps {
  project: Project;
  theme: any;
  renderBold: (text: string) => React.ReactNode[];
}

export const TechnicalChallenges: React.FC<TechnicalChallengesProps> = ({ project, theme, renderBold }) => {
  if (!project.challenges || project.challenges.length === 0) return null;

  return (
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-mono`}
          >
            06 Technical Challenges
          </motion.h2>
          <p className={`text-base max-w-2xl font-light ${theme.muted}`}>
            Overcoming obstacles through iterative design and engineering.
          </p>
        </div>

        <div className="space-y-8">
          {project.challenges.map((challenge, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-3xl border ${theme.border} bg-white shadow-lg hover:shadow-xl transition-all duration-500`}
            >
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8c7355]/10 flex items-center justify-center text-[#8c7355]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className={`text-2xl font-medium ${theme.text}`}>{challenge.issue}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className={`text-[10px] uppercase tracking-widest ${theme.accent} font-mono`}>The Challenge</span>
                      <p className={`text-base font-light leading-relaxed ${theme.text}`}>{renderBold(challenge.issue)}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <span className={`text-[10px] uppercase tracking-widest text-emerald-600 font-mono`}>The Solution</span>
                      <div className={`text-base font-light leading-relaxed ${theme.text}`}>
                        {renderBold(challenge.solution)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Zap: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
