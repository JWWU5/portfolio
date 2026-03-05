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
        return <strong key={i} className="font-semibold text-[#0284C7]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const theme = {
    bg: 'bg-[#F0FDFA]', // Teal 50
    text: 'text-[#134E4A]', // Teal 900
    accent: 'text-[#0D9488]', // Teal 600
    border: 'border-[#99F6E4]', // Teal 200
    muted: 'text-[#64748B]', // Slate 500
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
      className={`w-full min-h-screen ${theme.bg} ${theme.text} font-sans relative selection:bg-[#0D9488] selection:text-white`}
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
