import React, { useEffect, useRef } from 'react';
import { AccentColor } from '../types';
import { TINTS } from '../utils/constants';

interface NeuralBackgroundProps {
  anim: boolean;
  parallax: boolean;
  currentAccent: AccentColor;
  warpTrigger: number;
}

interface SynapticNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: { r: number; g: number; b: number; hex: string };
  phase: number;
  pulseSpeed: number;
}

interface ActionPotential {
  from: SynapticNode;
  to: SynapticNode;
  progress: number;
  speed: number;
}

interface SynapticRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: { r: number; g: number; b: number };
}

const BRAND_COLORS = [
  { r: 255, g: 209, b: 89, hex: '#ffd159' },
  { r: 0, g: 229, b: 255, hex: '#00e5ff' },
  { r: 236, g: 72, b: 153, hex: '#ec4899' },
  { r: 168, g: 85, b: 247, hex: '#a855f7' },
  { r: 16, g: 185, b: 129, hex: '#10b981' },
  { r: 249, g: 115, b: 22, hex: '#f97316' },
];

function generateBoxShadowStars(n: number, maxCoord: number, palette: string[]) {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * maxCoord);
    const y = Math.floor(Math.random() * maxCoord);
    out.push(`${x}px ${y}px ${palette[Math.floor(Math.random() * palette.length)]}`);
  }
  return out.join(', ');
}

export const NeuralBackground: React.FC<NeuralBackgroundProps> = ({
  anim,
  parallax,
  currentAccent,
  warpTrigger,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const bgLayersRef = useRef<HTMLDivElement | null>(null);
  const warpFlashRef = useRef<HTMLDivElement | null>(null);

  const starStyleRef = useRef<{ s1: string; s2: string; s3: string }>({ s1: '', s2: '', s3: '' });
  const warpMultiRef = useRef(1);
  const targetWarpMultiRef = useRef(1);

  // Generate starfields once
  useEffect(() => {
    const small = generateBoxShadowStars(420, 2000, ['#ffffff', '#fff9c4', '#ffd54f']);
    const med = generateBoxShadowStars(130, 2000, ['#ffffff', '#ffd159', '#00e5ff', '#ec4899']);
    const big = generateBoxShadowStars(55, 2000, ['#ffd159', '#f5b82e', '#9333ea', '#ec4899', '#00e5ff', '#10b981']);
    starStyleRef.current = { s1: small, s2: med, s3: big };

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      #stars:after { box-shadow: ${small}; }
      #stars2:after { box-shadow: ${med}; }
      #stars3:after { box-shadow: ${big}; }
    `;
    document.head.appendChild(styleEl);

    return () => {
      styleEl.remove();
    };
  }, []);

  // Warp reaction
  useEffect(() => {
    if (warpTrigger === 0 || !anim) return;
    targetWarpMultiRef.current = 14;
    document.body.classList.add('warp-speed');

    if (warpFlashRef.current) {
      warpFlashRef.current.style.opacity = '0.6';
      setTimeout(() => {
        if (warpFlashRef.current) warpFlashRef.current.style.opacity = '0';
      }, 300);
    }

    const t1 = setTimeout(() => {
      targetWarpMultiRef.current = 1;
    }, 420);
    const t2 = setTimeout(() => {
      document.body.classList.remove('warp-speed');
    }, 650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.classList.remove('warp-speed');
    };
  }, [warpTrigger, anim]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const nodeCount = Math.max(16, Math.min(58, Math.floor((window.innerWidth * window.innerHeight) / 22000)));
    const nodes: SynapticNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const actionPotentials: ActionPotential[] = [];
    const ripples: SynapticRipple[] = [];

    const handleClick = (e: MouseEvent) => {
      const hex = TINTS[currentAccent]?.[0] || '#ffd159';
      const r = parseInt(hex.slice(1, 3), 16) || 255;
      const g = parseInt(hex.slice(3, 5), 16) || 209;
      const b = parseInt(hex.slice(5, 7), 16) || 89;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 190,
        opacity: 0.75,
        color: { r, g, b },
      });
    };
    window.addEventListener('click', handleClick);

    const render = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      warpMultiRef.current += (targetWarpMultiRef.current - warpMultiRef.current) * 0.08;
      if (Math.abs(warpMultiRef.current - 1) < 0.05) warpMultiRef.current = 1;
      const warp = warpMultiRef.current;

      // Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 5.5;
        rip.opacity -= 0.024;
        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rip.color.r},${rip.color.g},${rip.color.b},${rip.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Synapses & Nodes
      const connectDist = 130;
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx * warp;
        p.y += p.vy * warp;
        p.phase += p.pulseSpeed;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            if (Math.random() < 0.002 && actionPotentials.length < 12) {
              actionPotentials.push({ from: p, to: p2, progress: 0, speed: 0.04 });
            }
          }
        }

        const pulse = 1 + Math.sin(p.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color.hex;
        ctx.fill();
      }

      // Action Potentials
      for (let a = actionPotentials.length - 1; a >= 0; a--) {
        const ap = actionPotentials[a];
        ap.progress += ap.speed;
        if (ap.progress >= 1) {
          actionPotentials.splice(a, 1);
          continue;
        }
        const curX = ap.from.x + (ap.to.x - ap.from.x) * ap.progress;
        const curY = ap.from.y + (ap.to.y - ap.from.y) * ap.progress;
        ctx.beginPath();
        ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      if (anim) {
        animId = requestAnimationFrame(render);
      }
    };

    if (anim) {
      animId = requestAnimationFrame(render);
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, [anim, currentAccent]);

  // Pointer cursor glow
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) {
      glow.style.display = 'none';
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;

      if (parallax && bgLayersRef.current) {
        const px = -((e.clientX / window.innerWidth) * 2 - 1) * 12;
        const py = -((e.clientY / window.innerHeight) * 2 - 1) * 9;
        bgLayersRef.current.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [parallax]);

  return (
    <>
      <div id="bgLayers" ref={bgLayersRef} aria-hidden="true">
        <div className="nebula-glow" />
        <div className="nebula-tint" />
        <div id="stars" style={{ boxShadow: starStyleRef.current.s1 }} />
        <div id="stars2" style={{ boxShadow: starStyleRef.current.s2 }} />
        <div id="stars3" style={{ boxShadow: starStyleRef.current.s3 }} />
      </div>

      <canvas id="neuralCanvas" ref={canvasRef} aria-hidden="true" />
      <div id="warpFlashOverlay" ref={warpFlashRef} aria-hidden="true" />
      <div id="cursorGlow" ref={glowRef} aria-hidden="true" />
    </>
  );
};
