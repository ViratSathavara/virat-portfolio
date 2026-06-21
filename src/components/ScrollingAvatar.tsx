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
  xPos: number;
};

const SECTIONS: SectionId[] = ["hero", "about", "experience", "skills", "projects", "contact"];

const SECTION_CONFIG: Record<SectionId, SectionConfig> = {
  hero: {
    bubble: "Hi, I'm Virat! 👋",
    state: "waving",
    scale: 1.1,
    emojis: ["👋", "✨", "😊"],
    xPos: 6,
  },
  about: {
    bubble: "Here's my story 📖",
    state: "idle",
    scale: 1,
    emojis: ["📖", "💡", "🎯"],
    xPos: 18,
  },
  experience: {
    bubble: "Where I've worked 💼",
    state: "idle",
    scale: 1.05,
    emojis: ["💼", "📈", "🏢"],
    xPos: 32,
  },
  skills: {
    bubble: "Check my stack! 🚀",
    state: "celebrating",
    scale: 1.2,
    emojis: ["🎉", "⭐", "✨", "🚀"],
    xPos: 46,
  },
  projects: {
    bubble: "Cool projects! 😄",
    state: "laughing",
    scale: 1.1,
    emojis: ["😄", "💯", "🔥"],
    xPos: 60,
  },
  contact: {
    bubble: "Let's connect! 💬",
    state: "jumping",
    scale: 1.1,
    emojis: ["💬", "📧", "🤝"],
    xPos: 74,
  },
};

type ClickReaction = {
  state: AvatarState;
  bubble: string;
  emojis: string[];
  scale: number;
};

const CLICK_REACTIONS: ClickReaction[] = [
  { state: "laughing", bubble: "Haha, stop it! 😂", emojis: ["😂", "💀", "🤣", "😆"], scale: 1.2 },
  { state: "celebrating", bubble: "You found me! 🎉", emojis: ["🎉", "✨", "⭐", "🎊"], scale: 1.25 },
  { state: "jumping", bubble: "Woohooo! 🚀", emojis: ["🚀", "💫", "⚡", "🔥"], scale: 1.15 },
  { state: "waving", bubble: "Hey hey hey! 👋", emojis: ["👋", "😊", "💛", "✌️"], scale: 1.1 },
  { state: "laughing", bubble: "That tickles! 😝", emojis: ["😝", "🤪", "💥", "😜"], scale: 1.2 },
  { state: "celebrating", bubble: "I'm a secret! 🤫", emojis: ["🤫", "👀", "💎", "🌟"], scale: 1.3 },
  { state: "jumping", bubble: "Boing boing! 🐸", emojis: ["🐸", "💚", "🌀", "✨"], scale: 1.2 },
  { state: "laughing", bubble: "You're funny! 😄", emojis: ["😄", "💯", "👏", "🔥"], scale: 1.15 },
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

export function ScrollingAvatar() {
  const [state, setState] = useState<AvatarState>("waving");
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [xPos, setXPos] = useState(SECTION_CONFIG.hero.xPos);
  const [scale, setScale] = useState(SECTION_CONFIG.hero.scale);
  const [facingRight, setFacingRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [clickReaction, setClickReaction] = useState<ClickReaction | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const clickIndexRef = useRef(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleIdRef = useRef(0);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeSectionRef = useRef<SectionId>("hero");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getSafeXPos = useCallback(
    (rawX: number) => {
      if (!isMobile) return rawX;
      const vw = window.innerWidth;
      const widgetWidth = 168;
      const margin = 16;
      const maxLeftPx = vw - widgetWidth - margin;
      const maxLeftPercent = (maxLeftPx / vw) * 100;
      return Math.min(rawX, Math.max(4, maxLeftPercent));
    },
    [isMobile]
  );

  const applySection = useCallback(
    (section: SectionId) => {
      const config = SECTION_CONFIG[section];
      activeSectionRef.current = section;
      setActiveSection(section);
      setState(config.state);
      setScale(config.scale);
      setXPos(getSafeXPos(config.xPos));
    },
    [getSafeXPos]
  );

  const sectionConfig = SECTION_CONFIG[activeSection];
  const displayState = clickReaction ? clickReaction.state : state;
  const displayScale = clickReaction ? clickReaction.scale : scale;
  const displayBubble = clickReaction ? clickReaction.bubble : sectionConfig.bubble;
  const displayEmojis = clickReaction ? clickReaction.emojis : sectionConfig.emojis;
  const bubbleOnLeft = isMobile && xPos > 32;

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
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? currentY / docHeight : 0;

      if (Math.abs(delta) > 3) {
        setIsScrolling(true);
        setState("running");
        setScale(0.92);
        setFacingRight(delta > 0);

        const scrollX = isMobile
          ? getSafeXPos(5 + progress * 62)
          : 5 + progress * 80;
        setXPos(scrollX);
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        applySection(getActiveSection());
      }, 220);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [isMobile, getSafeXPos, applySection]);

  const mobileScaleFactor = isMobile ? 0.72 : 1;
  const effectiveScale = displayScale * mobileScaleFactor;

  return (
    <motion.div
      className="fixed bottom-4 z-40 select-none"
      style={{
        left: `${xPos}%`,
        paddingRight: "env(safe-area-inset-right, 0px)",
        maxWidth: isMobile ? "calc(100vw - 1rem)" : undefined,
      }}
      animate={{ left: `${xPos}%`, scaleX: facingRight ? 1 : -1 }}
      transition={{
        left: isScrolling
          ? { type: "spring", stiffness: 70, damping: 20 }
          : { type: "spring", stiffness: 45, damping: 16 },
        scaleX: { duration: 0.2 },
      }}
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {displayBubble && (
            <motion.div
              key={clickReaction ? "click" : activeSection}
              className={`absolute -top-11 bg-card/95 border border-primary/40 rounded-xl px-2.5 py-1.5 text-[10px] md:text-[11px] font-bold text-primary backdrop-blur-sm shadow-lg pointer-events-none ${
                bubbleOnLeft
                  ? "right-0 max-w-[148px] text-right leading-snug"
                  : "left-1/2 -translate-x-1/2 whitespace-nowrap"
              }`}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                scaleX: facingRight ? 1 : -1,
              }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {displayBubble}
              <div
                className={`absolute -bottom-1.5 w-3 h-1.5 bg-card/95 border-b border-r border-primary/40 rotate-45 -mb-px ${
                  bubbleOnLeft ? "right-5" : "left-1/2 -translate-x-1/2"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!clickReaction &&
          displayEmojis.map((emoji, i) => (
            <motion.span
              key={`${activeSection}-${emoji}-${i}`}
              className="absolute text-base pointer-events-none"
              style={{
                bottom: "100%",
                ...(bubbleOnLeft
                  ? { right: `${8 + i * 16}px` }
                  : { left: `${-10 + i * 18}px` }),
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{
                y: [0, -28, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.3, 0.5],
                rotate: [0, i % 2 === 0 ? 15 : -15, 0],
                scaleX: facingRight ? 1 : -1,
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.28,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}

        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-lg pointer-events-none"
              style={{ bottom: "80%", left: "50%" }}
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1.6,
                x: p.x,
                y: -55 - Math.random() * 30,
                rotate: (Math.random() - 0.5) * 360,
                scaleX: facingRight ? 1 : -1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.2, 0.8, 0.4, 1] }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isClicked && (
            <motion.div
              key="ripple"
              className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
              style={{ margin: "auto", width: 60, height: 60, top: "10%", left: "50%", x: "-50%" }}
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="cursor-pointer"
          onClick={handleAvatarClick}
          animate={{
            y:
              displayState === "running"
                ? [0, -6, 0, -6, 0]
                : displayState === "jumping"
                ? [0, -22, -10, 0]
                : displayState === "celebrating"
                ? [0, -4, 0, -4, 0]
                : displayState === "waving"
                ? [0, -2, 0]
                : 0,
            scaleY: displayState === "laughing" ? [1, 1.04, 0.97, 1.04, 1] : 1,
            scaleX: isClicked ? 1.25 : 1,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88, rotate: [-3, 3, -3, 0] }}
          transition={{
            y: {
              duration:
                displayState === "running"
                  ? 0.28
                  : displayState === "jumping"
                  ? 0.6
                  : displayState === "waving"
                  ? 1.2
                  : 0.35,
              repeat:
                displayState === "running" ||
                displayState === "celebrating" ||
                displayState === "jumping" ||
                displayState === "waving"
                  ? Infinity
                  : 0,
              ease: "easeInOut",
            },
            scaleY: {
              duration: 0.55,
              repeat: displayState === "laughing" ? Infinity : 0,
            },
          }}
        >
          <AvatarCharacter state={displayState} scale={effectiveScale} />
        </motion.div>

        <motion.div
          className="rounded-full bg-black/20 blur-sm -mt-2 pointer-events-none"
          animate={{
            width: displayState === "jumping" ? 28 : displayState === "running" ? 38 : 44,
            height: displayState === "jumping" ? 6 : 9,
            opacity: displayState === "jumping" ? 0.3 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
