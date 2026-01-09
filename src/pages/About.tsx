import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

// Keyframes for cylinder rotation
const rotateCylinder = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  height: calc(100vh - 200px);
  padding: 0;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--terminal-green);
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
`;

const TimelineLabel = styled.div`
  color: #ff6b35;
  font-family: var(--font-main);
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
  border-bottom: 2px solid #ff6b35;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const TimelineContainer = styled.div`
  flex: 1;
  padding: 40px 20px;
  overflow-y: auto;
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, 
    transparent 0%,
    #ff6b35 10%,
    #ff6b35 90%,
    transparent 100%
  );
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    left: 30px;
  }
`;

const YearItem = styled.div<{ $isLeft: boolean; $isHovered: boolean }>`
  position: relative;
  margin-bottom: 60px;
  display: flex;
  justify-content: ${props => props.$isLeft ? 'flex-end' : 'flex-start'};
  align-items: center;
  transition: all 0.3s ease;
  transform: ${props => props.$isHovered ? 'scale(1.05)' : 'scale(1)'};
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`;

const YearBubble = styled.div<{ $isLeft: boolean; $isHovered: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: ${props => props.$isHovered ? '60px' : '40px'};
  height: ${props => props.$isHovered ? '60px' : '40px'};
  border-radius: 50%;
  background: ${props => props.$isHovered ? '#ff6b35' : 'rgba(255, 107, 53, 0.3)'};
  border: 3px solid #ff6b35;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-main);
  font-size: ${props => props.$isHovered ? '1rem' : '0.9rem'};
  color: ${props => props.$isHovered ? '#000' : '#ff6b35'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: ${props => props.$isHovered ? '0 0 20px rgba(255, 107, 53, 0.8)' : 'none'};
  
  @media (max-width: 768px) {
    left: 30px;
    transform: translateX(-50%);
  }
`;

const EventCard = styled.div<{ $isLeft: boolean; $isHovered: boolean }>`
  width: ${props => props.$isHovered ? '320px' : '280px'};
  padding: ${props => props.$isHovered ? '20px' : '15px'};
  background: ${props => props.$isHovered ? 'rgba(255, 107, 53, 0.15)' : 'rgba(0, 255, 0, 0.05)'};
  border: 2px solid ${props => props.$isHovered ? '#ff6b35' : 'var(--terminal-green)'};
  margin-${props => props.$isLeft ? 'right' : 'left'}: 80px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${props => props.$isHovered ? '0 0 25px rgba(255, 107, 53, 0.4)' : '0 0 10px rgba(0, 255, 0, 0.2)'};
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    width: ${props => props.$isHovered ? '100%' : 'calc(100% - 20px)'};
  }
`;

const EventTitle = styled.h3<{ $isHovered: boolean }>`
  font-family: var(--font-main);
  font-size: ${props => props.$isHovered ? '1.1rem' : '1rem'};
  color: ${props => props.$isHovered ? '#ff6b35' : '#fff'};
  margin: 0 0 8px 0;
  transition: all 0.3s ease;
`;

const EventDescription = styled.p<{ $isHovered: boolean }>`
  font-family: var(--font-main);
  font-size: 0.9rem;
  color: var(--terminal-green);
  margin: 0;
  line-height: 1.4;
  opacity: ${props => props.$isHovered ? '1' : '0.8'};
  max-height: ${props => props.$isHovered ? '200px' : '60px'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--terminal-green);
  background: rgba(0, 0, 0, 0.9);
  position: relative;
  overflow: hidden;
  
  @media (max-width: 968px) {
    height: 400px;
  }
`;

const CylinderLabel = styled.div`
  color: #ff6b35;
  font-family: var(--font-main);
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
  border-bottom: 2px solid var(--terminal-green);
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const CylinderContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
`;

const Cylinder = styled.div`
  width: 200px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  animation: ${rotateCylinder} 10s linear infinite;
`;

const CylinderSlice = styled.div<{ $rotation: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #ff6b35;
  border-radius: 50%;
  transform: rotateY(${props => props.$rotation}deg) translateZ(100px);
  opacity: 0.6;
`;

// Timeline data from curriculum
const timelineData = [
  { year: '1977', title: 'Born', description: 'Gandía, Valencia, Spain', isLeft: true },
  { year: '2002', title: 'Education Complete', description: 'Master in Industrial Colorimetry & M.A. in Painting and Audiovisuals - Universidad Complutense de Madrid', isLeft: false },
  { year: '2002', title: 'Walt Disney Internship', description: 'Design Department - Buenavista International Madrid', isLeft: true },
  { year: '2008', title: 'Agrupamento Andar7 Founded', description: 'Research group for programming, video-interaction, performance, technology, and visual arts', isLeft: false },
  { year: '2008', title: 'Chevrolet Captiva', description: 'Editing and Post-Production for projection mapping corporate events', isLeft: true },
  { year: '2010', title: 'La Fura dels Baus', description: 'VJ, projection mapping, video creation for Cielo Art project', isLeft: false },
  { year: '2012', title: 'ResTelinha Residency', description: '7th Circuit Residences in Education, Art and Technology - Sensor programming & projection mapping', isLeft: true },
  { year: '2014', title: 'Retinamérica Installation', description: 'Interactive Installation - #Tropical Noir intervention transforming pedestrians into VJs', isLeft: false },
  { year: '2014', title: 'Film Award', description: '"Bailado do Deus Morto" (Ballet of the Dead God): OX Project - 1st place feature film, (ID) art_fest, Italy', isLeft: true },
  { year: '2016', title: 'Videomapping & Teaching', description: 'Multiple projects: SOMPO videomapping, SESC Belenzinho workshop, Iracema via Iracema performance', isLeft: false },
  { year: '2019', title: 'Agrupamento Andar7', description: 'Continued research in VJ and video-mapping technologies until 2019', isLeft: true },
  { year: '2026', title: 'Present', description: 'Visual Artist, Motion Designer, VJ - São Paulo, Brazil. 17+ years in post-production & motion graphics', isLeft: false },
];

const About = () => {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <AboutContainer>
      <LeftPanel>
        <TimelineLabel>TIMELINE</TimelineLabel>
        <TimelineContainer>
          <TimelineLine />
          {timelineData.map((event, index) => (
            <YearItem
              key={index}
              $isLeft={event.isLeft}
              $isHovered={hoveredYear === event.year + index}
              onMouseEnter={() => setHoveredYear(event.year + index)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              <YearBubble
                $isLeft={event.isLeft}
                $isHovered={hoveredYear === event.year + index}
              >
                {event.year}
              </YearBubble>
              <EventCard
                $isLeft={event.isLeft}
                $isHovered={hoveredYear === event.year + index}
              >
                <EventTitle $isHovered={hoveredYear === event.year + index}>
                  {event.title}
                </EventTitle>
                <EventDescription $isHovered={hoveredYear === event.year + index}>
                  {event.description}
                </EventDescription>
              </EventCard>
            </YearItem>
          ))}
        </TimelineContainer>
      </LeftPanel>

      <RightPanel>
        <CylinderLabel>CYLINDER</CylinderLabel>
        <CylinderContainer>
          <Cylinder>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((rotation) => (
              <CylinderSlice key={rotation} $rotation={rotation} />
            ))}
          </Cylinder>
        </CylinderContainer>
      </RightPanel>
    </AboutContainer>
  );
};

export default About;