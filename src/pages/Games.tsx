import styled from 'styled-components';
import { useState } from 'react';

const GamesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  border: 2px solid var(--terminal-green);
  padding: 20px;
  margin-bottom: 30px;
  background: rgba(0, 255, 0, 0.05);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  animation: borderPulse 3s ease-in-out infinite;

  @keyframes borderPulse {
    0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.2); }
    50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.4); }
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  text-shadow: 0 0 10px var(--terminal-green);
  animation: flicker 4s infinite alternate;

  @keyframes flicker {
    0% { opacity: 0.9; }
    50% { opacity: 1; }
    100% { opacity: 0.85; }
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const GameCard = styled.a<{ $featured?: boolean }>`
  display: block;
  border: 2px solid var(--terminal-green);
  padding: 20px;
  background: rgba(0, 0, 0, ${props => props.$featured ? '0.7' : '0.5'});
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => props.$featured && `
    border-width: 3px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
  `}

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--terminal-green), transparent);
    animation: scanLine 2s linear infinite;
  }

  @keyframes scanLine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  &:hover {
    background: rgba(0, 255, 0, 0.15);
    box-shadow: 0 0 25px rgba(0, 255, 0, 0.5);
    transform: translateY(-3px) scale(1.02);
    border-color: #fff;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const GameTitle = styled.h2`
  color: #fff;
  font-family: var(--font-main);
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Badge = styled.span<{ $color: string }>`
  font-size: 0.7rem;
  padding: 3px 8px;
  border: 1px solid ${props => props.$color};
  color: ${props => props.$color};
  border-radius: 3px;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.5);
`;

const GameDescription = styled.p`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1rem;
  margin: 10px 0;
  line-height: 1.5;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const TechBadge = styled.span`
  font-family: var(--font-main);
  font-size: 0.85rem;
  padding: 4px 10px;
  border: 1px solid var(--terminal-green);
  color: var(--terminal-green);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
`;

const PlayButton = styled.span`
  display: inline-block;
  margin-top: 15px;
  padding: 8px 20px;
  border: 2px solid var(--terminal-green);
  color: var(--terminal-green);
  background: transparent;
  text-transform: uppercase;
  font-family: var(--font-main);
  font-size: 1rem;
  transition: all 0.2s;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; box-shadow: 0 0 15px var(--terminal-green); }
  }
`;

const ComingSoonSection = styled.div`
  border: 1px dashed var(--terminal-green);
  padding: 30px 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ComingSoonTitle = styled.h3`
  color: var(--terminal-green);
  font-family: var(--font-main);
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ComingSoonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComingSoonCard = styled.div`
  border: 1px solid var(--terminal-green);
  padding: 15px;
  background: rgba(0, 0, 0, 0.7);
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
`;

const Games = () => {
    const [hoveredGame, setHoveredGame] = useState<string | null>(null);

    return (
        <GamesContainer>
            {/* Header */}
            <Header>
                <Title>// EDUCATIONAL GAMES</Title>
                <Subtitle>
                    Learn through play - interactive games for math, languages, and more
                </Subtitle>
            </Header>

            {/* Live Games */}
            <GamesGrid>
                {/* Tragaverbos - Spanish Learning */}
                <GameCard
                    href="https://tragaverbos-game.web.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    $featured={true}
                    onMouseEnter={() => setHoveredGame('tragaverbos')}
                    onMouseLeave={() => setHoveredGame(null)}
                >
                    <GameTitle>
                        TragaVerbos
                        <Badge $color="#f59e0b">LIVE</Badge>
                    </GameTitle>
                    <GameDescription>
                        Master Spanish verb conjugations through an addictive slot machine mechanic.
                        Spin the reels, match the correct conjugations, and level up your Spanish skills!
                    </GameDescription>
                    <TechStack>
                        <TechBadge>React</TechBadge>
                        <TechBadge>Tailwind CSS</TechBadge>
                        <TechBadge>Firebase</TechBadge>
                        <TechBadge>AI-Powered</TechBadge>
                    </TechStack>
                    <PlayButton>
                        ▶ PLAY NOW {hoveredGame === 'tragaverbos' && '→'}
                    </PlayButton>
                </GameCard>

                {/* Matamaticas - Math Game */}
                <GameCard
                    href="https://github.com/Gabirell/Matamaticas-V1"
                    target="_blank"
                    rel="noopener noreferrer"
                    $featured={true}
                    onMouseEnter={() => setHoveredGame('matamaticas')}
                    onMouseLeave={() => setHoveredGame(null)}
                >
                    <GameTitle>
                        Matamaticas
                        <Badge $color="#10b981">GITHUB</Badge>
                    </GameTitle>
                    <GameDescription>
                        Hit the targets to master multiplication tables! Fast-paced arcade action that makes
                        learning math fun. Perfect for kids 6-12 to memorize their times tables.
                    </GameDescription>
                    <TechStack>
                        <TechBadge>HTML5</TechBadge>
                        <TechBadge>JavaScript</TechBadge>
                        <TechBadge>Canvas</TechBadge>
                    </TechStack>
                    <PlayButton>
                        → VIEW ON GITHUB {hoveredGame === 'matamaticas' && '→'}
                    </PlayButton>
                </GameCard>
            </GamesGrid>

            {/* Coming Soon */}
            <ComingSoonSection>
                <ComingSoonTitle>[ COMING SOON ]</ComingSoonTitle>
                <GameDescription style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 20px' }}>
                    New Three.js-powered educational games in development. Each game features:
                    retro aesthetics, cross-platform stat tracking, and adaptive difficulty.
                </GameDescription>

                <ComingSoonGrid>
                    <ComingSoonCard>
                        <h4 style={{ color: '#fff', fontFamily: 'var(--font-main)', margin: '0 0 10px 0' }}>
                            Math Quest
                        </h4>
                        <p style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-main)', fontSize: '0.9rem', margin: 0 }}>
                            3D adventure game teaching arithmetic, geometry, and algebra
                        </p>
                    </ComingSoonCard>

                    <ComingSoonCard>
                        <h4 style={{ color: '#fff', fontFamily: 'var(--font-main)', margin: '0 0 10px 0' }}>
                            Word Warriors
                        </h4>
                        <p style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-main)', fontSize: '0.9rem', margin: 0 }}>
                            English vocabulary and spelling through word combat
                        </p>
                    </ComingSoonCard>

                    <ComingSoonCard>
                        <h4 style={{ color: '#fff', fontFamily: 'var(--font-main)', margin: '0 0 10px 0' }}>
                            Time Travelers
                        </h4>
                        <p style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-main)', fontSize: '0.9rem', margin: 0 }}>
                            Interactive history game with timeline exploration
                        </p>
                    </ComingSoonCard>
                </ComingSoonGrid>
            </ComingSoonSection>
        </GamesContainer>
    );
};

export default Games;
