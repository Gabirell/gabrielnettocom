import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import styled from 'styled-components';
import BootSequence from './components/BootSequence';
import CRTContainer from './components/CRTContainer';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import Games from './pages/Games';

// Placeholder Pages
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: '20px', fontFamily: "'VT323', monospace", fontSize: '24px', color: 'var(--terminal-green)' }}>
    <h1 style={{ color: '#fff', marginBottom: '20px' }}>{title}</h1>
    <p>This module is currently under construction...</p>
    <p style={{ marginTop: '10px', opacity: 0.7 }}>Check back soon!</p>
  </div>
);

const App = () => {
  const [isBooted, setIsBooted] = useState(false);

  // Skip boot sequence in dev (comment out for production)
  useEffect(() => {
    const skipBoot = import.meta.env.DEV;
    if (skipBoot) setIsBooted(true);
  }, []);

  console.log('🎮 App v1.0.2 - gabrielnetto.com');

  return (
    <CRTContainer>
      {!isBooted ? (
        <BootSequence onComplete={() => setIsBooted(true)} />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="apps" element={<Placeholder title="Applications" />} />
            <Route path="games" element={<Games />} />
            <Route path="arts" element={<Placeholder title="Arts" />} />
            <Route path="blog" element={<Blog />} />
            <Route path="projects" element={<Projects />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      )}
    </CRTContainer>
  );
};

export default App;
