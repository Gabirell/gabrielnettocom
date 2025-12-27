import styled, { keyframes } from 'styled-components';

const scanlineParam = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
`;

const slowScanlineParam = keyframes`
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
`;

const flickerParam = keyframes`
  0% { opacity: 0.97; }
  5% { opacity: 0.95; }
  10% { opacity: 0.9; }
  15% { opacity: 0.95; }
  20% { opacity: 0.99; }
  25% { opacity: 0.95; }
  30% { opacity: 0.9; }
  35% { opacity: 0.96; }
  40% { opacity: 0.98; }
  45% { opacity: 0.95; }
  50% { opacity: 0.99; }
  55% { opacity: 0.93; }
  60% { opacity: 0.9; }
  65% { opacity: 0.96; }
  70% { opacity: 1; }
  75% { opacity: 0.97; }
  80% { opacity: 0.95; }
  85% { opacity: 0.92; }
  90% { opacity: 0.98; }
  95% { opacity: 0.99; }
  100% { opacity: 0.96; }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #050505;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; /* Prevent clipping */
`;

// The "Physical" Monitor Frame (Curvature)
const MonitorFrame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.8);
  
  /* CRT Curvature Effect */
  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      rgba(18, 16, 16, 0) 50%, 
      rgba(0, 0, 0, 0.25) 50%
    ), linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.06)
    );
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }
`;

// Fast Scanline Animation Layer
const Scanlines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 16, 16, 0.1);
  opacity: 0.6;
  animation: ${scanlineParam} 8s linear infinite;
  pointer-events: none;
  z-index: 3;
`;

// Big Slow Scanline Layer
const BigScanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(
    to bottom,
    rgba(0, 255, 0, 0),
    rgba(0, 255, 0, 0.05) 50%,
    rgba(0, 255, 0, 0)
  );
  animation: ${slowScanlineParam} 12s linear infinite;
  pointer-events: none;
  z-index: 4;
`;


// Flicker and Glow Layer
const CRTScreen = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  animation: ${flickerParam} 0.15s infinite;
  text-shadow: 0 0 4px rgba(0, 255, 0, 0.4); /* Softer glow */
  z-index: 1;
  padding: 15px;
  
  /* Curvature Distortion */
  border-radius: 15px; 
  box-shadow: inset 0 0 80px rgba(0,0,0,0.7);
`;

const CRTContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <MonitorFrame>
        <Scanlines />
        <BigScanline />
        <CRTScreen>
          {children}
        </CRTScreen>
      </MonitorFrame>
    </Container>
  );
};

export default CRTContainer;
