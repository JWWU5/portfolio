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
    // Split by code blocks, side-by-side blocks, and centered highlight blocks
    const parts = text.split(/(```csharp[\s\S]*?```|:::side-by-side[\s\S]*?:::|:::center-hl[\s\S]*?:::)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('```csharp') && part.endsWith('```')) {
        const code = part.replace('```csharp', '').replace('```', '').trim();
        return (
          <div key={i} className="my-6 p-6 rounded-xl bg-[#f0ede4] border border-[#d1cec3] font-mono text-sm text-[#4a4a4a] overflow-x-auto shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-[#d1cec3] pb-2">
              <div className="w-2 h-2 rounded-full bg-[#8c7355]/40" />
              <div className="w-2 h-2 rounded-full bg-[#8c7355]/30" />
              <div className="w-2 h-2 rounded-full bg-[#8c7355]/20" />
              <span className="text-[10px] text-[#8c7355]/60 uppercase tracking-widest ml-2">C# Script</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">
              {code}
            </pre>
          </div>
        );
      }

      if (part.startsWith(':::center-hl') && part.endsWith(':::')) {
        const content = part.replace(':::center-hl', '').replace(':::', '').trim();
        return (
          <div key={i} className="flex justify-center my-6">
            <span className="bg-yellow-100 px-4 py-2 italic border-b-2 border-yellow-300 text-[#4a4a4a] font-medium text-lg">
              {formatLine(content)}
            </span>
          </div>
        );
      }

      if (part.startsWith(':::side-by-side') && part.endsWith(':::')) {
        const content = part.replace(':::side-by-side', '').replace(':::', '').trim();
        const parts = content.split(/(:::center-hl[\s\S]*?:::)/g);
        
        // Find image line
        let imgMatch: RegExpMatchArray | null = null;
        const textParts: string[] = [];
        
        parts.forEach(p => {
          if (p.startsWith(':::center-hl')) {
            textParts.push(p);
          } else {
            const lines = p.split('\n');
            lines.forEach(line => {
              const m = line.trim().match(/!\[(.*?)\]\((.*?)\)/);
              if (m) {
                imgMatch = m;
              } else if (line.trim()) {
                textParts.push(line);
              }
            });
          }
        });

        return (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-10">
            <div className="rounded-xl overflow-hidden border border-[#e5e1d8] shadow-sm bg-[#fdfcf8]">
              {imgMatch && (
                <img 
                  src={imgMatch[2]} 
                  alt={imgMatch[1]} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="space-y-4">
              {textParts.map((tp, idx) => {
                if (tp.startsWith(':::center-hl')) {
                  const subContent = tp.replace(':::center-hl', '').replace(':::', '').trim();
                  return (
                    <div key={idx} className="flex justify-center my-4">
                      <span className="bg-yellow-100 px-4 py-2 italic border-b-2 border-yellow-300 text-[#4a4a4a] font-medium">
                        {formatLine(subContent)}
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={idx} className="text-base leading-relaxed text-[#4a4a4a]">
                    {formatLine(tp)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      
      // Handle normal text with bold, italic, highlight, color and line breaks
      return (
        <div key={i} className="space-y-4">
          {part.split('\n').map((line, j) => {
            const trimmedLine = line.trim();
            if (trimmedLine === '---' || trimmedLine === '-------') {
              return <div key={j} className={`w-full h-px my-12 bg-[#d1cec3]`} />;
            }
            
            return (
              <div key={j} className={`text-base leading-relaxed text-[#4a4a4a]`}>
                {formatLine(line)}
              </div>
            );
          })}
        </div>
      );
    });
  };

  // Move formatLine outside to be accessible by side-by-side block
  const formatLine = (content: string) => {
    let elements: (string | React.ReactNode)[] = [content];
    
    // 0. Images: ![alt](url)
    elements = elements.flatMap((el, i) => {
      if (typeof el !== 'string') return el;
      return el.split(/(!\[.*?\]\(.*?\))/g).map((p, j) => {
        const match = p.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <div key={`img-${i}-${j}`} className="my-8 rounded-xl overflow-hidden border border-[#e5e1d8] shadow-sm bg-[#fdfcf8]">
              <img 
                src={match[2]} 
                alt={match[1]} 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        }
        return p;
      });
    });

    // 1. Highlight + Italic: ==_text_== (Process early to allow nesting)
    elements = elements.flatMap((el, i) => {
      if (typeof el !== 'string') return el;
      return el.split(/(==_.*?_==)/g).map((p, j) => 
        p.startsWith('==_') && p.endsWith('_==') ? <span key={`hl-${i}-${j}`} className="bg-yellow-100 px-1 italic border-b border-yellow-300 text-[#4a4a4a]">{formatLine(p.slice(3, -3))}</span> : p
      );
    });

    // 2. Bold: **text** (Process early to allow nesting)
    elements = elements.flatMap((el, i) => {
      if (typeof el !== 'string') return el;
      return el.split(/(\*\*.*?\*\*)/g).map((p, j) => 
        p.startsWith('**') && p.endsWith('**') ? <strong key={`bold-${i}-${j}`} className="font-bold text-[#4a4a4a]">{formatLine(p.slice(2, -2))}</strong> : p
      );
    });

    // 3. Subscripts: <sub>text</sub>
    elements = elements.flatMap((el, i) => {
      if (typeof el !== 'string') return el;
      return el.split(/(<sub>.*?<\/sub>)/g).map((p, j) => {
        const match = p.match(/<sub>(.*?)<\/sub>/);
        if (match) {
          return <sub key={`sub-${i}-${j}`} className="text-[0.7em] align-baseline relative top-[0.2em]">{match[1]}</sub>;
        }
        return p;
      });
    });

    // 4. Math symbols: $\theta$, $-\theta$
    elements = elements.flatMap((el, i) => {
      if (typeof el !== 'string') return el;
      return el.split(/(\$-\s?\\theta\$|\$\\theta\$)/g).map((p, j) => {
        if (p === '$\\theta$') return <span key={`math-${i}-${j}`} className="font-serif italic">θ</span>;
        if (p === '$-\theta$' || p === '$- \\theta$') return <span key={`math-${i}-${j}`} className="font-serif italic">-θ</span>;
        return p;
      });
    });

    // 5. Blue marker: (blue)
    elements = elements.flatMap((el, i) => {
      if (typeof el !== 'string') return el;
      // Handle (blue) at start or middle
      return el.split(/(\(blue\))/g).map((p, j) => 
        p === '(blue)' ? <span key={`blue-${i}-${j}`} className="text-blue-600 font-bold"></span> : p
      );
    }).filter(el => el !== '');

    // 6. Green marker: (green)
    elements = elements.flatMap((el, i) => {
      if (typeof el !== 'string') return el;
      // Handle (green) at start or middle
      return el.split(/(\(green\))/g).map((p, j) => 
        p === '(green)' ? <span key={`green-${i}-${j}`} className="text-emerald-600 font-bold"></span> : p
      );
    }).filter(el => el !== '');

    // Re-process elements to apply color to the NEXT element if a marker was found
    const coloredElements: React.ReactNode[] = [];
    for (let k = 0; k < elements.length; k++) {
      const current = elements[k];
      if (React.isValidElement(current) && (current.key as string)?.startsWith('blue-')) {
        const next = elements[k + 1];
        if (typeof next === 'string') {
          coloredElements.push(<span key={current.key} className="text-blue-600 font-bold">{next}</span>);
          k++; // skip next
        } else if (React.isValidElement(next)) {
          // If next is an element (like strong), wrap it
          coloredElements.push(<span key={current.key} className="text-blue-600">{next}</span>);
          k++;
        } else {
          coloredElements.push(current);
        }
      } else if (React.isValidElement(current) && (current.key as string)?.startsWith('green-')) {
        const next = elements[k + 1];
        if (typeof next === 'string') {
          coloredElements.push(<span key={current.key} className="text-emerald-600 font-bold">{next}</span>);
          k++; // skip next
        } else if (React.isValidElement(next)) {
          coloredElements.push(<span key={current.key} className="text-emerald-600">{next}</span>);
          k++;
        } else {
          coloredElements.push(current);
        }
      } else {
        coloredElements.push(current as React.ReactNode);
      }
    }

    return coloredElements;
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
                    <span className={`text-[12px] uppercase tracking-widest ${theme.accent} font-bold`}>
                      The Solution
                    </span>
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
