import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// View States
type ViewState = 'MAXIMIZED' | 'MINIMIZED_BOX' | 'MINIMIZED_DOT' | 'EXPANDED' | 'HEIGHT_70';

// --- Styled Components ---

const Container = styled.div<{ $viewState: ViewState }>`
    ${props => props.$viewState === 'MAXIMIZED' && `
        width: 100%;
        display: flex;
        flex-direction: column;
        border-top: 2px solid var(--terminal-green);
        background: rgba(0, 0, 0, 0.95);
        position: relative;
    `}

    ${props => props.$viewState === 'EXPANDED' && `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-top: 2px solid var(--terminal-green);
        background: rgba(0, 0, 0, 0.98);
        z-index: 200;
        box-shadow: 0 -5px 20px rgba(0, 255, 0, 0.2);
    `}

    ${props => props.$viewState === 'HEIGHT_70' && `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70%;
        display: flex;
        flex-direction: column;
        border-top: 2px solid var(--terminal-green);
        background: rgba(0, 0, 0, 0.98);
        z-index: 200;
        box-shadow: 0 -5px 20px rgba(0, 255, 0, 0.2);
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
    flex-shrink: 0;

    @media (max-width: 768px) {
        padding: 2px 5px;
    }
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

const TerminalWrapper = styled.div<{ $isExpanded: boolean }>`
  height: ${props => props.$isExpanded ? '100%' : '180px'}; 
  min-height: ${props => props.$isExpanded ? '100%' : '180px'};
  opacity: 0.9;
  font-size: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: ${props => props.$isExpanded ? '100%' : '140px'};
    min-height: ${props => props.$isExpanded ? '100%' : '140px'};
    font-size: 0.8rem;
  }
  
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

  /* NUCLEAR CSS FIX: Force everything to wrap, no exceptions */
  .react-terminal-wrapper,
  .react-terminal-line,
  .react-terminal-line *,
  div, span, pre, p {
      white-space: pre-wrap !important;
      overflow-wrap: break-word !important;
      word-wrap: break-word !important;
      word-break: break-word !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      /* height: auto !important;  <-- REMOVED TO FIX SCROLLING */
      display: block !important;
  }
  
  /* Except specific UI elements if needed, but for now block is safer for wrapping */

  @media (max-width: 768px) {
      .react-terminal-wrapper {
          padding: 5px;
      }
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
  // Force-inject CSS to guarantee wrapping (Fail-safe)
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .react-terminal-wrapper, .react-terminal-line, .react-terminal-line *, .react-terminal-line span, 
      [class*="react-terminal-line"] {
        white-space: pre-wrap !important;
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        /* height: auto !important; <-- REMOVED TO FIX SCROLLING */
        display: block !important;
        max-width: 100% !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key="welcome">Welcome to the terminal. Type 'help' for a list of commands or ask me anything.</TerminalOutput>
  ]);
  const [isThinking, setIsThinking] = useState(false);

  // State Transitions
  const toMaximized = () => setViewState('MAXIMIZED');
  const toExpanded = () => setViewState(prev => prev === 'EXPANDED' ? 'HEIGHT_70' : 'EXPANDED'); // Green button logic
  const toHeight70 = () => setViewState(prev => prev === 'HEIGHT_70' ? 'MAXIMIZED' : 'HEIGHT_70'); // Yellow button logic (Toggle 70% <-> Initial)
  const toMinDot = () => setViewState('MINIMIZED_DOT');

  const handleInput = async (terminalInput: string) => {
    const [command] = terminalInput.split(' ');

    // Commands Logic
    if (command.toLowerCase() === 'help') {
      setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, <TerminalOutput>Commands: about, apps, games, clear, ask. Or just ask me a question!</TerminalOutput>]);
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

    // Explicit 'ask' command (optional, as typing anything works too)
    if (command.toLowerCase() === 'ask') {
      const question = terminalInput.substring(4).trim();
      if (!question) {
        setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, <TerminalOutput>Usage: ask [your question]</TerminalOutput>]);
        return;
      }
      // Proceed to AI logic below (fallthrough)
    }

    // AI Chat Logic (for unknown commands)
    setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>]);
    setIsThinking(true);

    try {
      // Send to n8n Webhook via Nginx Proxy (No CORS constraints)
      const response = await fetch('/api/chat', {
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

      {(viewState === 'MAXIMIZED' || viewState === 'EXPANDED' || viewState === 'HEIGHT_70') && (
        <>
          <Header>
            <Title>gabrielnetto-terminal</Title>
            {/* Red: To Dot */}
            <ControlButton $color="#ff5f56" onClick={toMinDot} title="Minimize to Dot" />
            {/* Yellow: To 70% / Restore */}
            <ControlButton $color="#ffbd2e" onClick={toHeight70} title="Toggle 70% Height" />
            {/* Green: Full Screen */}
            <ControlButton $color="#27c93f" onClick={toExpanded} title="Maximize (100%)" />
          </Header>
          <TerminalWrapper $isExpanded={viewState === 'EXPANDED' || viewState === 'HEIGHT_70'}>
            <Terminal
              name=' '
              colorMode={ColorMode.Dark}
              onInput={handleInput}
              height={viewState === 'EXPANDED' || viewState === 'HEIGHT_70' ? '100%' : '180px'}
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
