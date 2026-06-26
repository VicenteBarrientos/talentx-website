"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -400, y: -400 });
  const current = useRef({ x: -400, y: -400 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerp = 0.07;
      current.current.x += (pos.current.x - current.current.x) * lerp;
      current.current.y += (pos.current.y - current.current.y) * lerp;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 300}px, ${current.current.y - 300}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden dark:block"
    >
      <div
        ref={glowRef}
        className="absolute h-[600px] w-[600px] rounded-full bg-cyan-500/[0.07] blur-[80px] will-change-transform"
      />
    </div>
  );
}
