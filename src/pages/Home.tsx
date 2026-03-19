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
            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium transition-all border ${!activeFilter ? 'bg-[#8c7355] text-white border-[#8c7355]' : 'bg-white text-[#4a4a4a] border-[#e5e1d8] hover:border-[#8c7355] hover:text-[#8c7355]'}`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium transition-all border ${activeFilter === tag ? 'bg-[#8c7355] text-white border-[#8c7355]' : 'bg-white text-[#4a4a4a] border-[#e5e1d8] hover:border-[#8c7355] hover:text-[#8c7355]'}`}
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
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[#e5e1d8] shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                {/* 悬浮箭头按钮 */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xl">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 项目文本信息 */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8c7355] font-medium font-mono">{project.category}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#4a4a4a]/40 font-medium font-mono">{project.year}</span>
                </div>
                <h3 className="text-4xl md:text-5xl group-hover:text-[#8c7355] transition-colors duration-300 font-serif font-light tracking-tight leading-none">{project.title}</h3>
                <p className="text-lg text-[#4a4a4a]/60 font-light leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  );
};
