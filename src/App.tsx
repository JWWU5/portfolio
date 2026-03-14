import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { PROJECTS } from "./data/projects";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./components/ProjectDetail/ProjectDetail";
import { FloatingHomeButton } from "./components/FloatingHomeButton";

// 详情页视图包装器
function ProjectDetailView({ onBack }: { onBack: () => void }) {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <Navigate to="/" replace />;
  
  return (
    <>
      <ProjectDetail project={project} onBack={onBack} />
      <FloatingHomeButton onClick={onBack} />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-[#4a4a4a] selection:bg-[#8c7355] selection:text-white">
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
