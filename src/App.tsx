import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import BootSequence from './components/BootSequence';
import CRTContainer from './components/CRTContainer';
import Layout from './components/Layout';
import TerminalController from './components/TerminalController';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Admin from './pages/Admin';

// Placeholder Pages for new menu items
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: '20px', fontFamily: "'VT323', monospace", fontSize: '24px' }}>
    <h1>{title}</h1>
    <p>This module is currently under construction...</p>
  </div>
);

const App = () => {
  const [isBooted, setIsBooted] = useState(false);

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
            <Route path="games" element={<Placeholder title="Games" />} />
            <Route path="arts" element={<Placeholder title="Arts" />} />
            <Route path="projects" element={<Projects />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      )}
      {isBooted && <TerminalController />}
    </CRTContainer>
  );
};

export default App;
