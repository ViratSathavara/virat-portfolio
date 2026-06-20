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

type ClickReaction = {
  state: AvatarState;
  bubble: string;
  emojis: string[];
  scale: number;
};

const CLICK_REACTIONS: ClickReaction[] = [
  { state: "laughing",    bubble: "Haha, stop it! 😂",      emojis: ["😂", "💀", "🤣", "😆"], scale: 1.2 },
  { state: "celebrating", bubble: "You found me! 🎉",        emojis: ["🎉", "✨", "⭐", "🎊"], scale: 1.25 },
  { state: "jumping",     bubble: "Woohooo! 🚀",             emojis: ["🚀", "💫", "⚡", "🔥"], scale: 1.15 },
  { state: "waving",      bubble: "Hey hey hey! 👋",         emojis: ["👋", "😊", "💛", "✌️"], scale: 1.1  },
  { state: "laughing",    bubble: "That tickles! 😝",        emojis: ["😝", "🤪", "💥", "😜"], scale: 1.2 },
  { state: "celebrating", bubble: "I'm a secret! 🤫",        emojis: ["🤫", "👀", "💎", "🌟"], scale: 1.3 },
  { state: "jumping",     bubble: "Boing boing! 🐸",         emojis: ["🐸", "💚", "🌀", "✨"], scale: 1.2 },
  { state: "laughing",    bubble: "You're funny! 😄",        emojis: ["😄", "💯", "👏", "🔥"], scale: 1.15 },
];

// Burst particle emitted on click
type Particle = { id: number; x: number; y: number; emoji: string };

export function ScrollingAvatar() {
  const [state, setState] = useState<AvatarState>("waving");
  const [xPos, setXPos] = useState(8);
  const [scale, setScale] = useState(1);
  const [facingRight, setFacingRight] = useState(true);

  // Click reaction state
  const [clickReaction, setClickReaction] = useState<ClickReaction | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const clickIndexRef = useRef(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleIdRef = useRef(0);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derived display values — click reaction overrides scroll state
  const displayState = clickReaction ? clickReaction.state : state;
  const displayScale = clickReaction ? clickReaction.scale : scale;
  const displayBubble = clickReaction ? clickReaction.bubble : getBubbleText(state);
  const displayEmojis = clickReaction ? clickReaction.emojis : getScrollEmojis(state);

  function getBubbleText(s: AvatarState): string | null {
    if (s === "waving") return "Hi, I'm Virat! 👋";
    if (s === "celebrating") return "Check my skills! 🚀";
    if (s === "laughing") return "Cool projects! 😄";
    if (s === "jumping") return "Let's connect! 💬";
    return null;
  }

  function getScrollEmojis(s: AvatarState): string[] {
    if (s === "celebrating") return ["🎉", "⭐", "✨", "🚀"];
    if (s === "laughing") return ["😄", "💯", "🔥"];
    return [];
  }

  const handleAvatarClick = useCallback(() => {
    const reaction = CLICK_REACTIONS[clickIndexRef.current % CLICK_REACTIONS.length];
    clickIndexRef.current += 1;

    setClickReaction(reaction);
    setIsClicked(true);

    // Spawn burst particles
    const newParticles: Particle[] = reaction.emojis.map((emoji, i) => ({
      id: particleIdRef.current + i,
      x: (i - 1.5) * 22,
      y: 0,
      emoji,
    }));
    particleIdRef.current += reaction.emojis.length;
    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 900);

    // Reset clicked punch
    setTimeout(() => setIsClicked(false), 150);

    // Clear reaction after 2.2s
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setClickReaction(null);
    }, 2200);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? currentY / docHeight : 0;

      const newX = 5 + progress * 80;
      setXPos(newX);

      if (Math.abs(delta) > 3) {
        setState("running");
        setScale(0.95);
        setFacingRight(delta > 0);
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        const sections = ["hero", "about", "experience", "skills", "projects", "contact"];
        let currentSection = "hero";
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
            currentSection = id;
          }
        }

        if (currentSection === "hero") { setState("waving"); setScale(1.1); }
        else if (currentSection === "skills") { setState("celebrating"); setScale(1.2); }
        else if (currentSection === "projects") { setState("laughing"); setScale(1.1); }
        else if (currentSection === "contact") { setState("jumping"); setScale(1.1); }
        else { setState("idle"); setScale(1); }
      }, 200);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-4 z-40 select-none"
      animate={{ left: `${xPos}%`, scaleX: facingRight ? 1 : -1 }}
      transition={{
        left: { type: "spring", stiffness: 55, damping: 18 },
        scaleX: { duration: 0.2 },
      }}
      style={{ left: `${xPos}%` }}
    >
      <div className="relative flex flex-col items-center">

        {/* Speech bubble — counter-flip so text is always readable */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card/95 border border-primary/40 rounded-xl px-3 py-1.5 text-[11px] font-bold text-primary whitespace-nowrap backdrop-blur-sm shadow-lg pointer-events-none"
          animate={{
            opacity: displayBubble ? 1 : 0,
            y: displayBubble ? 0 : 6,
            scale: displayBubble ? 1 : 0.85,
            scaleX: facingRight ? 1 : -1,
          }}
          transition={{ duration: 0.25 }}
        >
          {displayBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-card/95 border-b border-r border-primary/40 rotate-45 -mb-px" />
        </motion.div>

        {/* Scroll emojis (looping) */}
        {!clickReaction && displayEmojis.map((emoji, i) => (
          <motion.span
            key={`scroll-${displayState}-${i}`}
            className="absolute text-base pointer-events-none"
            style={{ bottom: "100%", left: `${-10 + i * 18}px` }}
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

        {/* Click burst particles (one-shot) */}
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

        {/* Click ripple ring */}
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

        {/* Avatar — clickable, pointer-events on just this element */}
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
                : 0,
            scaleY: displayState === "laughing" ? [1, 1.04, 0.97, 1.04, 1] : 1,
            // punch-down on click
            scaleX: isClicked ? 1.25 : 1,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88, rotate: [-3, 3, -3, 0] }}
          transition={{
            y: {
              duration: displayState === "running" ? 0.28 : displayState === "jumping" ? 0.6 : 0.35,
              repeat:
                displayState === "running" || displayState === "celebrating"
                  ? Infinity
                  : displayState === "jumping"
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
          <AvatarCharacter state={displayState} scale={displayScale} />
        </motion.div>

        {/* Ground shadow */}
        <motion.div
          className="rounded-full bg-black/20 blur-sm -mt-2 pointer-events-none"
          animate={{
            width: displayState === "jumping" ? 28 : 44,
            height: displayState === "jumping" ? 6 : 9,
            opacity: displayState === "jumping" ? 0.3 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
