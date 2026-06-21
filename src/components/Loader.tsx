"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── particles (stable positions) ─────────────────────────────── */
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: (i * 17 + 7) % 100,
  y: (i * 23 + 11) % 100,
  size: 1 + (i % 3) * 0.6,
  duration: 2 + (i % 5) * 0.5,
  delay: (i % 8) * 0.25,
  color: i % 3 === 0 ? "hsl(38 90% 65%)" : i % 3 === 1 ? "hsl(350 75% 65%)" : "hsl(200 70% 65%)",
}));

const CODE = [
  { line: `const virat = new FrontendEngineer();`, color: "hsl(200 70% 65%)" },
  { line: `virat.skills = ["React","Next.js","TS"];`, color: "hsl(38 90% 65%)" },
  { line: `virat.experience = "2+ years";`, color: "hsl(350 75% 65%)" },
  { line: `virat.status = "open to work 🚀";`, color: "hsl(140 60% 55%)" },
  { line: `virat.portfolio.launch();`, color: "hsl(38 90% 65%)" },
];

const ORBIT1 = [0, 90, 180, 270];
const ORBIT2 = [45, 135, 225, 315];
const PROGRESS_TICKS = [0, 25, 50, 75, 100] as const;

const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  snap: [0.34, 1.2, 0.64, 1] as const,
};

// Phase timeline:
// "scanline"  → line travels top → center (1.3s)
// "hold"      → line pulses at center (~0.9s)
// "logoreveal"→ line zooms out (scales up) then fades, VS logo fades in (~1.4s)
// "zoomout"   → starfield zooms from 2.8x → 1x (background transition, ~1.8s)
// "content"   → full loading UI
// "exit"      → fade out
type Phase = "scanline" | "hold" | "logoreveal" | "zoomout" | "content" | "exit";

function useFitScale(active: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!active) return;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const available = window.innerHeight - 32;
      const needed = el.scrollHeight;
      setScale(needed > available ? available / needed : 1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return { ref, scale };
}

export function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("scanline");
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [activeTick, setActiveTick] = useState<number | null>(null);
  const [glitch, setGlitch] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const onDoneRef = useRef(onDone);
  const displayRef = useRef(0);
  const prevProgressRef = useRef(0);
  const { ref: contentRef, scale: contentScale } = useFitScale(phase === "content");

  onDoneRef.current = onDone;

  /* smooth count-up when progress target changes */
  useEffect(() => {
    const start = displayRef.current;
    const end = progress;
    if (start === end) return;
    prevProgressRef.current = start;

    let frame = 0;
    const startTime = performance.now();
    const duration = 650;

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - t) ** 3;
      const value = Math.round(start + (end - start) * eased);
      displayRef.current = value;
      setDisplayProgress(value);

      for (const tick of PROGRESS_TICKS) {
        if (prevProgressRef.current < tick && value >= tick) {
          setActiveTick(tick);
          break;
        }
      }
      prevProgressRef.current = value;

      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  useEffect(() => {
    if (phase !== "content") return;
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3200);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const timeline = [
      // line reaches center
      { time: 1400, action: () => setPhase("hold") },
      // hold / pulse for a moment, then trigger logo reveal
      { time: 2300, action: () => { setPhase("logoreveal"); } },
      // logo is visible, start starfield zoom-out behind it
      { time: 3000, action: () => { setLogoVisible(true); } },
      { time: 3500, action: () => setPhase("zoomout") },
      // zoom finishes, full content mounts
      { time: 5200, action: () => {
          setLogoVisible(false);
          setPhase("content");
          setActiveTick(0);
        }},
      { time: 5700, action: () => setProgress(25) },
      { time: 6500, action: () => setProgress(50) },
      { time: 7300, action: () => setProgress(75) },
      { time: 8100, action: () => setProgress(90) },
      { time: 8700, action: () => setProgress(100) },
      { time: 9500, action: () => setPhase("exit") },
      { time: 10500, action: () => onDoneRef.current() },
    ];

    const timers = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timers.forEach(clearTimeout);
  }, []);

  const showIntro = phase === "scanline" || phase === "hold" || phase === "logoreveal" || phase === "zoomout";

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
          style={{ background: "hsl(24 8% 3%)" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1, ease: EASE.inOut },
          }}
        >
          {/* ── INTRO: scan line + starfield ─────────────────── */}
          <AnimatePresence>
            {showIntro && (
              <motion.div
                key="intro-scene"
                className="absolute inset-0 will-change-transform"
                style={{ transformOrigin: "50% 50%" }}
                initial={{ opacity: 1, scale: 2.8 }}
                animate={{
                  opacity: phase === "zoomout" ? 0 : 1,
                  scale:
                    phase === "scanline" || phase === "hold" || phase === "logoreveal"
                      ? 2.8
                      : 1,
                }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                transition={{
                  scale: {
                    duration: phase === "zoomout" ? 1.85 : 0,
                    ease: EASE.smooth,
                  },
                  opacity: { duration: 0.5, ease: EASE.inOut },
                }}
              >
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
                  <defs>
                    <pattern id="loader-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M50 0L0 0 0 50" fill="none" stroke="hsl(38 90% 55%)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#loader-grid)" />
                </svg>

                {/* Scan line — only visible during scanline/hold, zooms out during logoreveal */}
                <AnimatePresence>
                  {(phase === "scanline" || phase === "hold" || phase === "logoreveal") && (
                    <motion.div
                      key="scanline"
                      className="absolute left-0 right-0 pointer-events-none z-10"
                      style={{
                        height: 2,
                        background:
                          "linear-gradient(90deg, transparent 2%, hsl(38 90% 55% / 0.95) 50%, transparent 98%)",
                        boxShadow: "0 0 14px hsl(38 90% 55% / 0.5), 0 0 40px hsl(38 90% 55% / 0.15)",
                        transformOrigin: "center",
                        top: "50%",
                      }}
                      initial={{ top: "0%", opacity: 0, scaleX: 0.2 }}
                      animate={
                        phase === "logoreveal"
                          ? {
                              opacity: 0,
                              scaleX: [1, 8, 20],
                              scaleY: [1, 0.3, 0],
                            }
                          : {
                              top: "50%",
                              opacity: 1,
                              scaleX: 1,
                              scaleY: phase === "hold" ? [1, 2, 1] : 1,
                            }
                      }
                      transition={
                        phase === "logoreveal"
                          ? {
                              scaleX: { duration: 0.7, ease: EASE.smooth },
                              scaleY: { duration: 0.7, ease: EASE.smooth },
                              opacity: { duration: 0.5, ease: EASE.inOut, delay: 0.3 },
                            }
                          : {
                              top: { duration: 1.3, ease: EASE.smooth },
                              opacity: { duration: 0.5 },
                              scaleX: { duration: 0.8, ease: EASE.out },
                              scaleY:
                                phase === "hold"
                                  ? { duration: 0.7, ease: EASE.inOut, repeat: Infinity, repeatDelay: 0.4 }
                                  : { duration: 0.3 },
                            }
                      }
                    />
                  )}
                </AnimatePresence>

                {PARTICLES.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: p.size,
                      height: p.size,
                      background: p.color,
                      boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                    animate={{
                      opacity: [0, 0.85, 0],
                      scale: [0, 1.6, 0],
                      y: [0, -20 - (p.id % 4) * 8, 0],
                    }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                <div
                  className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
                  style={{ background: "hsl(38 90% 55% / 0.07)", filter: "blur(120px)" }}
                />
                <div
                  className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
                  style={{ background: "hsl(350 75% 60% / 0.06)", filter: "blur(100px)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── LOGO REVEAL (line zooms out → VS logo appears) ── */}
          <AnimatePresence>
            {logoVisible && (
              <motion.div
                key="logo-reveal"
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE.smooth }}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 160,
                    height: 160,
                    background: "radial-gradient(circle, hsl(38 90% 55% / 0.25) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: [0.4, 1.4, 1.1], opacity: [0, 1, 0.6] }}
                  transition={{ duration: 1.0, ease: EASE.smooth }}
                />

                {/* VS Logo box */}
                <motion.div
                  className="relative flex items-center justify-center rounded-3xl"
                  style={{
                    width: 90,
                    height: 90,
                    background: "#0D0B09",
                    border: "2px solid hsl(38 90% 55% / 0.7)",
                    boxShadow:
                      "0 0 40px hsl(38 90% 55%/0.5), 0 0 100px hsl(38 90% 55%/0.2), inset 0 0 30px hsl(38 90% 55%/0.05)",
                  }}
                  initial={{ scale: 0, rotate: -15, opacity: 0 }}
                  animate={{ scale: [0, 1.18, 0.95, 1.05, 1], rotate: [-15, 5, -3, 1, 0], opacity: 1 }}
                  transition={{ duration: 1.1, ease: EASE.snap }}
                >
                  <span
                    className="text-4xl font-black tracking-[-3px]"
                    style={{
                      background: "linear-gradient(135deg,#FDE68A 0%,#F59E0B 55%,#D97706 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    VS
                  </span>
                  <span
                    className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full"
                    style={{ background: "#F59E0B", boxShadow: "0 0 10px #F59E0B" }}
                  />
                </motion.div>

                {/* Name label */}
                <motion.p
                  className="absolute text-sm font-bold tracking-[0.2em] uppercase"
                  style={{
                    color: "hsl(38 90% 65%)",
                    top: "calc(50% + 60px)",
                    letterSpacing: "0.25em",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: EASE.smooth }}
                >
                  Virat Sathavara
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FULL LOADER (matches video frame at ~5s) ─────── */}
          <AnimatePresence>
            {phase === "content" && (
              <motion.div
                key="loader-content-wrap"
                className="absolute inset-0 flex items-center justify-center px-3 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE.smooth }}
              >
                {/* corner brackets */}
                {[
                  "top-3 left-3 sm:top-4 sm:left-4 border-t border-l",
                  "top-3 right-3 sm:top-4 sm:right-4 border-t border-r",
                  "bottom-3 left-3 sm:bottom-4 sm:left-4 border-b border-l",
                  "bottom-3 right-3 sm:bottom-4 sm:right-4 border-b border-r",
                ].map((cls, i) => (
                  <motion.div
                    key={cls}
                    className={`fixed w-6 h-6 sm:w-8 sm:h-8 border-primary/40 ${cls}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                  />
                ))}

                <motion.div
                  ref={contentRef}
                  className="flex flex-col items-center gap-3 sm:gap-5 w-full max-w-md origin-center"
                  style={{ scale: contentScale }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE.smooth }}
                >
                  {/* logo */}
                  <div className="relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32">
                    <motion.div
                      className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-primary/10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    >
                      {ORBIT1.map((deg, i) => (
                        <span
                          key={i}
                          className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/50"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: `rotate(${deg}deg) translateX(46px) translate(-50%,-50%)`,
                          }}
                        />
                      ))}
                    </motion.div>

                    <motion.div
                      className="absolute w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 rounded-full border border-accent/15"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      {ORBIT2.map((deg, i) => (
                        <span
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-accent/60"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: `rotate(${deg}deg) translateX(34px) translate(-50%,-50%)`,
                          }}
                        />
                      ))}
                    </motion.div>

                    <div
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "#0D0B09",
                        border: "1.5px solid hsl(38 90% 55% / 0.5)",
                        boxShadow: "0 0 30px hsl(38 90% 55%/0.35), 0 0 80px hsl(38 90% 55%/0.12)",
                      }}
                    >
                      {glitch && (
                        <>
                          <span className="absolute text-xl sm:text-2xl font-black text-[#61DAFB] left-2 blur-[1px]">VS</span>
                          <span className="absolute text-xl sm:text-2xl font-black text-[#F87171] left-3 blur-[1px]">VS</span>
                        </>
                      )}
                      <span
                        className="relative text-xl sm:text-2xl font-black tracking-[-2px]"
                        style={{
                          background: "linear-gradient(135deg,#FDE68A 0%,#F59E0B 55%,#D97706 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        VS
                      </span>
                      <span
                        className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{ background: "#F59E0B", boxShadow: "0 0 8px #F59E0B" }}
                      />
                    </div>
                  </div>

                  {/* name + title */}
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h2
                      className="text-xl sm:text-3xl font-extrabold tracking-[-0.03em]"
                      style={{
                        background: "linear-gradient(135deg,#fff 0%,#F59E0B 50%,#fff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Virat Sathavara
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] sm:text-xs text-muted font-light tracking-[0.15em] uppercase">
                        Frontend Engineer
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    </div>
                  </div>

                  {/* terminal */}
                  <div
                    className="w-full rounded-xl overflow-hidden border border-border/50"
                    style={{ background: "hsl(24 8% 6%)" }}
                  >
                    <div
                      className="flex items-center gap-1.5 px-3 sm:px-4 py-2 border-b border-border/40"
                      style={{ background: "hsl(24 8% 4%)" }}
                    >
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28C840]" />
                      <span className="text-[9px] sm:text-[10px] text-muted/50 ml-1 sm:ml-2 font-mono truncate">
                        ~/portfolio/src/index.ts
                      </span>
                    </div>
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 space-y-1 font-mono">
                      {CODE.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[9px] sm:text-[10px] text-muted/30 w-3 sm:w-4 text-right shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-[10px] sm:text-[11px] leading-relaxed break-all" style={{ color: item.color }}>
                            {item.line}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] sm:text-[10px] text-muted/30 w-3 sm:w-4 text-right shrink-0">6</span>
                        <span className="text-[10px] sm:text-[11px] text-muted/40">// </span>
                        <motion.span
                          className="inline-block w-[6px] h-3 sm:w-[7px] sm:h-[14px] rounded-sm bg-primary"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* progress */}
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1 h-1 rounded-full bg-primary"
                            animate={{ scale: [1, 1.6, 1], opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.18 }}
                          />
                        ))}
                        <span className="text-[9px] sm:text-[10px] text-muted ml-0.5 tracking-wider uppercase">
                          Launching
                        </span>
                      </div>
                      <motion.span
                        key={displayProgress}
                        className="text-xs sm:text-sm font-bold tabular-nums"
                        style={{ color: "hsl(38 90% 55%)" }}
                        initial={{ opacity: 0.6, y: 2, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, ease: EASE.out }}
                      >
                        {displayProgress}%
                      </motion.span>
                    </div>

                    <div className="relative h-1.5 sm:h-2 w-full bg-secondary rounded-full overflow-visible">
                      {/* tick dots on bar */}
                      {PROGRESS_TICKS.map((tick) => {
                        const reached = displayProgress >= tick;
                        return (
                          <motion.span
                            key={`dot-${tick}`}
                            className="absolute top-1/2 z-10 rounded-full bg-background border"
                            style={{
                              left: `${tick}%`,
                              width: 6,
                              height: 6,
                              x: "-50%",
                              y: "-50%",
                            }}
                            animate={{
                              scale: reached ? (activeTick === tick ? [1, 1.5, 1] : 1) : 0.6,
                              borderColor: reached ? "hsl(38 90% 55%)" : "hsl(30 10% 35%)",
                              backgroundColor: reached ? "hsl(38 90% 55%)" : "hsl(24 8% 8%)",
                              boxShadow: reached
                                ? "0 0 8px hsl(38 90% 55% / 0.6)"
                                : "0 0 0 transparent",
                            }}
                            transition={{
                              scale: activeTick === tick
                                ? { duration: 0.45, ease: EASE.out }
                                : { duration: 0.3 },
                              borderColor: { duration: 0.3 },
                              backgroundColor: { duration: 0.3 },
                              boxShadow: { duration: 0.3 },
                            }}
                          />
                        );
                      })}

                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(90deg,hsl(38 90% 45%),hsl(38 90% 65%),hsl(350 75% 60%))",
                        }}
                        animate={{ width: `${displayProgress}%` }}
                        transition={{ duration: 0.65, ease: EASE.smooth }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)",
                          }}
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </div>

                    <div className="flex justify-between mt-1.5 px-0.5">
                      {PROGRESS_TICKS.map((tick) => {
                        const reached = displayProgress >= tick;
                        return (
                          <motion.span
                            key={`label-${tick}`}
                            className="text-[8px] sm:text-[9px] tabular-nums font-medium"
                            initial={{ opacity: 0.3, scale: 0.85 }}
                            animate={{
                              opacity: reached ? 1 : 0.35,
                              scale: reached && activeTick === tick ? [0.85, 1.15, 1] : reached ? 1 : 0.85,
                              color: reached ? "hsl(38 90% 55%)" : "hsl(30 10% 30%)",
                            }}
                            transition={{
                              duration: activeTick === tick ? 0.4 : 0.25,
                              ease: EASE.snap,
                            }}
                          >
                            {tick}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>

                  {/* tech badges */}
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {["React.js", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] sm:text-[10px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-primary/25 text-primary/80"
                        style={{ background: "hsl(38 90% 55% / 0.06)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* url */}
                  <div className="flex items-center gap-2 pb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[9px] sm:text-[10px] text-muted/50 font-mono tracking-[0.15em]">
                      viratsathavara.in
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
