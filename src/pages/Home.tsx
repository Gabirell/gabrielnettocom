// import React from 'react';
import styled from 'styled-components';

const WelcomeText = styled.div`
  color: var(--terminal-green);
  font-size: 1.5rem;
  font-family: var(--font-main);
  text-shadow: 0 0 5px var(--terminal-green);
  animation: flicker 4s infinite alternate;
  margin-top: 20px;

  @keyframes flicker {
    0% { opacity: 0.9; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;

const Home = () => {
  return (
    G://_Ask_me_anything...
  );
};

export default Home;