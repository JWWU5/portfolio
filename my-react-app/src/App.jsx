import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import vARtebraePage from './pages/vARtebrae';
import ForestProject from './pages/VirtualForest';


function App() {
  return (
    <>
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects-vARtebrae" element={<vARtebraeProject />} />
          <Route path="/projects-virtual-forest" element={<ForestProject />} />
        </Routes>
      </main>
    </>
  );
}

export default App;