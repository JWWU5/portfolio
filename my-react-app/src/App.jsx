import { Routes, Route } from 'react-router-dom';


import './App.css';

import HomePage from './pages/HomePage';
import BoneProject from './pages/Bone';
import ForestProject from './pages/VirtualForest';


function App() {
  return (
    <>
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects-vARtebrae" element={<BoneProject />} />
          <Route path="/projects-virtual-forest" element={<ForestProject />} />
        </Routes>
      </main>
    </>
  );
}

export default App;