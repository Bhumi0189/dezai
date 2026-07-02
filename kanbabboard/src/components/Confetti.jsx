import { useEffect, useRef } from "react";

export default function Confetti({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const palette = [
      "#7C3AED",
      "#58A6FF",
      "#3FB950",
      "#F0883E",
      "#D29922",
      "#F85149",
      "#06B6D4",
      "#EC4899",
    ];

    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 80,
      vx: (Math.random() - 0.5) * 5,
      vy: 2.5 + Math.random() * 4,
      size: 5 + Math.random() * 9,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.18,
      color: palette[Math.floor(Math.random() * palette.length)],
      rect: Math.random() > 0.45,
    }));

    let raf;
    let tick = 0;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      tick += 1;
      const alpha = Math.max(0, 1 - tick / 100);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.rot += p.vr;

        context.save();
        context.globalAlpha = alpha;
        context.translate(p.x, p.y);
        context.rotate(p.rot);
        context.fillStyle = p.color;

        if (p.rect) {
          context.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          context.beginPath();
          context.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          context.fill();
        }

        context.restore();
      });

      if (tick < 120) {
        raf = requestAnimationFrame(animate);
      } else {
        onDone();
      }
    };

    raf = requestAnimationFrame(animate);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
