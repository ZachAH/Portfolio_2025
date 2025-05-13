// src/components/AnimatedBackground.jsx
import React, { useEffect, useRef } from 'react';
import * as SimplexNoiseLibrary from 'simplex-noise';

// Helper functions (these were not defined in your provided script, so I'm making them up or assuming standard ones)
const TAU = 2 * Math.PI;
const rand = (max) => Math.random() * max;
const cos = Math.cos;
const sin = Math.sin;
const fadeInOut = (t, T) => { // Example simple fade in/out
  const halfT = T / 2;
  return t < halfT ? t / halfT : (T - t) / halfT;
};

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null); // To store the requestAnimationFrame ID for cleanup

  // Constants from your script
  const circleCount = 150;
  const circlePropCount = 8;
  const circlePropsLength = circleCount * circlePropCount;
  const baseSpeed = 0.1;
  const rangeSpeed = 1;
  const baseTTL = 150;
  const rangeTTL = 200;
  const baseRadius = 100; // Might be too large for "subtle", adjust
  const rangeRadius = 200; // Might be too large for "subtle", adjust
  const rangeHue = 60;
  const xOff = 0.0015;
  const yOff = 0.0015;
  const zOff = 0.0015;
  const backgroundColor = 'hsla(0,0%,5%,1)'; // This is a very dark background

  useEffect(() => {
    let canvas = { a: null, b: null };
    let ctx = { a: null, b: null };
    let circles; // This was not used in the draw logic, circleProps is used
    let circleProps;
    let simplex;
    let baseHueVal; // Renamed to avoid conflict with baseHue in scope

    function initCircle(i) {
      let x, y, n, t, speed, vx, vy, life, ttl, radius, hue;

      x = rand(canvas.a.width);
      y = rand(canvas.a.height);
      n = simplex.noise3D(x * xOff, y * yOff, baseHueVal * zOff);
      t = rand(TAU);
      speed = baseSpeed + rand(rangeSpeed);
      vx = speed * cos(t);
      vy = speed * sin(t);
      life = 0;
      ttl = baseTTL + rand(rangeTTL);
      radius = baseRadius + rand(rangeRadius); // Adjust for subtlety
      hue = baseHueVal + n * rangeHue;

      circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i);
    }

    function updateCircle(i) {
      let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i;
      let x, y, vx, vy, life, ttl, radius, hue;

      x = circleProps[i];
      y = circleProps[i2];
      vx = circleProps[i3];
      vy = circleProps[i4];
      life = circleProps[i5];
      ttl = circleProps[i6];
      radius = circleProps[i7];
      hue = circleProps[i8];

      // Draw on canvas 'a' (the off-screen buffer)
      ctx.a.save();
      ctx.a.fillStyle = `hsla(${hue},60%,30%,${fadeInOut(life,ttl)})`; // Circles might be dark
      ctx.a.beginPath();
      ctx.a.arc(x,y, radius, 0, TAU);
      ctx.a.fill();
      ctx.a.closePath();
      ctx.a.restore();

      life++;

      circleProps[i] = x + vx;
      circleProps[i2] = y + vy;
      circleProps[i5] = life;

      (checkBounds(x, y, radius) || life > ttl) && initCircle(i);
    }
    
    function checkBounds(x, y, radius) {
      return (
        x < -radius ||
        x > canvas.a.width + radius ||
        y < -radius ||
        y > canvas.a.height + radius
      );
    }

    function updateCircles() {
      let i;
      baseHueVal++;
      for (i = 0; i < circlePropsLength; i += circlePropCount) {
        updateCircle(i);
      }
    }

    function render() {
      // Apply blur and draw buffer 'a' to visible canvas 'b'
      ctx.b.save();
      ctx.b.filter = 'blur(50px)'; // Heavy blur, good for ambient
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }
    
    let then = Date.now();
    const fpsInterval = 1000 / 30; // Target 30 FPS, adjust if needed

    function draw() {
      animationFrameId.current = window.requestAnimationFrame(draw);

      const now = Date.now();
      const elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        // Clear off-screen buffer 'a' for redrawing particles
        ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
        
        // Fill visible canvas 'b' with background color
        ctx.b.fillStyle = backgroundColor;
        ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
        
        updateCircles(); // Updates and draws circles to canvas 'a'
        render(); // Blurs canvas 'a' and draws it to canvas 'b'
      }
    }

    function resize() {
      const { innerWidth, innerHeight } = window;
      if (canvas.a && canvas.b) { // Check if canvases exist
        canvas.a.width = innerWidth;
        canvas.a.height = innerHeight;
        if (ctx.a && ctx.b) { // Check if contexts exist
          ctx.a.drawImage(canvas.b, 0, 0); // Preserve existing drawing before clearing main buffer
          canvas.b.width = innerWidth;
          canvas.b.height = innerHeight;
          ctx.b.drawImage(canvas.a, 0, 0); // Apply to visible buffer
        }
      }
    }

    function setup() {
      if (!containerRef.current) return;

      canvas.a = document.createElement('canvas'); // Off-screen buffer
      canvas.b = document.createElement('canvas'); // Visible canvas

      // Style and append the visible canvas (canvas.b)
      canvas.b.style.position = 'fixed';
      canvas.b.style.top = '0';
      canvas.b.style.left = '0';
      canvas.b.style.width = '100%';
      canvas.b.style.height = '100%';
      canvas.b.style.zIndex = '-1'; // Place it behind other content
      containerRef.current.appendChild(canvas.b);

      ctx.a = canvas.a.getContext('2d');
      ctx.b = canvas.b.getContext('2d');

      // Init circle properties
      circleProps = new Float32Array(circlePropsLength);
        // Use the default export from the imported module
        if (typeof SimplexNoiseLibrary.default === 'function') {
            simplex = new SimplexNoiseLibrary.default(Math.random); // Pass Math.random or a seed
        } else {
            // Fallback or error if the structure isn't as expected
            // This might happen if an older version of simplex-noise is somehow used
            // or if the import itself had an issue not caught earlier.
            console.error("SimplexNoise default export not found or not a function.", SimplexNoiseLibrary);
            // Provide a dummy simplex to prevent further crashes if absolutely necessary for testing other parts
            simplex = { noise3D: () => 0 }; 
        }         baseHueVal = 220; // Initial baseHue
  

      let i;
      for (i = 0; i < circlePropsLength; i += circlePropCount) {
        initCircle(i); // Initialize circles after canvas dimensions are set in resize
      }
      
      resize(); // Call resize to set initial canvas dimensions and initialize circles
      draw(); // Start the animation loop

      window.addEventListener('resize', resize);
    }

    setup();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
      if (containerRef.current && canvas.b) {
        // Check if canvas.b exists and is a child before trying to remove
        if (containerRef.current.contains(canvas.b)) {
            containerRef.current.removeChild(canvas.b);
        }
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return <div ref={containerRef} className="content--canvas" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default AnimatedBackground;