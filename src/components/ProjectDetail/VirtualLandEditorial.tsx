import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { Play, Cpu, Wind, MousePointer2, Box, ArrowRight } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';

interface VirtualLandEditorialProps {
  project: Project;
  theme: any;
  renderBold: (text: string) => React.ReactNode[];
}

export const VirtualLandEditorial: React.FC<VirtualLandEditorialProps> = ({ project, theme, renderBold }) => {
  const images = project.buildingProgress?.images || [];

  return (
    <div className={`w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-12 ${theme.text} font-sans`}>
      {/* Dense Mixed Grid with Relative Positioning for Hanging Elements */}
      <div className="relative grid grid-cols-2 md:grid-cols-12 border-t border-l border-[#e5e1d8]">
        
        {/* Hanging Image 1 - Moved to far left edge */}
        <div className="absolute top-[15%] left-[2%] w-24 h-32 z-20 border border-[#e5e1d8] bg-white p-0.5 shadow-2xl hidden md:block -rotate-3 hover:scale-110 transition-transform duration-300">
          <img src={images[9]?.url} className="w-full h-full object-cover grayscale" alt="Hanging 1" referrerPolicy="no-referrer" />
          <div className="absolute -bottom-3 -right-2 text-[5px] font-mono opacity-40 bg-white px-1">IMG_REF_09</div>
        </div>

        {/* Hanging Image 2 - Moved to far right edge */}
        <div className="absolute top-[55%] right-[2%] w-36 h-28 z-20 border border-[#e5e1d8] bg-white p-0.5 shadow-2xl hidden md:block rotate-2 hover:scale-110 transition-transform duration-300">
          <img src={images[10]?.url} className="w-full h-full object-cover grayscale" alt="Hanging 2" referrerPolicy="no-referrer" />
        </div>

        {/* 1. Title Block */}
        <div className="relative col-span-2 md:col-span-3 p-6 flex flex-col justify-between min-h-[180px] border-r border-b border-[#e5e1d8] bg-white hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute top-0 right-6 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-[0.3em] z-10 opacity-40">Project_Identity</span>
          <div className="space-y-1">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-[0.75]">
              Virtual<br />Land
            </h2>
            <p className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40">Interactive Installation / 2024</p>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold opacity-20">001</span>
            <div className="w-8 h-[1px] bg-[#8c7355]/30"></div>
          </div>
        </div>

        {/* 2. Small Image */}
        <div className="relative col-span-1 md:col-span-3 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[3/4] group">
          <span className="absolute top-0 left-4 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Visual_Asset_01</span>
          <img src={project.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" alt="H1" referrerPolicy="no-referrer" />
        </div>

        {/* 3. Description Block (Compact) */}
        <div className="relative col-span-1 md:col-span-3 p-4 border-r border-b border-[#e5e1d8] bg-[#fdfcf8] flex flex-col justify-center hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute top-0 right-4 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Abstract_Data</span>
          <p className="text-[10px] font-serif italic leading-relaxed opacity-80">
            {project.description.slice(0, 150)}...
          </p>
        </div>

        {/* 4. Technical Spec Tile */}
        <div className="relative col-span-1 md:col-span-3 p-4 border-r border-b border-[#e5e1d8] bg-white flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute bottom-0 left-4 translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">System_Metrics</span>
          <h4 className="text-[7px] uppercase tracking-[0.5em] font-bold opacity-30">System Status</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] font-mono uppercase">
              <span className="opacity-40">Latency</span>
              <span className="text-[#8c7355]">12ms</span>
            </div>
            <div className="flex justify-between text-[8px] font-mono uppercase">
              <span className="opacity-40">Baud Rate</span>
              <span className="text-[#8c7355]">115200</span>
            </div>
          </div>
        </div>

        {/* 5. Process Image 1 */}
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[4/3] group">
          <img src={images[0]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P1" referrerPolicy="no-referrer" />
        </div>

        {/* 6. Challenge 1 (Mixed in) */}
        <div className="relative col-span-2 md:col-span-4 p-5 border-r border-b border-[#e5e1d8] bg-white flex flex-col justify-center space-y-2 hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute top-0 left-10 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Problem_Solving_01</span>
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-mono opacity-30">CHL_01</span>
            <div className="h-[1px] flex-1 bg-[#e5e1d8]"></div>
          </div>
          <p className="text-[10px] font-bold italic font-serif text-[#8c7355] leading-tight">{project.challenges[0]?.issue}</p>
          <p className="text-[9px] leading-snug opacity-50">{project.challenges[0]?.solution}</p>
        </div>

        {/* 7. Architecture Diagram Tile (Integrated & Shrunk) */}
        <div className="relative col-span-2 md:col-span-6 border-r border-b border-[#e5e1d8] bg-[#fdfcf8] aspect-[16/10] hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20">
          <span className="absolute top-0 right-4 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">System_Architecture_v2</span>
          <ArchitectureDiagram />
        </div>

        {/* 8. Process Image 2 */}
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[3/4] group">
          <img src={images[1]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P2" referrerPolicy="no-referrer" />
        </div>

        {/* 9. Hardware List (Small) */}
        <div className="relative col-span-1 md:col-span-2 p-5 border-r border-b border-[#e5e1d8] bg-[#fdfcf8] space-y-3 hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute bottom-0 right-4 translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Inventory_Log</span>
          <h4 className="text-[7px] uppercase tracking-[0.5em] font-bold opacity-30">Hardware.log</h4>
          <ul className="text-[8px] space-y-1 uppercase tracking-widest opacity-60">
            {project.hardware.slice(0, 3).map(h => <li key={h} className="flex items-center gap-2 truncate"><div className="w-1 h-1 bg-[#8c7355]/40"></div>{h}</li>)}
          </ul>
        </div>

        {/* 10. Process Image 3 */}
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[4/3] group">
          <img src={images[2]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P3" referrerPolicy="no-referrer" />
        </div>

        {/* 11. Inspiration Block (Mixed) */}
        <div className="relative col-span-2 md:col-span-4 p-6 border-r border-b border-[#e5e1d8] bg-white flex flex-col justify-center hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute top-0 left-6 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Conceptual_Origin</span>
          <h4 className="text-[7px] uppercase tracking-[0.5em] font-bold opacity-30 mb-3">Inspiration_Source</h4>
          <p className="text-[10px] font-serif italic leading-relaxed opacity-70">
            {project.inspiration.slice(0, 180)}...
          </p>
        </div>

        {/* 12. Process Image 4 */}
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[3/4] group">
          <img src={images[3]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P4" referrerPolicy="no-referrer" />
        </div>

        {/* 13. Interaction Block */}
        <div className="relative col-span-2 md:col-span-2 p-5 border-r border-b border-[#e5e1d8] bg-[#fdfcf8] flex flex-col justify-center hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute bottom-0 left-10 translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">User_Experience_Flow</span>
          <h4 className="text-[7px] uppercase tracking-[0.5em] font-bold opacity-30 mb-2">Interaction_Logic</h4>
          <p className="text-[10px] font-serif italic text-[#8c7355] leading-relaxed truncate">
            {project.interaction.slice(0, 100)}...
          </p>
        </div>

        {/* 14. Software List (Small) */}
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] bg-white p-5 space-y-3 hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <h4 className="text-[7px] uppercase tracking-[0.5em] font-bold opacity-30">Software.env</h4>
          <ul className="text-[8px] space-y-1 uppercase tracking-widest opacity-60">
            {project.software.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>

        {/* 15. Process Image 5 */}
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[4/3] group">
          <img src={images[5]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P5" referrerPolicy="no-referrer" />
        </div>

        {/* 16. Video Fragment (Smaller) */}
        <div className="relative col-span-2 md:col-span-2 border-r border-b border-[#e5e1d8] bg-black relative overflow-hidden group aspect-[4/3] hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20">
          <span className="absolute top-0 right-4 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Motion_Capture</span>
          <img src={images[4]?.url || project.image} className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-500" alt="V1" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-white/50 fill-white/20" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 text-[6px] uppercase tracking-widest text-white/40 font-mono">Play_Sequence_01</div>
        </div>

        {/* 17. Challenge 2 */}
        <div className="relative col-span-2 md:col-span-4 p-5 border-r border-b border-[#e5e1d8] bg-white flex flex-col justify-center space-y-2 hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute top-0 right-10 -translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Problem_Solving_02</span>
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-mono opacity-30">CHL_02</span>
            <div className="h-[1px] flex-1 bg-[#e5e1d8]"></div>
          </div>
          <p className="text-[10px] font-bold italic font-serif text-[#8c7355] leading-tight">{project.challenges[1]?.issue}</p>
          <p className="text-[9px] leading-snug opacity-50">{project.challenges[1]?.solution}</p>
        </div>

        {/* 18. Reflection Block */}
        <div className="relative col-span-2 md:col-span-2 p-6 border-r border-b border-[#e5e1d8] bg-[#fdfcf8] flex flex-col justify-center hover:scale-[1.02] transition-transform duration-300 z-10 hover:z-20 hover:shadow-xl">
          <span className="absolute bottom-0 right-6 translate-y-1/2 bg-white px-1 text-[6px] font-mono uppercase tracking-widest z-10 opacity-40">Post_Analysis</span>
          <h4 className="text-[7px] uppercase tracking-[0.5em] font-bold opacity-30 mb-3">Reflection_Log</h4>
          <p className="text-[10px] font-serif italic leading-relaxed opacity-60 truncate">
            "The journey of VirtualLand taught me..."
          </p>
        </div>

        {/* 19. More Small Images (Denser) */}
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[3/4] group">
          <img src={images[6]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P6" referrerPolicy="no-referrer" />
        </div>
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[4/3] group">
          <img src={images[7]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P7" referrerPolicy="no-referrer" />
        </div>
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[3/4] group">
          <img src={images[8]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P8" referrerPolicy="no-referrer" />
        </div>
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[4/3] group">
          <img src={images[11]?.url || images[0]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P11" referrerPolicy="no-referrer" />
        </div>
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[3/4] group">
          <img src={images[12]?.url || images[1]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P12" referrerPolicy="no-referrer" />
        </div>
        <div className="relative col-span-1 md:col-span-2 border-r border-b border-[#e5e1d8] overflow-hidden aspect-[4/3] group">
          <img src={images[13]?.url || images[2]?.url} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-500" alt="P13" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Credits (Minimal) */}
      <div className="mt-6 flex justify-between items-center text-[7px] uppercase tracking-[0.6em] opacity-20 font-mono">
        <span>VL_PROJECT_DATA_2024</span>
        <div className="flex gap-4">
          <span>ESP32_CORE</span>
          <span>UNITY_ENGINE</span>
        </div>
      </div>
    </div>
  );
};
