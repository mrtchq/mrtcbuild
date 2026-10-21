import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  trigger: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  g: number;
  s: number;
  r: number;
  vr: number;
  color: string;
  life: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (trigger === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ffd159', '#00e5ff', '#ec4899', '#10b981', '#9333ea', '#f97316'];
    const parts: Particle[] = Array.from({ length: 140 }, () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 220,
      y: window.innerHeight * 0.42,
      vx: (Math.random() - 0.5) * 11,
      vy: -(Math.random() * 9 + 4),
      g: 0.28 + Math.random() * 0.12,
      s: Math.random() * 7 + 3,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }));

    let frames = 0;
    let animId: number;

    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.r += p.vr;
        p.life -= 0.006;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62);
        ctx.restore();
      });

      if (++frames < 150) {
        animId = requestAnimationFrame(anim);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    anim();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [trigger]);

  return <canvas id="confettiCanvas" ref={canvasRef} aria-hidden="true" />;
};
