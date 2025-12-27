import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// View States
type ViewState = 'MAXIMIZED' | 'MINIMIZED_BOX' | 'MINIMIZED_DOT';

// --- Styled Components ---

const Container = styled.div<{ $viewState: ViewState }>`
    ${props => props.$viewState === 'MAXIMIZED' && `
        width: 100%;
        display: flex;
        flex-direction: column;
        border-top: 2px solid var(--terminal-green);
        background: rgba(0, 0, 0, 0.9);
    `}
    
    ${props => props.$viewState === 'MINIMIZED_BOX' && `
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: 200px;
        border: 2px solid var(--terminal-green);
        background: #000;
        z-index: 100;
        box-shadow: 0 0 10px var(--terminal-green);
    `}

    ${props => props.$viewState === 'MINIMIZED_DOT' && `
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end; /* Buttons on the right */
    align-items: center;
    padding: 5px 10px;
    background: var(--terminal-green);
    gap: 8px;
    height: 24px;
`;

const Title = styled.div`
    flex: 1;
    color: #000;
    font-weight: bold;
    font-size: 0.9rem;
    text-transform: uppercase;
    padding-left: 5px;
`;

const ControlButton = styled.div<{ $color: string }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.$color};
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.3);
    
    &:hover {
        filter: brightness(1.2);
    }
`;

const TerminalWrapper = styled.div`
  height: 180px; 
  min-height: 180px;
  opacity: 0.9;
  font-size: 1rem;
  flex-shrink: 0;
  overflow: hidden; /* Ensure scrollbar is handled by inner content */
  
  /* Hide default react-terminal-ui buttons (the overlapping dots) */
  .react-terminal-window-buttons {
      display: none !important;
  }

  .react-terminal-wrapper {
      padding: 10px;
      height: 100%;
      overflow-y: auto;
      
      /* Classic Green Scrollbar */
      &::-webkit-scrollbar {
          width: 12px;
          background: #000;
          border-left: 1px solid var(--terminal-green);
      }
      &::-webkit-scrollbar-thumb {
          background: var(--terminal-green);
          border: 1px solid #000;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
      }
      &::-webkit-scrollbar-track {
          background: #001100;
      }
  }
  
  .react-terminal-line {
      line-height: 1.4;
  }
`;

// Minimized Views
const MinimizedBoxContent = styled.div`
    padding: 5px;
    color: var(--terminal-green);
    font-family: var(--font-main);
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
`;

const DotButton = styled.div`
    width: 20px;
    height: 20px;
    background-color: var(--terminal-green);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 5px var(--terminal-green);
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
    }
`;

// --- Main Component ---

const TerminalController: React.FC = () => {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('MAXIMIZED');
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key="welcome">Welcome to the terminal. Type 'help' for a list of commands.</TerminalOutput>
  ]);
  const [isThinking, setIsThinking] = useState(false);

  // State Transitions
  const toMaximized = () => setViewState('MAXIMIZED');
  const toMinBox = () => setViewState('MINIMIZED_BOX');
  const toMinDot = () => setViewState('MINIMIZED_DOT');

  const handleInput = async (terminalInput: string) => {
    const [command] = terminalInput.split(' ');

    // Commands Logic
    if (command.toLowerCase() === 'help') {
      setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, <TerminalOutput>Commands: about, apps, games, clear. Or just ask me a question!</TerminalOutput>]);
      return;
    }
    if (command.toLowerCase() === 'about') {
      setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, <TerminalOutput>Navigating to About...</TerminalOutput>]);
      navigate('/about');
      return;
    }
    if (command.toLowerCase() === 'apps') {
      setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, <TerminalOutput>Opening Applications...</TerminalOutput>]);
      navigate('/apps');
      return;
    }
    if (command.toLowerCase() === 'games') {
      setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, <TerminalOutput>Loading Games...</TerminalOutput>]);
      navigate('/games');
      return;
    }
    if (command.toLowerCase() === 'clear') {
      setTerminalLineData([]);
      return;
    }

    // AI Chat Logic (for unknown commands)
    setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>]);
    setIsThinking(true);

    try {
      // Send to n8n Webhook
      const response = await fetch('https://n8n.gabrielnetto.com/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: terminalInput })
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      // Expecting { output: "AI Response" } or simply the text
      const aiText = data.output || data.message || JSON.stringify(data);

      setTerminalLineData(prev => [...prev, <TerminalOutput>{aiText}</TerminalOutput>]);
    } catch (err) {
      setTerminalLineData(prev => [...prev, <TerminalOutput>Error: Could not connect to AI mainframe. (Is n8n running?)</TerminalOutput>]);
    } finally {
      setIsThinking(false);
    }
  };

  // Render Logic
  return (
    <Container $viewState={viewState}>
      {/* Render Logic based on State */}

      {viewState === 'MAXIMIZED' && (
        <>
          <Header>
            <Title>gabrielnetto-terminal</Title>
            {/* Red: To Dot */}
            <ControlButton $color="#ff5f56" onClick={toMinDot} title="Minimize to Dot" />
            {/* Yellow: To Box */}
            <ControlButton $color="#ffbd2e" onClick={toMinBox} title="Minimize to Box" />
            {/* Green: Maximize (No-op here really, or restore) */}
            <ControlButton $color="#27c93f" onClick={toMaximized} title="Maximize" />
          </Header>
          <TerminalWrapper>
            <Terminal
              name=' '
              colorMode={ColorMode.Dark}
              onInput={handleInput}
              height='180px'
            >
              {terminalLineData}
              {isThinking && <TerminalOutput><span style={{ color: 'var(--terminal-green)', animation: 'blink 1s infinite' }}>Thinking...</span></TerminalOutput>}
            </Terminal>
          </TerminalWrapper>
        </>
      )}

      {viewState === 'MINIMIZED_BOX' && (
        <MinimizedBoxContent onClick={toMaximized}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Terminal</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <ControlButton $color="#ff5f56" onClick={(e) => { e.stopPropagation(); toMinDot(); }} />
              <ControlButton $color="#27c93f" />
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}> Click to restore...</div>
        </MinimizedBoxContent>
      )}

      {viewState === 'MINIMIZED_DOT' && (
        <DotButton onClick={toMaximized} title="Open Terminal" />
      )}
    </Container>
  );
};

export default TerminalController;
