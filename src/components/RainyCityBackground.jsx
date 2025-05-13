// src/components/RainyCityBackground.jsx
import React, { useEffect, useRef } from 'react';


const RainyCityBackground = ({ currentTheme }) => {
  console.log('[RainyCityBackground] COMPONENT RENDERED. Theme prop:', currentTheme);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const raindropsRef = useRef([]);
  const resizeHandlerRef = useRef(null);

  // Rain properties
  const numRaindrops = 200;
  // --- DEBUG: Change rain color to white and more opaque ---
  const rainColor = "rgba(58, 106, 177, 0.5)"; // White, 50% opacity
  const rainSpeedFactor = 5;
  const windFactor = 1;

  useEffect(() => {
    console.log('[RainyCityBackground] useEffect triggered. Current theme:', currentTheme);

    if (currentTheme !== 'dark') {
      console.log('[RainyCityBackground] Not dark mode, clearing and exiting.');
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) { // Ensure context exists before clearing
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      // If canvas element itself should be hidden, handled by inline style in return
      return;
    }

    console.log('[RainyCityBackground] Dark mode: Initializing rain animation.');
    const canvas = canvasRef.current;
    if (!canvas) {
        console.error('[RainyCityBackground] Canvas ref is not available!');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('[RainyCityBackground] Failed to get 2D context!');
        return;
    }
    // let lastTimestamp = 0; // For FPS throttle if you re-enable it

    function createRaindrop(canvasWidth, canvasHeight) {
      return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight * -1 - 20,
        length: Math.random() * 20 + 10,
        speed: Math.random() * rainSpeedFactor + rainSpeedFactor * 0.5,
        opacity: Math.random() * 0.5 + 0.5, // Make them a bit more opaque by default
      };
    }

    function initializeRaindrops() {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      console.log(`[RainyCityBackground] Canvas initialized to: ${canvas.width}x${canvas.height}`);
      raindropsRef.current = [];
      for (let i = 0; i < numRaindrops; i++) {
        raindropsRef.current.push(createRaindrop(canvas.width, canvas.height));
      }
      console.log(`[RainyCityBackground] Initialized ${raindropsRef.current.length} raindrops.`);
    }

    function updateRaindrops() {
      if (!canvas) return; // Guard
      for (let i = 0; i < raindropsRef.current.length; i++) {
        const drop = raindropsRef.current[i];
        drop.y += drop.speed;
        drop.x += windFactor;

        if (drop.y > canvas.height) {
          raindropsRef.current[i] = createRaindrop(canvas.width, canvas.height);
          raindropsRef.current[i].y = Math.random() * -50 - 20;
        }
        if (drop.x > canvas.width + 20) raindropsRef.current[i].x = -20;
        if (drop.x < -20) raindropsRef.current[i].x = canvas.width + 20;
      }
      // For debugging a single drop:
      // if (raindropsRef.current.length > 0) {
      //   console.log(`[RainyCityBackground] Drop 0 y: ${raindropsRef.current[0].y}`);
      // }
    }

    function drawRaindrops() {
      if (!canvas || !ctx) return; // Guard
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10, 10, 10, 0.5)"; // Dark gray, 50% opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = rainColor; // Should be white now
      ctx.lineWidth = 2; // --- DEBUG: Increased line width ---
      ctx.lineCap = 'round';

      for (let i = 0; i < raindropsRef.current.length; i++) {
        const drop = raindropsRef.current[i];
        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + windFactor * 0.5, drop.y + drop.length);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    let animationLoopRunning = false; // To prevent multiple loops if not careful
    function animate() {
      // console.log('[RainyCityBackground] Animate loop tick'); // Can be very noisy
      updateRaindrops();
      drawRaindrops();
      animationFrameId.current = requestAnimationFrame(animate);
    }

    resizeHandlerRef.current = () => {
      if (!canvas) return;
      console.log('[RainyCityBackground] Resizing canvas for dark mode rain.');
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      // Consider re-initializing or adapting raindrops here. For now, they adapt.
      // initializeRaindrops(); // To reset rain on resize
    };
    
    // Initial setup
    initializeRaindrops();
    if (!animationLoopRunning) {
        console.log('[RainyCityBackground] Starting animation loop.');
        animationFrameId.current = requestAnimationFrame(animate);
        animationLoopRunning = true;
    }
    window.addEventListener('resize', resizeHandlerRef.current);

    // Cleanup function
    return () => {
      console.log('[RainyCityBackground] Cleaning up dark mode rain animation.');
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
      }
      animationLoopRunning = false; // Reset flag
      // Clear the canvas on cleanup
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [currentTheme]); // Re-run effect if theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: currentTheme === 'dark' ? 'block' : 'none', // Only display if dark mode
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default RainyCityBackground;