"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── particles ───────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 2,
  color: i % 3 === 0 ? "hsl(38 90% 65%)" : i % 3 === 1 ? "hsl(350 75% 65%)" : "hsl(200 70% 65%)",
}));

/* ── code lines ──────────────────────────────────────────────── */
const CODE = [
  { line: `const virat = new FrontendEngineer();`,  delay: 0.2, color: "hsl(200 70% 65%)" },
  { line: `virat.skills = ["React","Next.js","TS"];`, delay: 0.6, color: "hsl(38 90% 65%)" },
  { line: `virat.experience = "2+ years";`,          delay: 1.0, color: "hsl(350 75% 65%)" },
  { line: `virat.status = "open to work 🚀";`,       delay: 1.4, color: "hsl(140 60% 55%)" },
  { line: `virat.portfolio.launch();`,               delay: 1.8, color: "hsl(38 90% 65%)" },
];

const ORBIT1 = [0, 90, 180, 270];
const ORBIT2 = [45, 135, 225, 315];
const NAME = "Virat Sathavara".split("");

/* ── easing curves ─────────────────────────────────────────────── */
const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  snap: [0.34, 1.2, 0.64, 1] as const,
};

type Phase = "scanline" | "hold" | "zoomout" | "content" | "exit";

export function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("scanline");
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const onDoneRef = useRef(onDone);

  onDoneRef.current = onDone;

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeline = [
      /* scan line travels ~1.4s, then holds at center */
      { time: 1400, action: () => setPhase("hold") },
      /* brief pause — line pulses, then zoom begins */
      { time: 2200, action: () => setPhase("zoomout") },
      /* zoom finishes, content fades in */
      { time: 3900, action: () => setPhase("content") },
      /* progress creeps smoothly */
      { time: 4400, action: () => setProgress(18) },
      { time: 5200, action: () => setProgress(42) },
      { time: 6000, action: () => setProgress(68) },
      { time: 6800, action: () => setProgress(88) },
      { time: 7400, action: () => setProgress(100) },
      /* hold at 100% briefly */
      { time: 8000, action: () => setPhase("exit") },
      { time: 9200, action: () => onDoneRef.current() },
    ];

    const timers = timeline.map(({ time, action }) => setTimeout(action, time));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: "hsl(24 8% 3%)" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(16px)",
            scale: 1.04,
            transition: { duration: 1.1, ease: EASE.inOut },
          }}
        >

          {/* ── ZOOMABLE SCENE (scan line + starfield) ──────── */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ transformOrigin: "50% 50%" }}
            animate={{
              scale: phase === "scanline" || phase === "hold" ? 2.8 : 1,
              filter:
                phase === "zoomout"
                  ? ["blur(4px)", "blur(0px)"]
                  : "blur(0px)",
            }}
            transition={{
              scale: {
                duration: phase === "zoomout" ? 1.65 : 0,
                ease: EASE.smooth,
              },
              filter: { duration: 1.65, ease: EASE.inOut },
            }}
          >
            {/* ── GRID ───────────────────────────────────────── */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
              <defs>
                <pattern id="g" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M50 0L0 0 0 50" fill="none" stroke="hsl(38 90% 55%)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>

            {/* ── SCAN LINE (top → center → hold → fade) ───── */}
            <motion.div
              className="absolute left-0 right-0 pointer-events-none z-10"
              style={{
                height: 2,
                background: "linear-gradient(90deg, transparent 2%, hsl(38 90% 55% / 0.95) 50%, transparent 98%)",
                transformOrigin: "center",
              }}
              initial={{ top: "0%", opacity: 0, scaleX: 0.15 }}
              animate={{
                top: "50%",
                opacity: phase === "content" ? 0 : 1,
                scaleX: 1,
                scaleY: phase === "hold" ? [1, 2.2, 1] : 1,
                boxShadow:
                  phase === "hold"
                    ? [
                        "0 0 14px hsl(38 90% 55% / 0.45), 0 0 36px hsl(38 90% 55% / 0.12)",
                        "0 0 28px hsl(38 90% 55% / 0.85), 0 0 80px hsl(38 90% 55% / 0.35)",
                        "0 0 14px hsl(38 90% 55% / 0.45), 0 0 36px hsl(38 90% 55% / 0.12)",
                      ]
                    : "0 0 14px hsl(38 90% 55% / 0.5), 0 0 40px hsl(38 90% 55% / 0.15)",
              }}
              transition={{
                top: { duration: 1.35, ease: EASE.smooth },
                opacity: { duration: 0.9, ease: EASE.inOut, delay: phase === "content" ? 0.15 : 0 },
                scaleX: { duration: 0.9, ease: EASE.out },
                scaleY: phase === "hold"
                  ? { duration: 0.75, ease: EASE.inOut, repeat: Infinity, repeatDelay: 0.35 }
                  : { duration: 0.4 },
                boxShadow: phase === "hold"
                  ? { duration: 0.75, ease: EASE.inOut, repeat: Infinity, repeatDelay: 0.35 }
                  : { duration: 0.5 },
              }}
            />

            {/* center impact bloom on hold */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9]"
              style={{
                width: 120,
                height: 120,
                background: "radial-gradient(circle, hsl(38 90% 55% / 0.25) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{
                opacity: phase === "hold" ? [0, 0.7, 0.35] : phase === "zoomout" ? 0.15 : 0,
                scale: phase === "hold" ? [0.2, 1.4, 1] : phase === "zoomout" ? 2.5 : 0.2,
              }}
              transition={{
                duration: phase === "hold" ? 0.8 : 1.2,
                ease: EASE.smooth,
              }}
            />

            {/* ── PARTICLES ──────────────────────────────────── */}
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${p.x}%`, top: `${p.y}%`,
                  width: p.size, height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0, 1.8, 0],
                  y: [0, -(30 + (p.id % 5) * 10), 0],
                  x: [0, ((p.id % 7) - 3) * 4, 0],
                }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {/* ── AMBIENT GLOWS ──────────────────────────────── */}
            <motion.div
              className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
              style={{ background: "hsl(38 90% 55% / 0.07)", filter: "blur(120px)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{ background: "hsl(350 75% 60% / 0.06)", filter: "blur(100px)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>

          {/* ── FULL LOADER CONTENT (crossfades in during zoom tail) ── */}
          <AnimatePresence>
            {(phase === "zoomout" || phase === "content") && (
          <motion.div
            className="relative flex flex-col items-center gap-6 px-6 max-w-md w-full z-20"
            initial={{ opacity: 0, y: 48, scale: 0.88, filter: "blur(12px)" }}
            animate={{
              opacity: phase === "content" ? 1 : 0,
              y: phase === "content" ? 0 : 24,
              scale: phase === "content" ? 1 : 0.94,
              filter: phase === "content" ? "blur(0px)" : "blur(10px)",
            }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{
              duration: 1.15,
              ease: EASE.smooth,
              opacity: { duration: 1.1, ease: EASE.inOut },
              filter: { duration: 1.2, ease: EASE.out },
            }}
          >

          {/* ── CORNER BRACKETS ──────────────────────────────── */}
          {[
            "top-4 left-4 border-t border-l",
            "top-4 right-4 border-t border-r",
            "bottom-4 left-4 border-b border-l",
            "bottom-4 right-4 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`fixed w-8 h-8 border-primary/40 ${cls}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: phase === "content" ? 1 : 0, scale: phase === "content" ? 1 : 0.6 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.65, ease: EASE.snap }}
            />
          ))}

            {/* ── LOGO SYSTEM ──────────────────────────────── */}
            <motion.div
              className="relative flex items-center justify-center w-32 h-32"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{
                opacity: phase === "content" ? 1 : 0,
                scale: phase === "content" ? 1 : 0.75,
                rotate: phase === "content" ? 0 : -8,
              }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE.snap }}
            >

              {/* outermost ring */}
              <motion.div
                className="absolute w-32 h-32 rounded-full border border-primary/10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                {ORBIT1.map((deg, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
                    style={{
                      top: "50%", left: "50%",
                      transform: `rotate(${deg}deg) translateX(62px) translate(-50%,-50%)`,
                    }}
                    animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
                  />
                ))}
              </motion.div>

              {/* middle ring */}
              <motion.div
                className="absolute w-24 h-24 rounded-full border border-accent/15"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {ORBIT2.map((deg, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent/60"
                    style={{
                      top: "50%", left: "50%",
                      transform: `rotate(${deg}deg) translateX(46px) translate(-50%,-50%)`,
                    }}
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>

              {/* badge core */}
              <motion.div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "#0D0B09",
                  border: "1.5px solid hsl(38 90% 55% / 0.5)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(38 90% 55%/0.3), 0 0 60px hsl(38 90% 55%/0.1)",
                    "0 0 40px hsl(38 90% 55%/0.6), 0 0 100px hsl(38 90% 55%/0.25)",
                    "0 0 20px hsl(38 90% 55%/0.3), 0 0 60px hsl(38 90% 55%/0.1)",
                  ],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 35%, hsl(38 90% 55%/0.25) 0%, transparent 65%)",
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* glitch effect */}
                {glitch && (
                  <>
                    <motion.span
                      className="absolute text-2xl font-black"
                      style={{ color: "#61DAFB", left: 10, filter: "blur(1px)" }}
                    >VS</motion.span>
                    <motion.span
                      className="absolute text-2xl font-black"
                      style={{ color: "#F87171", left: 14, filter: "blur(1px)" }}
                    >VS</motion.span>
                  </>
                )}
                <span
                  className="relative text-2xl font-black tracking-[-2px]"
                  style={{
                    background: "linear-gradient(135deg,#FDE68A 0%,#F59E0B 55%,#D97706 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: glitch ? "transparent" : "transparent",
                    backgroundClip: "text",
                  }}
                >VS</span>
                <span
                  className="absolute bottom-2 right-2 w-2 h-2 rounded-full"
                  style={{ background: "#F59E0B", boxShadow: "0 0 8px #F59E0B" }}
                />
              </motion.div>
            </motion.div>

            {/* ── NAME WITH LETTER ANIMATION ───────────────── */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex overflow-hidden">
                {NAME.map((ch, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl md:text-3xl font-extrabold tracking-[-0.03em]"
                    style={{
                      background: "linear-gradient(135deg,#fff 0%,#F59E0B 50%,#fff 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "shimmer 3s linear infinite",
                      display: ch === " " ? "inline-block" : undefined,
                      width: ch === " " ? "0.4em" : undefined,
                    }}
                    initial={{ opacity: 0, y: 36, rotateX: -90 }}
                    animate={phase === "content" ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 36, rotateX: -90 }}
                    transition={{
                      delay: 0.25 + i * 0.055,
                      duration: 0.55,
                      ease: EASE.smooth,
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: 0.85, duration: 0.65, ease: EASE.out }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <span className="text-xs text-muted font-light tracking-[0.15em] uppercase">
                  Frontend Engineer
                </span>
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.7 }}
                />
              </motion.div>
            </div>

            {/* ── CODE TERMINAL ────────────────────────────── */}
            <motion.div
              className="w-full rounded-xl overflow-hidden border border-border/50"
              style={{ background: "hsl(24 8% 6%)" }}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={phase === "content" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
              transition={{ delay: 0.35, duration: 0.75, ease: EASE.smooth }}
            >
              {/* title bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/40"
                style={{ background: "hsl(24 8% 4%)" }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="text-[10px] text-muted/50 ml-2 font-mono">~/portfolio/src/index.ts</span>
              </div>

              {/* code lines */}
              <div className="px-4 py-3 space-y-1.5 font-mono">
                {CODE.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0, x: -16 }}
                    animate={phase === "content" ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                    transition={{ delay: 0.5 + item.delay, duration: 0.55, ease: EASE.out }}
                  >
                    <span className="text-[10px] text-muted/30 w-4 text-right shrink-0">
                      {i + 1}
                    </span>
                    <motion.span
                      className="text-[11px] leading-relaxed"
                      style={{ color: item.color }}
                    >
                      {item.line}
                    </motion.span>
                  </motion.div>
                ))}

                {/* blinking cursor line */}
                <motion.div
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9 }}
                >
                  <span className="text-[10px] text-muted/30 w-4 text-right shrink-0">6</span>
                  <span className="text-[11px] text-muted/40">// </span>
                  <motion.span
                    className="inline-block w-[7px] h-[14px] rounded-sm bg-primary"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* ── PROGRESS ─────────────────────────────────── */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.45, duration: 0.7, ease: EASE.out }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-primary"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                  <span className="text-[10px] text-muted ml-1 tracking-wider uppercase">
                    Launching
                  </span>
                </div>
                <motion.span
                  key={progress}
                  className="text-sm font-bold tabular-nums"
                  style={{ color: "hsl(38 90% 55%)" }}
                  initial={{ opacity: 0.5, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  {progress}%
                </motion.span>
              </div>

              {/* bar track */}
              <div className="relative h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg,hsl(38 90% 45%),hsl(38 90% 65%),hsl(350 75% 60%))",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 35, damping: 22, mass: 1.1 }}
                >
                  {/* shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  />
                  {/* glow tip */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 10px hsl(38 90% 55%), 0 0 20px hsl(38 90% 55%/0.5)" }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* tick marks */}
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map((tick) => (
                  <motion.span
                    key={tick}
                    className="text-[9px] tabular-nums"
                    style={{ color: progress >= tick ? "hsl(38 90% 55%)" : "hsl(30 10% 30%)" }}
                    animate={{ opacity: progress >= tick ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tick}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* ── TECH STACK BADGES ────────────────────────── */}
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 14 }}
              animate={phase === "content" ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.7, duration: 0.75, ease: EASE.smooth }}
            >
              {["React.js", "Next.js", "TypeScript", "Tailwind"].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/25 text-primary/80"
                  style={{ background: "hsl(38 90% 55% / 0.06)" }}
                  initial={{ opacity: 0, scale: 0.6, y: 8 }}
                  animate={phase === "content" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 8 }}
                  transition={{ delay: 0.85 + i * 0.1, duration: 0.55, ease: EASE.snap }}
                  whileHover={{ scale: 1.1, borderColor: "hsl(38 90% 55% / 0.6)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>

          {/* ── URL BAR ──────────────────────────────────────── */}
          {(phase === "zoomout" || phase === "content") && (
          <motion.div
            className="absolute bottom-6 flex items-center gap-2 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === "content" ? 1 : 0, y: phase === "content" ? 0 : 10 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE.out }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[10px] text-muted/50 font-mono tracking-[0.15em]">
              viratsathavara.in
            </span>
          </motion.div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
