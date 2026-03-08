import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';

interface SystemArchitectureProps {
  project: Project;
  theme: any;
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({ project, theme }) => {
  if (!project.architecture) return null;

  const nodes = project.architecture.nodes;
  const connections = project.architecture.connections;

  // Calculate positions for nodes in a circle
  const radius = 220;
  const centerX = 400;
  const centerY = 300;

  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col justify-center py-24 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 w-full">
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

        <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto overflow-visible bg-[#fdfcf8]/30 rounded-3xl border border-[#8c7355]/10 shadow-inner">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
            {/* Connections */}
            {connections.map((conn, i) => {
              const fromNodeIdx = nodes.findIndex(n => n.id === conn.from);
              const toNodeIdx = nodes.findIndex(n => n.id === conn.to);
              
              const fromPos = fromNodeIdx === -1 ? { x: centerX, y: centerY } : getPosition(fromNodeIdx, nodes.length);
              const toPos = toNodeIdx === -1 ? { x: centerX, y: centerY } : getPosition(toNodeIdx, nodes.length);

              return (
                <motion.line
                  key={i}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="#8c7355"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                />
              );
            })}

            {/* Central Hub Connections */}
            {nodes.map((node, i) => {
              const pos = getPosition(i, nodes.length);
              return (
                <motion.line
                  key={`hub-${i}`}
                  x1={centerX}
                  y1={centerY}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="#8c7355"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Central Hub */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative w-40 h-40 rounded-full border-4 border-[#8c7355] bg-white shadow-2xl overflow-hidden group">
              <img 
                src="/vARtebrae-cover.png" 
                alt="Central Hub" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8c7355]">Central Hub</span>
            </div>
          </motion.div>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const pos = getPosition(i, nodes.length);
            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="absolute z-30"
                style={{ 
                  left: `${(pos.x / 800) * 100}%`, 
                  top: `${(pos.y / 600) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`px-5 py-2.5 rounded-xl border-2 shadow-lg transition-all duration-300 hover:scale-110 cursor-default ${
                  node.type === 'hw' ? 'bg-[#8c7355] text-white border-[#8c7355]' : 
                  node.type === 'sw' ? 'bg-white text-[#8c7355] border-[#8c7355]' : 
                  'bg-[#fdfcf8] text-[#4a4a4a] border-[#e5e1d8]'
                }`}>
                  <span className="text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                    {node.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
          <div className="space-y-4">
            <h4 className={`text-sm uppercase tracking-widest font-bold ${theme.accent}`}>Hardware Stack</h4>
            <p className={`text-sm leading-relaxed ${theme.muted}`}>
              Physical components including Meta Quest 3 and specialized force sensors integrated into the 3D-printed model.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className={`text-sm uppercase tracking-widest font-bold ${theme.accent}`}>Software Engine</h4>
            <p className={`text-sm leading-relaxed ${theme.muted}`}>
              Unity-based XR environment utilizing Passthrough API and custom data processing for real-time visualization.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className={`text-sm uppercase tracking-widest font-bold ${theme.accent}`}>Bridge Logic</h4>
            <p className={`text-sm leading-relaxed ${theme.muted}`}>
              The communication layer that synchronizes physical force data with virtual bone displacement and rotation.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
