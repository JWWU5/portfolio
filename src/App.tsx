import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { ArrowRight, Mail, Github, Instagram, Plus } from "lucide-react";
import { PROJECTS } from "./data/projects";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./components/ProjectDetail/ProjectDetail";
import { FloatingHomeButton } from "./components/FloatingHomeButton";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen text-[#4a4a4a] selection:bg-[#8c7355] selection:text-white">
      {/* Navigation */}
      {!selectedProjectId && (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-[#e5e1d8]" 
            : "bg-transparent py-8"
        }`}>
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <button 
              onClick={() => setSelectedProjectId(null)}
              className="text-xl tracking-[0.2em] font-serif uppercase cursor-pointer text-[#4a4a4a]"
            >
              Artisanal<span className="italic text-[#8c7355]">Tech</span>
            </button>
            <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.2em] font-medium text-[#8c7355]">
              <a href="#work" className="hover:text-[#4a4a4a] transition-colors">The Work</a>
              <a href="#research" className="hover:text-[#4a4a4a] transition-colors">Research</a>
              <a href="#future" className="hover:text-[#4a4a4a] transition-colors">Future</a>
            </div>
            <button className="md:hidden text-[#4a4a4a]">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </nav>
      )}

      <main>
        <AnimatePresence mode="wait">
          {!selectedProjectId ? (
            <Home onSelectProject={handleSelectProject} />
          ) : (
            <>
              <ProjectDetail 
                project={selectedProject!} 
                onBack={handleBackToProjects} 
              />
              <FloatingHomeButton onClick={handleBackToProjects} />
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
