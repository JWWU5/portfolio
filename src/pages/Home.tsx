import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';

interface HomeProps {
  onSelectProject: (id: string) => void;
}

const SectionDivider = () => (
  <div className="py-20 flex flex-col items-center">
    <div className="w-px h-24 bg-[#e5e1d8]" />
  </div>
);

export const Home: React.FC<HomeProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.category.split(" / "))));
  const filteredProjects = activeFilter 
    ? PROJECTS.filter(p => p.category.includes(activeFilter)) 
    : PROJECTS;

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 pt-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => setActiveFilter(null)}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${!activeFilter ? 'bg-[#0D9488] text-white' : 'border border-[#99F6E4] text-[#0D9488] hover:bg-[#CCFBF1]'}`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${activeFilter === tag ? 'bg-[#0D9488] text-white' : 'border border-[#99F6E4] text-[#0D9488] hover:bg-[#CCFBF1]'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer space-y-6"
              onClick={() => onSelectProject(project.id)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0D9488] shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-widest text-[#0D9488] font-bold">{project.category}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#5EEAD4] font-medium">{project.year}</span>
                </div>
                <h3 className="text-2xl md:text-3xl group-hover:text-[#0D9488] transition-colors duration-300 font-medium">{project.title}</h3>
                <p className="text-body text-[#64748B] font-light leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="py-20 flex flex-col items-center">
        <div className="w-px h-24 bg-[#99F6E4]" />
      </div>

      {/* Philosophy Section */}
      <section id="future" className="bg-[#0F766E] text-[#F0FDFA] py-40 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#5EEAD4]">Our Philosophy</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-light">
            "We believe that technology should not feel like a machine, but like an extension of the <span className="italic text-[#99F6E4]">human spirit</span>."
          </h2>
          <div className="w-12 h-px bg-[#5EEAD4] mx-auto" />
        </div>
      </section>
    </motion.div>
  );
};
