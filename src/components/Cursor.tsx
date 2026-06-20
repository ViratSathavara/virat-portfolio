"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ringX = 0,
      ringY = 0;
    let dotX = 0,
      dotY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const loop = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add("scale-[3]", "bg-primary/40");
      ringRef.current?.classList.add("scale-[2.5]", "border-primary");
    };
    const onLeaveLink = () => {
      dotRef.current?.classList.remove("scale-[3]", "bg-primary/40");
      ringRef.current?.classList.remove("scale-[2.5]", "border-primary");
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] transition-transform duration-150"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/40 pointer-events-none z-[9998] transition-[transform,border-color] duration-150"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
