import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const BOOT_TEXT = [
  "LOAD \"\"",
  "CPU: NETTO-PROCESSOR 64-BIT, 24 CORES",
  "640K RAM SYSTEM... OK",
  "LOADING GABRIEL_NETTO_KERNEL...",
  "  > MOUNTING BLENDER_MODULES... SUCCESS",
  "  > CONNECTING TO ORACLE_CLOUD... SUCCESS",
  "  > INITIALIZING GODOT_PLUGINS... SUCCESS",
  "  > CHECKING SWIFT_COMPILER... READY",
  "SYSTEM BOOT SEQUENCE COMPLETE.",
  "ENTERING GRAPHICAL USER INTERFACE..."
];

// Intense VHS Glitch Keyframes
const skewAnim = keyframes`
  0% { transform: skewX(0deg); text-shadow: -2px 0 red, 2px 0 blue; }
  5% { transform: skewX(10deg); text-shadow: -4px 0 red, 4px 0 blue; }
  10% { transform: skewX(-10deg); text-shadow: -6px 0 red, 6px 0 blue; }
  15% { transform: skewX(5deg); text-shadow: -3px 0 red, 3px 0 blue; }
  20% { transform: skewX(0deg); text-shadow: -2px 0 red, 2px 0 blue; }
  45% { transform: skewX(0deg); text-shadow: -2px 0 red, 2px 0 blue; }
  50% { transform: skewX(-20deg); text-shadow: -10px 0 red, 10px 0 blue; color: #fff; } /* Flash */
  55% { transform: skewX(10deg); text-shadow: -5px 0 red, 5px 0 blue; }
  60% { transform: skewX(0deg); text-shadow: -2px 0 red, 2px 0 blue; }
  100% { transform: skewX(0deg); text-shadow: -2px 0 red, 2px 0 blue; }
`;

const Container = styled.div`
    background-color: black;
    color: #00FF00;
    font-family: 'VT323', monospace;
    font-size: 24px;
    height: 100%;
    width: 100%;
    padding: 2rem;
    overflow-y: auto;
    text-shadow: 0 0 5px #00FF00;
    position: relative;
`;

const Prompt = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
    flex-direction: column;
`;

const GlitchText = styled.div`
  animation: ${skewAnim} 2s infinite;
  display: inline-block;
  color: red;
  font-size: 3rem; /* Larger text */
  font-weight: bold;
  letter-spacing: 5px;
`;

const Blink = styled.span`
    animation: blink 1s step-end infinite;
    @keyframes blink {
        50% { opacity: 0; }
    }
`;

// Helper for random char
const randomChar = () => {
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return chars[Math.floor(Math.random() * chars.length)];
};

const DecodingLine = ({ text, onComplete }: { text: string, onComplete: () => void }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let iterations = 0;
    const maxIterations = 15;

    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        setDisplay(text);
        clearInterval(interval);
        onComplete();
        return;
      }

      // Scramble effect
      setDisplay(text.split('').map((char, i) => {
        if (Math.random() > 0.5) return randomChar();
        return char;
      }).join(''));

      iterations++;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <div>{display}</div>;
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1); // -1 = waiting
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Auto-start timer
  useEffect(() => {
    const timer = setTimeout(() => {
      startBoot();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {
          // Auto-play policy prevented resuming. User interaction needed.
          // We silent fail here to avoid console spam.
        });
      }
    } catch (e) {
      // Audio API not supported or blocked
    }
  };

  // Text Sequence Logic
  useEffect(() => {
    if (currentLineIndex >= 0 && currentLineIndex < BOOT_TEXT.length) {
      playBeep();
    } else if (currentLineIndex >= BOOT_TEXT.length) {
      setTimeout(onComplete, 1500);
    }
  }, [currentLineIndex]);

  const handleLineComplete = () => {
    // Immediate next line
    setCompletedLines(prev => [...prev, BOOT_TEXT[currentLineIndex]]);
    setCurrentLineIndex(prev => prev + 1);
  };


  if (currentLineIndex === -1) {
    return (
      <Container onClick={startBoot}>
        <Prompt>
          <GlitchText>SYSTEM HALTED</GlitchText>
          <div style={{ marginTop: '20px' }}><Blink>_</Blink> PRESS ANY KEY (OR WAIT 5s)</div>
        </Prompt>
      </Container>
    );
  }

  return (
    <Container>
      {completedLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      {currentLineIndex < BOOT_TEXT.length && (
        <DecodingLine
          text={BOOT_TEXT[currentLineIndex]}
          onComplete={handleLineComplete}
        />
      )}
      <Blink>_</Blink>
    </Container>
  );
};

export default BootSequence;
