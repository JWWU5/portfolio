import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { PROJECTS } from "./data/projects";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./components/ProjectDetail/ProjectDetail";
import { FloatingHomeButton } from "./components/FloatingHomeButton";

function ProjectDetailView({ onBack }: { onBack: () => void }) {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <Navigate to="/" replace />;
  
  return (
    <>
      <ProjectDetail 
        project={project} 
        onBack={onBack} 
      />
      <FloatingHomeButton onClick={onBack} />
    </>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isProjectDetail = location.pathname.startsWith('/project/');

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-[#4a4a4a] selection:bg-[#8c7355] selection:text-white">
      {/* Navigation */}
      {!isProjectDetail && (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-[#e5e1d8]" 
            : "bg-transparent py-8"
        }`}>
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
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
          <Routes location={location}>
            <Route 
              path="/" 
              element={<Home onSelectProject={(id) => navigate(`/project/${id}`)} />} 
            />
            <Route 
              path="/project/:id" 
              element={<ProjectDetailView onBack={() => navigate('/')} />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
