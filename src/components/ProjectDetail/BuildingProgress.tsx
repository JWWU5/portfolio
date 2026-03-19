import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';

interface BuildingProgressProps {
  project: Project;
  theme: any;
}

export const BuildingProgress: React.FC<BuildingProgressProps> = ({ project, theme }) => {
  if (!project.buildingProgress || project.buildingProgress.images.length === 0) return null;

  const images = project.buildingProgress.images;

  return (
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[24px] uppercase tracking-[0.2em] ${theme.accent} font-medium ${theme.mono}`}
          >
            04 Building Progress
          </motion.h2>
          <p className={`text-base max-w-2xl font-light ${theme.muted}`}>
            A visual journey through the development process, from initial prototypes to the final physical installation.
          </p>
        </div>

        {/* Regular Grid Gallery with 4:3 Aspect Ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={image.url} 
                alt={image.caption || `Building progress ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
