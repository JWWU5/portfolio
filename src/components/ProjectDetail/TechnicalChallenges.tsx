import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface TechnicalChallengesProps {
  project: Project;
  theme: any;
}

export const TechnicalChallenges: React.FC<TechnicalChallengesProps> = ({ project, theme }) => {
  const [activeChallenge, setActiveChallenge] = useState<number>(0);

  return (
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">
        <div className="space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[24px] uppercase tracking-[0.2em] ${theme.accent} font-medium`}
          >
            04 Technical Challenges
          </motion.h2>
        </div>
      
        {/* Desktop Layout (Split View) - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-12 gap-24 h-[600px]">
          {/* Left Column: Challenge List */}
          <div className="col-span-4 space-y-4 overflow-y-auto pr-4 custom-scrollbar">
            {project.challenges.map((challenge, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveChallenge(i)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                  activeChallenge === i
                    ? `bg-[#0D9488] border-[#0D9488] text-white shadow-md`
                    : `bg-white ${theme.border} ${theme.text} hover:border-[#0D9488] hover:text-[#0D9488]`
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest block mb-1 opacity-70">Challenge 0{i+1}</span>
                    <h3 className="text-lg font-medium font-sans">{challenge.issue}</h3>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${activeChallenge === i ? 'translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column: Solution Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`col-span-8 relative rounded-2xl overflow-hidden border bg-white ${theme.border} shadow-sm`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChallenge}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-8 overflow-y-auto custom-scrollbar"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>The Solution</span>
                    <h3 className={`text-2xl font-medium font-sans ${theme.text}`}>
                      Addressing: {project.challenges[activeChallenge].issue}
                    </h3>
                  </div>
                  
                  <div className={`w-full h-px ${theme.border}`} />
                  
                  <div className="max-w-none">
                    <p className={`text-base leading-relaxed ${theme.muted}`}>
                      {project.challenges[activeChallenge].solution}
                    </p>
                    
                    {/* Placeholder for images or long content */}
                    <div className="mt-8 space-y-4">
                      <div className={`w-full h-48 rounded-lg bg-[#F0FDFA] border ${theme.border} flex items-center justify-center`}>
                        <span className={`text-xs uppercase tracking-widest opacity-50 ${theme.muted}`}>Diagram / Code Snippet Placeholder</span>
                      </div>
                      <p className={`text-sm ${theme.muted}`}>
                        Additional technical details regarding the implementation could go here. This section is scrollable to accommodate detailed explanations, code blocks, or architectural diagrams that support the solution description.
                      </p>
                      {/* Extra content to demonstrate scrolling */}
                      <p className={`text-sm ${theme.muted}`}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile Layout (Accordion) - Visible on Mobile */}
        <div className="lg:hidden space-y-4">
          {project.challenges.map((challenge, i) => (
            <div key={i} className={`rounded-xl border ${theme.border} bg-white overflow-hidden`}>
              <button
                onClick={() => setActiveChallenge(activeChallenge === i ? -1 : i)}
                className={`w-full text-left p-6 flex items-center justify-between transition-colors ${
                  activeChallenge === i ? 'bg-[#F0FDFA]' : 'bg-white'
                }`}
              >
                <div className="space-y-1">
                  <span className={`text-[10px] uppercase tracking-widest block mb-1 ${theme.muted}`}>Challenge 0{i+1}</span>
                  <h3 className={`text-lg font-medium font-sans ${activeChallenge === i ? theme.accent : theme.text}`}>
                    {challenge.issue}
                  </h3>
                </div>
                <ArrowRight className={`w-5 h-5 ${theme.accent} transition-transform duration-300 ${activeChallenge === i ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeChallenge === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-6 pt-0 border-t ${theme.border} bg-[#F0FDFA]`}>
                      <div className="pt-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>Solution</span>
                        <p className={`text-sm leading-relaxed ${theme.muted}`}>
                          {challenge.solution}
                        </p>
                        <div className={`w-full h-32 rounded-lg bg-white border ${theme.border} flex items-center justify-center`}>
                          <span className={`text-[10px] uppercase tracking-widest opacity-50 ${theme.muted}`}>Visual Placeholder</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
