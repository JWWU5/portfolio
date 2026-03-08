import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { Hero } from './Hero';
import { Overview } from './Overview';
import { SystemArchitecture } from './SystemArchitecture';
import { KeyFeatures } from './KeyFeatures';
import { TechnicalChallenges } from './TechnicalChallenges';
import { FutureWork } from './FutureWork';
import { Reflection } from './Reflection';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  // Helper to render bold text from markdown-like syntax
  const renderBold = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-[#8c7355]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const theme = {
    bg: 'bg-[#3d2b1f]', // Medium-Dark Aged Paper Base
    text: 'text-[#e5d5b0]', // Light Kraft for text contrast
    accent: 'text-[#c4a484]', // Lighter Tan for accents
    border: 'border-[#4a3728]', // Darker Brown for borders
    muted: 'text-[#c4a484]/70', // Muted Tan
    font: 'font-sans',
    mono: 'font-mono'
  };

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className={`w-full min-h-screen ${theme.bg} ${theme.text} font-sans relative selection:bg-[#c4a484] selection:text-white`}
      style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"),
          radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%)
        `,
        backgroundBlendMode: 'overlay, multiply',
        opacity: 0.98
      }}
    >
      <Hero project={project} onBack={onBack} theme={theme} />
      
      <Overview project={project} theme={theme} renderBold={renderBold} />
      
      <KeyFeatures project={project} theme={theme} />

      <SystemArchitecture project={project} theme={theme} />
      
      <TechnicalChallenges project={project} theme={theme} />
      
      <FutureWork project={project} theme={theme} />
      
      <Reflection project={project} theme={theme} />

    </motion.div>
  );
};
