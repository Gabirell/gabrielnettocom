import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #0a0a0a;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    padding: 0;
  }

  a {
    color: #00ff00;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyles;
