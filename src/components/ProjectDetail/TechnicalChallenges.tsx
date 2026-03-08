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
  const [activeChallenge, setActiveChallenge] = useState<number>(0);

  const renderSolution = (text: string) => {
    // Split by code blocks first
    const parts = text.split(/(```csharp[\s\S]*?```)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('```csharp') && part.endsWith('```')) {
        const code = part.replace('```csharp', '').replace('```', '').trim();
        return (
          <div key={i} className="my-6 p-6 rounded-xl bg-white border border-[#e5e1d8] font-mono text-sm text-[#4a4a4a] overflow-x-auto shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-[#e5e1d8] pb-2">
              <div className="w-2 h-2 rounded-full bg-[#8c7355]/30" />
              <div className="w-2 h-2 rounded-full bg-[#8c7355]/20" />
              <div className="w-2 h-2 rounded-full bg-[#8c7355]/10" />
              <span className="text-[10px] text-[#8c7355]/50 uppercase tracking-widest ml-2">C# Script</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">
              {code}
            </pre>
          </div>
        );
      }
      
      // Handle normal text with bold, italic, highlight, color and line breaks
      return (
        <div key={i} className="space-y-4">
          {part.split('\n').map((line, j) => {
            const trimmedLine = line.trim();
            if (trimmedLine === '---' || trimmedLine === '-------') {
              return <div key={j} className={`w-full h-px my-10 ${theme.border} opacity-80`} />;
            }
            
            // Custom formatter for colors, highlights, italics
            const formatLine = (content: string) => {
              let elements: (string | React.ReactNode)[] = [content];
              
              // 1. Bold: **text**
              elements = elements.flatMap(el => {
                if (typeof el !== 'string') return el;
                return el.split(/(\*\*.*?\*\*)/g).map((p, idx) => 
                  p.startsWith('**') && p.endsWith('**') ? <strong key={idx} className="font-bold text-[#4a4a4a]">{p.slice(2, -2)}</strong> : p
                );
              });

              // 2. Highlight + Italic: ==_text_==
              elements = elements.flatMap(el => {
                if (typeof el !== 'string') return el;
                return el.split(/(==_.*?_==)/g).map((p, idx) => 
                  p.startsWith('==_') && p.endsWith('_==') ? <span key={idx} className="bg-yellow-100 px-1 italic border-b border-yellow-300 text-[#4a4a4a]">{p.slice(3, -3)}</span> : p
                );
              });

              // 3. Blue line: (blue line)
              elements = elements.flatMap(el => {
                if (typeof el !== 'string') return el;
                return el.split(/(\(blue line\))/g).map((p, idx) => 
                  p === '(blue line)' ? <span key={idx} className="text-blue-600 font-medium">blue line</span> : p
                );
              });

              // 4. Green line: (green line)
              elements = elements.flatMap(el => {
                if (typeof el !== 'string') return el;
                return el.split(/(\(green line\))/g).map((p, idx) => 
                  p === '(green line)' ? <span key={idx} className="text-emerald-600 font-medium">green line</span> : p
                );
              });

              return elements;
            };

            return (
              <p key={j} className={`text-base leading-relaxed text-[#4a4a4a]`}>
                {formatLine(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

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
                    ? `bg-[#8c7355] border-[#8c7355] text-white shadow-lg`
                    : `bg-white ${theme.border} ${theme.text} hover:border-[#8c7355] hover:text-[#8c7355]`
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <span className={`text-[10px] uppercase tracking-widest block mb-1 ${activeChallenge === i ? 'text-white/70' : 'opacity-70'}`}>Challenge 0{i+1}</span>
                    <h3 className={`text-lg font-medium font-sans ${activeChallenge === i ? 'text-white' : ''}`}>{challenge.issue}</h3>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${activeChallenge === i ? 'text-white translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
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
                    <h3 className={`text-3xl font-medium font-sans ${theme.text}`}>
                      Solution
                    </h3>
                  </div>
                  
                  <div className={`w-full h-px ${theme.border}`} />
                  
                  <div className="max-w-none">
                    {renderSolution(project.challenges[activeChallenge].solution)}
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
                  activeChallenge === i ? 'bg-[#8c7355] text-white' : 'bg-white'
                }`}
              >
                <div className="space-y-1">
                  <span className={`text-[10px] uppercase tracking-widest block mb-1 ${activeChallenge === i ? 'text-white/70' : theme.muted}`}>Challenge 0{i+1}</span>
                  <h3 className={`text-lg font-medium font-sans ${activeChallenge === i ? 'text-white' : theme.text}`}>
                    {challenge.issue}
                  </h3>
                </div>
                <ArrowRight className={`w-5 h-5 ${activeChallenge === i ? 'text-white' : theme.accent} transition-transform duration-300 ${activeChallenge === i ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeChallenge === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-6 pt-0 border-t ${theme.border} bg-[#fdfcf8]`}>
                      <div className="pt-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>Solution</span>
                        <div className="space-y-4">
                          {renderSolution(challenge.solution)}
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
