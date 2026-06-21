"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AvatarCharacter } from "./AvatarCharacter";

type AvatarState =
  | "idle"
  | "running"
  | "jumping"
  | "laughing"
  | "celebrating"
  | "waving";

type SectionId = "hero" | "about" | "experience" | "skills" | "projects" | "contact";

type SectionConfig = {
  bubble: string;
  state: AvatarState;
  scale: number;
  emojis: string[];
  /** xPos as 0-100 percent of viewport width (desktop) */
  xPos: number;
};

const SECTIONS: SectionId[] = ["hero", "about", "experience", "skills", "projects", "contact"];

const SECTION_CONFIG: Record<SectionId, SectionConfig> = {
  hero:       { bubble: "Hi, I'm Virat! 👋",      state: "waving",      scale: 1.1,  emojis: ["👋","✨","😊"],        xPos: 4  },
  about:      { bubble: "Here's my story 📖",      state: "idle",        scale: 1,    emojis: ["📖","💡","🎯"],        xPos: 18 },
  experience: { bubble: "Where I've worked 💼",    state: "idle",        scale: 1.05, emojis: ["💼","📈","🏢"],        xPos: 32 },
  skills:     { bubble: "Check my stack! 🚀",      state: "celebrating", scale: 1.2,  emojis: ["🎉","⭐","✨","🚀"],   xPos: 46 },
  projects:   { bubble: "Cool projects! 😄",       state: "laughing",    scale: 1.1,  emojis: ["😄","💯","🔥"],        xPos: 62 },
  contact:    { bubble: "Let's connect! 💬",       state: "jumping",     scale: 1.1,  emojis: ["💬","📧","🤝"],        xPos: 80 },
};

type ClickReaction = { state: AvatarState; bubble: string; emojis: string[]; scale: number };

const CLICK_REACTIONS: ClickReaction[] = [
  { state: "laughing",    bubble: "Haha, stop it! 😂",  emojis: ["😂","💀","🤣","😆"], scale: 1.2  },
  { state: "celebrating", bubble: "You found me! 🎉",   emojis: ["🎉","✨","⭐","🎊"], scale: 1.25 },
  { state: "jumping",     bubble: "Woohooo! 🚀",        emojis: ["🚀","💫","⚡","🔥"], scale: 1.15 },
  { state: "waving",      bubble: "Hey hey hey! 👋",    emojis: ["👋","😊","💛","✌️"], scale: 1.1  },
  { state: "laughing",    bubble: "That tickles! 😝",   emojis: ["😝","🤪","💥","😜"], scale: 1.2  },
  { state: "celebrating", bubble: "I'm a secret! 🤫",  emojis: ["🤫","👀","💎","🌟"], scale: 1.3  },
  { state: "jumping",     bubble: "Boing boing! 🐸",    emojis: ["🐸","💚","🌀","✨"], scale: 1.2  },
  { state: "laughing",    bubble: "You're funny! 😄",   emojis: ["😄","💯","👏","🔥"], scale: 1.15 },
];

type Particle = { id: number; x: number; y: number; emoji: string };

function getActiveSection(): SectionId {
  let current: SectionId = "hero";
  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
      current = id;
    }
  }
  return current;
}

/** Clamp a percent value so the avatar widget stays on screen */
function clampX(percentX: number, avatarWidthPx: number, viewportW: number): number {
  const maxPercent = ((viewportW - avatarWidthPx - 8) / viewportW) * 100;
  return Math.min(maxPercent, Math.max(1, percentX));
}

export function ScrollingAvatar() {
  const [avatarState, setAvatarState]     = useState<AvatarState>("waving");
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [xPos, setXPos]                   = useState(SECTION_CONFIG.hero.xPos);
  const [scale, setScale]                 = useState(SECTION_CONFIG.hero.scale);
  const [facingRight, setFacingRight]     = useState(true);
  const [isMobile, setIsMobile]           = useState(false);
  const [isScrolling, setIsScrolling]     = useState(false);
  /** 0-1 scroll progress through the full page */
  const [scrollProgress, setScrollProgress] = useState(0);

  const [clickReaction, setClickReaction] = useState<ClickReaction | null>(null);
  const [particles, setParticles]         = useState<Particle[]>([]);
  const [isClicked, setIsClicked]         = useState(false);
  const clickIndexRef    = useRef(0);
  const clickTimeoutRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleIdRef    = useRef(0);

  const lastScrollY      = useRef(0);
  const scrollTimeout    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeSectionRef = useRef<SectionId>("hero");

  // Walking step counter — increments every 140ms while scrolling for a step-tap effect
  const stepRef         = useRef(0);
  const stepIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [stepBounce, setStepBounce] = useState(0); // 0 or 1, alternates each step

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getAvatarWidth = useCallback(() => (isMobile ? 58 : 80), [isMobile]);

  const getSafeXPos = useCallback(
    (rawX: number) => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 390;
      return clampX(rawX, getAvatarWidth(), vw);
    },
    [getAvatarWidth]
  );

  const applySection = useCallback(
    (section: SectionId) => {
      const config = SECTION_CONFIG[section];
      activeSectionRef.current = section;
      setActiveSection(section);
      setAvatarState(config.state);
      setScale(config.scale);
      setXPos(getSafeXPos(config.xPos));
    },
    [getSafeXPos]
  );

  // Start/stop the walking step ticker
  const startStepTicker = useCallback(() => {
    if (stepIntervalRef.current) return;
    stepIntervalRef.current = setInterval(() => {
      stepRef.current += 1;
      setStepBounce(stepRef.current % 2);
    }, 140); // matches the 0.28s run cycle — one step per 140ms
  }, []);

  const stopStepTicker = useCallback(() => {
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    setStepBounce(0);
  }, []);

  // Derive bubble position from scroll progress:
  //   0.00–0.15 → right (hero at top)
  //   0.15–0.60 → center (mid journey)
  //   0.60–1.00 → left (bottom sections)
  const bubblePosition: "right" | "center" | "left" =
    scrollProgress < 0.15 ? "right" :
    scrollProgress < 0.60 ? "center" :
    "left";

  // On mobile, if avatar is past center viewport, always put bubble on left
  const effectiveBubblePosition: "right" | "center" | "left" =
    isMobile && xPos > 40 ? "left" : bubblePosition;

  const sectionConfig  = SECTION_CONFIG[activeSection];
  const displayState   = clickReaction ? clickReaction.state : avatarState;
  const displayScale   = clickReaction ? clickReaction.scale : scale;
  const displayBubble  = clickReaction ? clickReaction.bubble : sectionConfig.bubble;
  const displayEmojis  = clickReaction ? clickReaction.emojis : sectionConfig.emojis;

  const bubbleOnLeft  = effectiveBubblePosition === "left";
  const bubbleOnRight = effectiveBubblePosition === "right";

  const handleAvatarClick = useCallback(() => {
    const reaction = CLICK_REACTIONS[clickIndexRef.current % CLICK_REACTIONS.length];
    clickIndexRef.current += 1;

    setClickReaction(reaction);
    setIsClicked(true);

    const newParticles: Particle[] = reaction.emojis.map((emoji, i) => ({
      id: particleIdRef.current + i,
      x: (i - 1.5) * 22,
      y: 0,
      emoji,
    }));
    particleIdRef.current += reaction.emojis.length;
    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 900);

    setTimeout(() => setIsClicked(false), 150);

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => setClickReaction(null), 2200);
  }, []);

  useEffect(() => {
    applySection("hero");

    const handleScroll = () => {
      const currentY  = window.scrollY;
      const delta     = currentY - lastScrollY.current;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress  = docHeight > 0 ? Math.min(1, currentY / docHeight) : 0;

      setScrollProgress(progress);

      if (Math.abs(delta) > 2) {
        setIsScrolling(true);
        setAvatarState("running");
        setScale(0.9);
        setFacingRight(delta > 0);

        startStepTicker();

        // Map progress to xPos:
        // 0     → 4%   (far left — hero)
        // 1     → 80%  (far right — contact/last)
        const rawX = 4 + progress * 76;
        setXPos(getSafeXPos(rawX));
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        stopStepTicker();
        applySection(getActiveSection());
      }, 250);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once to init position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      stopStepTicker();
    };
  }, [isMobile, getSafeXPos, applySection, startStepTicker, stopStepTicker]);

  const mobileScaleFactor = isMobile ? 0.72 : 1;
  const effectiveScale    = displayScale * mobileScaleFactor;

  // Walking bounce: slight up on odd steps, neutral on even. Only active while running.
  const walkY = isScrolling && displayState === "running"
    ? stepBounce === 1 ? -5 : 0
    : undefined;

  return (
    <motion.div
      className="fixed bottom-4 z-40 select-none"
      style={{ bottom: "1rem" }}
      animate={{ left: `${xPos}%` }}
      transition={{
        left: isScrolling
          ? { type: "spring", stiffness: 80, damping: 22, mass: 0.8 }
          : { type: "spring", stiffness: 42, damping: 14 },
      }}
    >
      <div className="relative flex flex-col items-center">

        {/* ── Speech bubble ─────────────────────────────── */}
        <AnimatePresence mode="wait">
          {displayBubble && (
            <motion.div
              key={clickReaction ? `click-${clickIndexRef.current}` : `${activeSection}-${effectiveBubblePosition}`}
              className={[
                "absolute bg-card/95 border border-primary/40 rounded-xl px-2.5 py-1.5",
                "text-[10px] md:text-[11px] font-bold text-primary backdrop-blur-sm shadow-lg pointer-events-none whitespace-nowrap",
                bubbleOnLeft  ? "right-0" : "",
                bubbleOnRight ? "left-full ml-2" : "",
                !bubbleOnLeft && !bubbleOnRight ? "left-1/2 -translate-x-1/2" : "",
              ].join(" ")}
              style={{ top: isMobile ? "-2.75rem" : "-2.75rem" }}
              initial={{ opacity: 0, y: 8, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.88 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              {displayBubble}
              {/* tail */}
              <div
                className={[
                  "absolute -bottom-1.5 w-3 h-1.5 bg-card/95 border-b border-r border-primary/40 rotate-45 -mb-px",
                  bubbleOnLeft  ? "right-5" : "",
                  bubbleOnRight ? "left-3" : "",
                  !bubbleOnLeft && !bubbleOnRight ? "left-1/2 -translate-x-1/2" : "",
                ].join(" ")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Floating emojis ────────────────────────────── */}
        {!clickReaction && displayEmojis.map((emoji, i) => (
          <motion.span
            key={`${activeSection}-${emoji}-${i}`}
            className="absolute text-base pointer-events-none"
            style={{
              bottom: "100%",
              ...(bubbleOnLeft
                ? { right: `${6 + i * 15}px` }
                : bubbleOnRight
                ? { left: `${26 + i * 17}px` }
                : { left: `${-8 + i * 18}px` }),
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{
              y: [0, -26, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.3, 0.5],
              rotate: [0, i % 2 === 0 ? 14 : -14, 0],
            }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.28, ease: "easeInOut" }}
          >
            {emoji}
          </motion.span>
        ))}

        {/* ── Click particles ────────────────────────────── */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-lg pointer-events-none"
              style={{ bottom: "80%", left: "50%" }}
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{
                opacity: 0, scale: 1.6,
                x: p.x, y: -55 - Math.random() * 30,
                rotate: (Math.random() - 0.5) * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.2, 0.8, 0.4, 1] }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* ── Click ripple ───────────────────────────────── */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              key="ripple"
              className="absolute rounded-full border-2 border-primary pointer-events-none"
              style={{ width: 60, height: 60, top: "10%", left: "50%", x: "-50%" }}
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* ── Avatar body ────────────────────────────────── */}
        <motion.div
          className="cursor-pointer"
          onClick={handleAvatarClick}
          animate={{
            scaleX: isClicked ? 1.25 : facingRight ? 1 : -1,
            // While running: use the step ticker for a synchronized walk bounce
            y: walkY !== undefined
              ? walkY
              : displayState === "jumping"     ? [0, -22, -10, 0]
              : displayState === "celebrating" ? [0, -4, 0, -4, 0]
              : displayState === "waving"      ? [0, -2, 0]
              : 0,
            scaleY: displayState === "laughing" ? [1, 1.04, 0.97, 1.04, 1] : 1,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88, rotate: [-3, 3, -3, 0] }}
          transition={{
            scaleX: isClicked ? { duration: 0.1 } : { duration: 0.18 },
            y: walkY !== undefined
              ? { duration: 0.14, ease: "easeInOut" }
              : {
                  duration:
                    displayState === "jumping"  ? 0.6
                    : displayState === "waving" ? 1.2
                    : 0.35,
                  repeat:
                    displayState === "celebrating" || displayState === "jumping" || displayState === "waving"
                      ? Infinity
                      : 0,
                  ease: "easeInOut",
                },
            scaleY: { duration: 0.55, repeat: displayState === "laughing" ? Infinity : 0 },
          }}
        >
          <AvatarCharacter state={displayState} scale={effectiveScale} />
        </motion.div>

        {/* ── Ground shadow ──────────────────────────────── */}
        <motion.div
          className="rounded-full bg-black/20 blur-sm -mt-2 pointer-events-none"
          animate={{
            width:   displayState === "jumping" ? 28 : displayState === "running" ? 38 : 44,
            height:  displayState === "jumping" ? 6  : 9,
            opacity: displayState === "jumping" ? 0.3 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
