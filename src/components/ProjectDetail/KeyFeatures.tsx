import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Project } from '../../types';

interface KeyFeaturesProps {
  project: Project;
  theme: any;
}

export const KeyFeatures: React.FC<KeyFeaturesProps> = ({ project, theme }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  if (!project.features) return null;

  return (
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} space-y-16 overflow-hidden relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-[24px] uppercase tracking-[0.2em] ${theme.accent} font-medium ${theme.mono}`}
        >
          03 Key Features
        </motion.h2>
      </div>
      
      <div className="relative w-full perspective-[2000px]">
        <div className="relative h-[600px] w-full flex items-center justify-center">
          <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {project.features.map((feature, i) => {
                const n = project.features!.length;
                // 计算 5 个项循环的圆周偏移量
                const offset = ((i - activeFeature + n + Math.floor(n/2)) % n) - Math.floor(n/2);
                const absOffset = Math.abs(offset);
                
                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      x: offset * 240,
                      scale: 1 - absOffset * 0.12,
                      rotateY: 0,
                      z: absOffset * -200,
                      opacity: 1 - absOffset * 0.15,
                      zIndex: 10 - absOffset,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-[280px] md:w-[360px] aspect-[3/4] cursor-pointer group"
                    onClick={() => setActiveFeature(i)}
                  >
                    <div className={`w-full h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                      absOffset === 0 ? `bg-white ${theme.border} shadow-xl` : `bg-white/50 ${theme.border}/20`
                    }`}>
                      <div className="h-2/3 relative overflow-hidden bg-black/5">
                        {feature.video ? (
                          <video 
                            src={feature.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#8c7355]/20">
                            <Play className={`w-12 h-12 transition-transform duration-700 ${absOffset === 0 ? 'scale-110' : 'scale-90'}`} />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`${theme.accent} font-mono text-[10px] uppercase tracking-widest`}>{project.title.split(':')[0]}</span>
                          {absOffset === 0 && (
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: 40 }}
                              className="h-0.5 bg-[#8c7355]"
                            />
                          )}
                        </div>
                        <h3 className={`text-xl transition-all duration-500 font-medium ${theme.text} ${absOffset === 0 ? 'translate-x-0' : 'translate-x-2 opacity-50'}`}>
                          {feature.title}
                        </h3>
                        {absOffset === 0 && (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-sm font-light leading-relaxed ${theme.muted}`}
                          >
                            {feature.detail}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
