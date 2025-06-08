import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;