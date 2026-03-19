import React, { useState } from 'react';
import { Play, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';

interface OverviewProps {
  project: Project;
  theme: any;
  renderBold: (text: string) => React.ReactNode[];
}

export const Overview: React.FC<OverviewProps> = ({ project, theme, renderBold }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className={`flex flex-col justify-center pb-12 max-w-7xl mx-auto px-4 sm:px-8 relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8">
              <p className={`text-lg leading-relaxed ${theme.muted}`}>{renderBold(project.inspiration || project.concept)}</p>
              <p className={`italic font-normal ${theme.text} border-l-2 border-[#8c7355] pl-8 py-2`}>
                {project.interaction}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            {project.id === 'spinalxr' ? (
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer group`}
                onClick={() => setIsVideoOpen(true)}
              >
                <iframe 
                  src="https://www.youtube.com/embed/I_KJoeDg2_g?autoplay=1&mute=1&loop=1&playlist=I_KJoeDg2_g&controls=0&showinfo=0&modestbranding=1"
                  className="w-full h-full object-cover pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                  title="Project Overview"
                  allow="autoplay; encrypted-media"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Category and Year Row */}
        <div className="flex flex-wrap gap-x-24 gap-y-8 pt-8 mt-8">
          <div className="space-y-2">
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent} font-normal`}>Category</span>
            <p className="text-sm uppercase tracking-widest whitespace-nowrap">{project.category}</p>
          </div>
          <div className="space-y-2">
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent} font-normal`}>Year</span>
            <p className="text-sm uppercase tracking-widest">{project.year}</p>
          </div>
          {project.publication && (
            <div className="space-y-2">
              <span className={`text-[10px] uppercase tracking-widest ${theme.accent} font-normal`}>Publication</span>
              <p className="text-sm uppercase tracking-widest">
                <a 
                  href={project.publication.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold hover:text-[#8c7355] transition-colors underline underline-offset-4"
                >
                  {project.publication.name}
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe 
                src="https://www.youtube.com/embed/I_KJoeDg2_g?autoplay=1&controls=1"
                className="w-full h-full"
                title="Project Video Full"
                allow="autoplay; encrypted-media; fullscreen"
              />
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-6 right-6 transition-colors text-white/80 hover:text-white"
              >
                <Plus className="w-8 h-8 rotate-45" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
