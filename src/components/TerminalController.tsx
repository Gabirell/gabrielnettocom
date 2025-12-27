import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TerminalWrapper = styled.div`
  height: 180px; 
  min-height: 180px;
  border-top: 2px solid var(--terminal-green);
  opacity: 0.9;
  font-size: 1rem;
  flex-shrink: 0; /* Prevent resizing/jumping */
  
  .react-terminal-wrapper {
      padding: 10px;
      height: 100%;
  }
  .react-terminal-line {
      line-height: 1.4;
  }
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 20px;
    padding: 5px 15px;
    border-top: 1px dashed var(--terminal-green);
    background: #000;
    font-family: var(--font-main);
    justify-content: flex-end;
`;

const Link = styled.a`
    color: var(--terminal-green);
    text-transform: uppercase;
    &:hover { color: #fff; }
`;

const TerminalController: React.FC = () => {
  const navigate = useNavigate();
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key="welcome">Welcome to my personal site.</TerminalOutput>,
    <TerminalOutput key="help">Type 'help' for a list of commands.</TerminalOutput>
  ]);

  const handleInput = (terminalInput: string) => {
    const [command] = terminalInput.split(' ');
    let output;

    switch (command.toLowerCase()) {
      case 'help':
        output = <TerminalOutput>Commands: about, apps, games, clear</TerminalOutput>;
        break;
      case 'about':
        navigate('/about');
        output = <TerminalOutput>Navigating to About...</TerminalOutput>;
        break;
      case 'apps':
        navigate('/apps');
        output = <TerminalOutput>Opening Applications...</TerminalOutput>;
        break;
      case 'games':
        navigate('/games');
        output = <TerminalOutput>Loading Games...</TerminalOutput>;
        break;
      case 'clear':
        setTerminalLineData([]);
        return;
      default:
        output = <TerminalOutput>Command not found: {command}</TerminalOutput>;
        break;
    }

    setTerminalLineData(prev => [...prev, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, output]);
  };

  return (
    <>
      <TerminalWrapper>
        <Terminal
          name='gabrielnetto-terminal'
          colorMode={ColorMode.Dark}
          onInput={handleInput}
          height='180px'
        >
          {terminalLineData}
        </Terminal>
      </TerminalWrapper>
      <FooterLinks>
        <span>CONTACTS:</span>
        <Link href="mailto:gabriel@example.com">Email</Link>
        <Link href="https://github.com" target="_blank">GitHub</Link>
        <Link href="https://linkedin.com" target="_blank">LinkedIn</Link>
      </FooterLinks>
    </>
  );
};

export default TerminalController;
