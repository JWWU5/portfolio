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
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[24px] uppercase tracking-[0.2em] ${theme.accent} font-medium`}
          >
            06 Reflection
          </motion.h2>
        </div>
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 1, rotate: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative bg-white p-8 md:p-12 shadow-lg border ${theme.border} max-w-3xl mx-auto`}
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #E2E8F0 31px, #E2E8F0 32px)',
              backgroundAttachment: 'local'
            }}
          >
            {/* Paper holes */}
            <div className={`absolute top-0 left-4 md:left-8 bottom-0 w-8 border-r-2 border-double ${theme.border}/50 flex flex-col justify-evenly py-4`}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-[#F0FDFA] shadow-inner mb-8 mx-auto" />
              ))}
            </div>

            <div className="pl-8 md:pl-12">
              <p className={`text-lg leading-[32px] ${theme.text} whitespace-pre-line font-serif`}>
                {project.reflection}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};
