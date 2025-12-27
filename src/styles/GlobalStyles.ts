import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --terminal-green: #00ff00;
    --terminal-amber: #ffb000;
    --terminal-bg: #101010;
    --terminal-dim: rgba(0, 255, 0, 0.5);
    --crt-scanline: rgba(18, 16, 16, 0.5);
    --font-main: 'VT323', monospace;
  }

  body {
    background-color: #000;
    color: var(--terminal-green);
    font-family: var(--font-main);
    margin: 0;
    padding: 0;
    overflow: hidden; /* CRT Container handles scroll */
    height: 100vh;
    width: 100vw;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: var(--terminal-green);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      text-shadow: 0 0 5px var(--terminal-green);
    }
  }

  /* Scrollbar styling for a retro feel */
  ::-webkit-scrollbar {
    width: 10px;
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background: #003300;
    border: 1px solid #00ff00;
  }
`;

export default GlobalStyles;
