import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';

interface SystemArchitectureProps {
  project: Project;
  theme: any;
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({ project, theme }) => {
  if (!project.architecture) return null;

  return (
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[24px] uppercase tracking-[0.2em] ${theme.accent} font-medium`}
          >
            03 System Architecture
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`p-12 rounded-3xl border bg-white ${theme.border} shadow-sm`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {['hw', 'bridge', 'sw'].map((type, i) => (
              <motion.div 
                key={type} 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <span className={`text-[10px] uppercase tracking-widest ${theme.muted}`}>
                  {type === 'hw' ? 'Hardware Layer' : type === 'bridge' ? 'Communication' : 'Software Layer'}
                </span>
                <div className="space-y-3">
                  {project.architecture?.nodes.filter(n => n.type === type).map(node => (
                    <div key={node.id} className={`p-4 rounded-xl border bg-[#f5f2ed] ${theme.border} ${theme.text} text-sm font-medium flex items-center gap-3 hover:bg-[#e5e1d8] transition-colors duration-300`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-[#8c7355]`} />
                      {node.label}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};