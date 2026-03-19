import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';

interface ReflectionProps {
  project: Project;
  theme: any;
}

export const Reflection: React.FC<ReflectionProps> = ({ project, theme }) => {
  if (!project.reflection) return null;

  return (
    <section className={`flex flex-col justify-center py-24 border-t-2 ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xs uppercase tracking-[0.3em] ${theme.accent} font-black font-mono`}
          >
            [ 08 Reflection ]
          </motion.h2>
        </div>
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative bg-white p-12 md:p-16 border ${theme.border} shadow-sm max-w-3xl mx-auto rounded-3xl overflow-hidden`}
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(140,115,85,0.05) 31px, rgba(140,115,85,0.05) 32px)',
              backgroundAttachment: 'local'
            }}
          >
            {/* Technical grid markers */}
            <div className={`absolute top-0 left-0 bottom-0 w-1 bg-[#8c7355]/5`} />
            <div className={`absolute top-0 right-0 bottom-0 w-1 bg-[#8c7355]/5`} />
            <div className={`absolute top-0 left-0 right-0 h-1 bg-[#8c7355]/5`} />
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#8c7355]/5`} />

            <div className="relative">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`text-xl leading-[40px] ${theme.text} whitespace-pre-line font-serif font-light italic`}
              >
                {project.reflection.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.01,
                      delay: i * 0.005,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};
