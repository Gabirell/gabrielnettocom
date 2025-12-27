import styled from 'styled-components';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
  outline: none; /* Focus handled by items */
`;

const MenuItem = styled(NavLink)`
  color: var(--terminal-green);
  font-size: 1.1rem;
  padding: 2px 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.1s;
  border-radius: 6px;
  text-decoration: none;
  
  &:hover, &.active, &:focus {
    background-color: var(--terminal-green);
    color: #000;
    box-shadow: 0 0 8px var(--terminal-green);
    transform: scale(1.05);
    outline: none;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar { width: 0; }
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 20px;
    padding: 5px 15px;
    border-top: 1px dashed var(--terminal-green);
    background: #000;
    font-family: var(--font-main);
    justify-content: flex-end;
    margin-top: auto;
`;

const Link = styled.a`
    color: var(--terminal-green);
    text-transform: uppercase;
    text-decoration: none;
    &:hover { color: #fff; text-decoration: underline; }
`;

// "Admin" removed from menu items
const MENU_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Apps', path: '/apps' },
  { label: 'Games', path: '/games' },
  { label: 'Arts', path: '/arts' },
  { label: 'About', path: '/about' }
];

const Layout = () => {
  const [dateTime, setDateTime] = useState('');
  const navigate = useNavigate();
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  // Keyboard Navigation Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle nav if we are not inside input (simple check)
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const current = menuRefs.current.findIndex(el => el === document.activeElement);
        const next = (current + 1) % MENU_ITEMS.length;
        menuRefs.current[next]?.focus();
        navigate(MENU_ITEMS[next].path);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const current = menuRefs.current.findIndex(el => el === document.activeElement);
        const prev = (current - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
        menuRefs.current[prev]?.focus();
        navigate(MENU_ITEMS[prev].path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Initial Focus
  useEffect(() => {
    // Focus home on mount if nothing focused
    if (document.activeElement === document.body) {
      menuRefs.current[0]?.focus();
    }
  }, [])

  return (
    <OuterContainer>
      <HeaderBar>
        <HeaderLeft>{dateTime}</HeaderLeft>
        {/* Admin Link in Header */}
        <NavLink to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
          <HeaderRight>/GABRIELNETTO % (ADMIN)</HeaderRight>
        </NavLink>
      </HeaderBar>
      <MenuBar>
        {MENU_ITEMS.map((item, index) => (
          <MenuItem
            key={item.path}
            to={item.path}
            ref={el => menuRefs.current[index] = el}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuBar>
      <MainContent>
        <Outlet />
      </MainContent>
      <TerminalController />
      {/* Persistent Footer */}
      <FooterLinks>
        <span>CONTACTS:</span>
        <Link href="mailto:gabriel@example.com">Email</Link>
        <Link href="https://github.com/Gabirell" target="_blank">GitHub</Link>
        <Link href="https://linkedin.com" target="_blank">LinkedIn</Link>
      </FooterLinks>
    </OuterContainer>
  );
};

export default Layout;
