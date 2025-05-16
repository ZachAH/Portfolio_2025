import React, { useEffect, useRef, useState } from 'react';
import * as SimplexNoiseModule from 'simplex-noise';

// Helper functions
const TAU = 2 * Math.PI;
const rand = (max) => Math.random() * max;
const cos = Math.cos;
const sin = Math.sin;
const fadeInOut = (currentTime, totalTime) => {
  const halfTime = totalTime / 2;
  if (currentTime < halfTime) return currentTime / halfTime;
  return (totalTime - currentTime) / halfTime;
};

const AnimatedBackground = ({ currentTheme }) => {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const resizeHandlerRef = useRef(null); // To store the resize handler instance

  // State to control when the full colorful animation starts
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  // Constants from the original script
  const circleCount = 150;
  const circlePropCount = 8;
  const circlePropsLength = circleCount * circlePropCount;
  const baseSpeed = 0.1;
  const rangeSpeed = 1;
  const baseTTL = 150;
  const rangeTTL = 200;
  const baseRadius = 100;
  const rangeRadius = 200;
  const rangeHue = 60; // Hue variance once active
  const xOff = 0.0015;
  const yOff = 0.0015;
  const zOff = 0.0015;
  const originalBackgroundColor = 'hsla(0,0%,5%,1)'; // Canvas background for light mode

  // Timing for foreground animations to complete
  const foregroundAnimationEndTime = 4800; // 4.8 seconds in milliseconds (adjust as needed)

  useEffect(() => {
    console.log('[AnimatedBackground] useEffect. Theme:', currentTheme, "Animation Active:", isAnimationActive);

    let canvas, ctx, circleProps, simplex, baseHue;
    let activationTimerId = null; // <<< Declare activationTimerId here

    if (currentTheme === 'light') {
      console.log('[AnimatedBackground] Light mode: Initializing particle animation.');

      // --- Timer to activate full colors after foreground animations ---
      // Assign to the timerId declared in the outer scope
      activationTimerId = setTimeout(() => {
        // Check if the theme is still light when the timer fires
        if (currentTheme === 'light') {
          console.log('[AnimatedBackground] Foreground animations complete. Activating full particle colors.');
          setIsAnimationActive(true);
        }
      }, foregroundAnimationEndTime);
      // --- End Timer ---

      function initCirclesLocal() {
        circleProps = new Float32Array(circlePropsLength);
        if (SimplexNoiseModule && typeof SimplexNoiseModule.createNoise3D === 'function') {
          simplex = SimplexNoiseModule.createNoise3D(Math.random);
        } else {
          console.error("SimplexNoise issue: createNoise3D not found.");
          simplex = () => 0.5; // Fallback dummy
        }
        baseHue = 220; // Default starting blueish hue
        
        for (let i = 0; i < circlePropsLength; i += circlePropCount) {
          initCircleLocal(i);
        }
      }

      function initCircleLocal(i) {
        let x, y, n, t, speed, vx, vy, life, ttl, radius, currentCircleHue;
        x = rand(canvas.a.width);
        y = rand(canvas.a.height);
        n = simplex(x * xOff, y * yOff, baseHue * zOff); // Use simplex directly
        t = rand(TAU);
        speed = baseSpeed + rand(rangeSpeed);
        vx = speed * cos(t);
        vy = speed * sin(t);
        life = 0;
        ttl = baseTTL + rand(rangeTTL);
        radius = baseRadius + rand(rangeRadius);

        if (isAnimationActive) {
          currentCircleHue = (baseHue + n * rangeHue) % 360; // Full color spectrum
        } else {
          currentCircleHue = 220; // Keep it fixed blue for initial faint particles
        }
        circleProps.set([x, y, vx, vy, life, ttl, radius, currentCircleHue], i);
      }

      function updateCirclesLocal() {
        if (isAnimationActive) {
          baseHue = (baseHue + 1) % 360; // Start shifting hue palette
        } else {
          // Before activation, keep hue relatively static or shift very slowly
          // baseHue = (baseHue + 0.1) % 360; // Optional very slow pre-shift
        }
        for (let i = 0; i < circlePropsLength; i += circlePropCount) {
          updateCircleLocal(i);
        }
      }

      function updateCircleLocal(i) {
        let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;
        let x = circleProps[i], y = circleProps[i2], vx = circleProps[i3], vy = circleProps[i4],
            life = circleProps[i5], ttl = circleProps[i6], radius = circleProps[i7], hueFromProps = circleProps[i8];

        drawCircleLocal(x, y, life, ttl, radius, hueFromProps);
        life++;
        circleProps[i] = x + vx;
        circleProps[i2] = y + vy;
        circleProps[i5] = life;
        (checkBoundsLocal(x, y, radius, canvas.a.width, canvas.a.height) || life > ttl) && initCircleLocal(i);
      }

      function drawCircleLocal(x, y, life, ttl, radius, currentCircleHue) {
        ctx.a.save();
        if (isAnimationActive) {
          ctx.a.fillStyle = `hsla(${currentCircleHue},60%,30%,${fadeInOut(life, ttl)})`; // Original vibrant style
        } else {
          // Initial "black" or very dark blue, barely visible particles
          ctx.a.fillStyle = `hsla(${currentCircleHue},50%,5%,${fadeInOut(life, ttl) * 0.2})`; // Very dark & faint
        }
        ctx.a.beginPath();
        ctx.a.arc(x, y, radius, 0, TAU);
        ctx.a.fill();
        ctx.a.closePath();
        ctx.a.restore();
      }

      function checkBoundsLocal(x, y, radius, canvasWidth, canvasHeight) {
        return ( x < -radius || x > canvasWidth + radius || y < -radius || y > canvasHeight + radius );
      }
      
      function renderLocal() {
        if (!ctx || !ctx.b || !canvas || !canvas.a) return;
        ctx.b.save();
        ctx.b.filter = 'blur(50px)'; // Original blur
        ctx.b.drawImage(canvas.a, 0, 0);
        ctx.b.restore();
      }
      
      let then = Date.now();
      const fpsInterval = 1000/30;

      function drawLocal() {
        animationFrameId.current = window.requestAnimationFrame(drawLocal);
        const now = Date.now();
        const elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            if (!ctx.a || !ctx.b || !canvas.a || !canvas.b) return;
            ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
            ctx.b.fillStyle = originalBackgroundColor; // Always use the dark canvas background for the effect
            ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
            updateCirclesLocal();
            renderLocal();
        }
      }

      resizeHandlerRef.current = () => {
        if (!canvas || !canvas.a || !canvas.b || !ctx || !ctx.a || !ctx.b) return;
        const { innerWidth, innerHeight } = window;
        if (canvas.a.width !== innerWidth || canvas.a.height !== innerHeight) {
          console.log('[AnimatedBackground] Resizing canvas for light mode.');
          if(canvas.b.width > 0 && canvas.b.height > 0) ctx.a.drawImage(canvas.b, 0, 0); // Preserve
          canvas.a.width = innerWidth; canvas.a.height = innerHeight;
          canvas.b.width = innerWidth; canvas.b.height = innerHeight;
          if(canvas.a.width > 0 && canvas.a.height > 0) ctx.b.drawImage(canvas.a, 0, 0); // Restore
          if (circleProps && simplex) {
            for (let i_loop = 0; i_loop < circlePropsLength; i_loop += circlePropCount) {
              initCircleLocal(i_loop);
            }
          }
        }
      };
      
      function resizeLocal() { resizeHandlerRef.current(); }

      function setupOriginal() {
        console.log('[AnimatedBackground] setupOriginal() for light mode.');
        if (!containerRef.current) {
          console.error('[AnimatedBackground] Container ref missing in setup.');
          return;
        }
        canvas = { a: document.createElement('canvas'), b: document.createElement('canvas') };
        canvas.b.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;`;
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(canvas.b);
        ctx = { a: canvas.a.getContext('2d'), b: canvas.b.getContext('2d') };
        if (!ctx.a || !ctx.b) { console.error("Failed to get 2D context"); return; }
        
        initCirclesLocal(); // Initialize with current state of isAnimationActive
        resizeLocal();      // Sets canvas dimensions and re-initializes circles
        drawLocal();
        window.addEventListener('resize', resizeHandlerRef.current);
      }

      setupOriginal();

    } else { // Dark Mode
      console.log('[AnimatedBackground] Dark mode: Clearing canvas container.');
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      // Reset isAnimationActive if theme changes from light to dark,
      // so it starts fresh if switched back to light
      if (isAnimationActive) { // Only call setter if state needs to change
        setIsAnimationActive(false); 
      }
    }

    // Cleanup function
    return () => {
      console.log('[AnimatedBackground] useEffect cleanup. Previous theme was:', currentTheme, "Animation Active state was:", isAnimationActive);
      if (activationTimerId) { // Now activationTimerId is in scope
        clearTimeout(activationTimerId);
      }
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [currentTheme, isAnimationActive]); // Dependencies for the main effect

  return <div ref={containerRef} className="animated-background-container" />;
};

export default AnimatedBackground;