// import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 768px) {
    gap: 20px;
    padding: 10px 0;
  }
`;

const WelcomeBlock = styled.div`
  border: 1px solid var(--terminal-green);
  padding: 20px;
  background: rgba(0, 255, 0, 0.05);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const WelcomeText = styled.div`
  color: var(--terminal-green);
  font-size: 1.5rem;
  font-family: var(--font-main);
  text-shadow: 0 0 5px var(--terminal-green);
  animation: flicker 4s infinite alternate;
  margin-bottom: 15px;
  text-align: center;

  @keyframes flicker {
    0% { opacity: 0.9; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.p`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Highlight = styled.span`
  color: #fff;
  text-shadow: 0 0 8px var(--terminal-green);
  font-weight: bold;
`;

const SectionTitle = styled.h2`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1.3rem;
  border-bottom: 2px solid var(--terminal-green);
  padding-bottom: 5px;
  margin-bottom: 15px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const FeatureCard = styled.div`
  border: 1px solid var(--terminal-green);
  padding: 15px;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const FeatureTitle = styled.h3`
  color: #fff;
  font-family: var(--font-main);
  font-size: 1.1rem;
  margin: 0 0 8px 0;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureDescription = styled.p`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.85;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const TerminalPrompt = styled.div`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1rem;
  margin-top: 20px;
  padding: 15px;
  border: 1px dashed var(--terminal-green);
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  
  span {
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      {/* Welcome Message */}
      <WelcomeBlock>
        <WelcomeText>
          G:/◾ Bem-vindo / Welcome / Bienvenid@ to GABRIEL NETTO'S website.
        </WelcomeText>
        <Description>
          This is a <Highlight>portfolio and experimental playground</Highlight> showcasing
          applications, educational games, artistic works, and AI-powered projects.
          Built with a retro DOS terminal aesthetic, this site combines nostalgia with
          modern web technologies.
        </Description>
        <Description>
          Explore using the <Highlight>navigation menu above</Highlight> or interact
          with the <Highlight>AI terminal below</Highlight> to ask questions and navigate the site.
        </Description>
      </WelcomeBlock>

      {/* Site Features */}
      <div>
        <SectionTitle>// What's Inside</SectionTitle>
        <FeatureList>
          <FeatureCard onClick={() => window.location.href = '/apps'}>
            <FeatureTitle>→ APPS</FeatureTitle>
            <FeatureDescription>
              Development portfolio featuring web applications, automation tools,
              and Firebase projects.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard onClick={() => window.location.href = '/games'}>
            <FeatureTitle>→ GAMES</FeatureTitle>
            <FeatureDescription>
              Educational games teaching math, languages, and history with
              cross-platform stat tracking.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard onClick={() => window.location.href = '/arts'}>
            <FeatureTitle>→ ARTS</FeatureTitle>
            <FeatureDescription>
              Gallery of artistic works, 3D models, and creative projects.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard onClick={() => window.location.href = '/about'}>
            <FeatureTitle>→ ABOUT</FeatureTitle>
            <FeatureDescription>
              Interactive timeline showcasing complete work history, education,
              and professional journey.
            </FeatureDescription>
          </FeatureCard>
        </FeatureList>
      </div>

      {/* Terminal Prompt Hint */}
      <TerminalPrompt>
        $ Type 'help' in the terminal or ask me anything<span>_</span>
      </TerminalPrompt>
    </HomeContainer>
  );
};

export default Home;