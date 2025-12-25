import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useNavigate } from 'react-router-dom';

const TerminalController: React.FC = () => {
  const navigate = useNavigate();
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput key="welcome">Welcome to my personal site. Type 'help' to see a list of available commands.</TerminalOutput>,
  ]);

  const handleInput = (terminalInput: string) => {
    const [command, ...args] = terminalInput.split(' ');
    let output;

    switch (command) {
      case 'help':
        output = (
          <TerminalOutput>
            Available commands: 'about', 'projects', 'clear', 'home'
          </TerminalOutput>
        );
        break;
      case 'about':
        navigate('/about');
        output = <TerminalOutput>Navigating to about page...</TerminalOutput>;
        break;
      case 'projects':
        navigate('/projects');
        output = <TerminalOutput>Navigating to projects page...</TerminalOutput>;
        break;
      case 'home':
        navigate('/');
        output = <TerminalOutput>Returning home...</TerminalOutput>;
        break;
      case 'clear':
        setTerminalLineData([]);
        return;
      default:
        output = <TerminalOutput>Unknown command: {command}</TerminalOutput>;
        break;
    }

    setTerminalLineData(prevData => [...prevData, <TerminalOutput>{`$ ${terminalInput}`}</TerminalOutput>, output]);
  };

  return (
    <Terminal
      name='Hacker Terminal'
      colorMode={ColorMode.Dark}
      onInput={handleInput}
    >
      {terminalLineData}
    </Terminal>
  );
};

export default TerminalController;
