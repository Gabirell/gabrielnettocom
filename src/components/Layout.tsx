import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TerminalController from './TerminalController';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 2px solid var(--terminal-green);
  padding: 2px;
  max-width: 1200px; /* Max width for the "Box" */
  margin: 0 auto;
  background-color: var(--terminal-bg);
  box-shadow: 0 0 20px var(--terminal-green);
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--terminal-green);
  color: #000;
  padding: 4px 8px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

const HeaderLeft = styled.div``;
const HeaderRight = styled.div``;

const MenuBar = styled.div`
  display: flex;
  border-bottom: 2px solid var(--terminal-green);
  padding: 8px;
  gap: 16px;
`;

const MenuItem = styled(NavLink)`
  color: var(--terminal-green);
  font-size: 1.1rem;
  padding: 2px 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 6px; /* Rounded distortion */
  
  &:hover, &.active {
    background-color: var(--terminal-green);
    color: #000;
    box-shadow: 0 0 8px var(--terminal-green);
    transform: scale(1.05);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
  /* Visual scrollbar hidden for cleaner look */
  &::-webkit-scrollbar { width: 0; }
`;

const Layout = () => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: BIOS DATE 12/25/25 15:23:01 VER 1.0.2
      const dateStr = now.toLocaleDateString('en-US', {
        month: '2-digit', day: '2-digit', year: '2-digit'
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false
      });
      setDateTime(`BIOS DATE ${dateStr} ${timeStr} VER 1.0.2`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <OuterContainer>
      <HeaderBar>
        <HeaderLeft>{dateTime}</HeaderLeft>
        <HeaderRight>/gabrielnetto ~%</HeaderRight>
      </HeaderBar>
      <MenuBar>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/apps">Apps</MenuItem>
        <MenuItem to="/games">Games</MenuItem>
        <MenuItem to="/arts">Arts</MenuItem>
        <MenuItem to="/about">About</MenuItem>
        <MenuItem to="/admin">Admin</MenuItem>
      </MenuBar>
      <MainContent>
        <Outlet />
      </MainContent>
      <TerminalController />
    </OuterContainer>
  );
};

export default Layout;
