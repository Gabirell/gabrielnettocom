import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import TerminalController from './components/TerminalController';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Admin from './pages/Admin';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const TerminalWrapper = styled.div`
  height: 300px;
`;

const App = () => {
  return (
    <AppContainer>
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ContentContainer>
      <TerminalWrapper>
        <TerminalController />
      </TerminalWrapper>
    </AppContainer>
  );
};

export default App;
