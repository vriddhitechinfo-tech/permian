'use client';

import { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles array
    const particles = [];
    const particleCount = 45;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
      });
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      // Clear with black base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw faint dot grid
      drawGrid();

      // Render glowing nodes
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      });

      // Clear shadows for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: -10,
          pointerEvents: 'none',
          backgroundColor: '#000000',
          overflow: 'hidden'
        }}
      >
        {/* Top-left red/violet glow */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '600px',
            height: '600px',
            opacity: 0.08,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at top left, #E31937 0%, transparent 70%)'
          }}
        />
        
        {/* Bottom-right red/indigo glow */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '500px',
            height: '500px',
            opacity: 0.07,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at bottom right, #e31937 0%, transparent 70%)'
          }}
        />
        
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>
    </>
  );
}
