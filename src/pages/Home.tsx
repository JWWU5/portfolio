import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';

interface HomeProps {
  onSelectProject: (id: string) => void;
}

const PROJECTS_DATA = PROJECTS;

export const Home: React.FC<HomeProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // 提取所有唯一的分类标签
  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.category.split(" / "))));
  
  // 根据筛选器过滤项目
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
      {/* 筛选器区块 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 pt-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => setActiveFilter(null)}
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${!activeFilter ? 'bg-[#8c7355] text-white' : 'border border-[#e5e1d8] text-[#8c7355] hover:bg-[#f5f2ed]'}`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${activeFilter === tag ? 'bg-[#8c7355] text-white' : 'border border-[#e5e1d8] text-[#8c7355] hover:bg-[#f5f2ed]'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* 项目网格区块 */}
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
              {/* 项目封面图 */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                {/* 悬浮箭头按钮 */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#8c7355] shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 项目文本信息 */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-widest text-[#8c7355] font-normal">{project.category}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#8c7355] font-light">{project.year}</span>
                </div>
                <h3 className="text-2xl md:text-3xl group-hover:text-[#8c7355] transition-colors duration-300 font-normal">{project.title}</h3>
                <p className="text-body text-[#4a4a4a] font-light leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  );
};
