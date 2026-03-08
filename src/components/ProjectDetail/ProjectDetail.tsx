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
  // 辅助函数：将 markdown 风格的 **text** 渲染为加粗的金色文字
  const renderBold = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-[#8c7355]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // 项目详情页的统一主题配置
  const theme = {
    bg: 'bg-[#fdfcf8]', // 暖白色背景 (Warm White)
    text: 'text-[#4a4a4a]', // 深灰色文字 (Dark Gray)
    accent: 'text-[#8c7355]', // 棕金色强调色 (Gold/Brown)
    border: 'border-[#e5e1d8]', // 浅米色边框 (Light Beige)
    muted: 'text-[#8c7355]/70', // 次要金色文字
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
      className={`w-full min-h-screen ${theme.bg} ${theme.text} font-sans relative selection:bg-[#8c7355] selection:text-white`}
    >
      {/* 01. 英雄区块 (标题与返回按钮) */}
      <Hero project={project} onBack={onBack} theme={theme} />
      
      {/* 02. 项目概览 (概念、交互与视频) */}
      <Overview project={project} theme={theme} renderBold={renderBold} />
      
      {/* 03. 核心功能 (3D 轮播卡片) */}
      <KeyFeatures project={project} theme={theme} />

      {/* 04. 系统架构 (硬件、通信、软件层级) */}
      <SystemArchitecture project={project} theme={theme} />
      
      {/* 05. 技术挑战 (左侧列表，右侧详细方案) */}
      <TechnicalChallenges project={project} theme={theme} renderBold={renderBold} />
      
      {/* 06. 未来展望 (翻转卡片) */}
      <FutureWork project={project} theme={theme} />
      
      {/* 07. 个人反思 */}
      <Reflection project={project} theme={theme} />

    </motion.div>
  );
};
