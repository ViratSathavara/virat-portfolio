"use client";

import { useState, useEffect, useCallback } from "react";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { ScrollingAvatar } from "./ScrollingAvatar";
import { Loader } from "./Loader";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

export function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["hero", "about", "experience", "skills", "projects", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const handleLoaderDone = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25 selection:text-foreground">
      <Cursor />

      {/* ── Intro loader (once per visit) ── */}
      {loading && <Loader onDone={handleLoaderDone} />}

      {/* ── Main content — hidden while loading to prevent layout shift ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollingAvatar />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl py-4 border-b border-border/60 shadow-[0_1px_0_hsl(38_90%_55%_/_0.05)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("hero")}
            aria-label="Go to top"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            {/* Icon badge */}
            <motion.div
              className="relative w-9 h-9 rounded-[8px] flex items-center justify-center overflow-hidden"
              style={{ background: "#0D0B09", border: "1px solid hsl(38 90% 55% / 0.25)" }}
              whileHover={{ scale: 1.08, borderColor: "hsl(38 90% 55% / 0.7)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-[8px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, hsl(38 90% 55% / 0.18) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* VS text */}
              <span
                className="relative text-[13px] font-black tracking-[-1px] leading-none"
                style={{
                  background: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                VS
              </span>
              {/* Dot */}
              <span
                className="absolute bottom-[4px] right-[3px] w-[5px] h-[5px] rounded-full"
                style={{ background: "#F59E0B", boxShadow: "0 0 4px #F59E0B" }}
              />
            </motion.div>

            {/* Wordmark — hide on very small screens */}
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span
                className="text-[15px] font-extrabold tracking-[-0.04em] leading-none"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #F59E0B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Virat Sathavara
              </span>
              <span className="text-[10px] text-muted/60 font-medium tracking-[0.08em] uppercase mt-0.5">
                Software Engineer
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors relative pb-0.5 ${
                  activeSection === link.id
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
            <motion.button
              onClick={() => scrollTo("contact")}
              className="text-sm font-semibold px-4 py-2 border border-primary/50 text-primary rounded-[var(--radius)] hover:bg-primary hover:text-[hsl(24_8%_5%)] transition-all"
              whileTap={{ scale: 0.97 }}
            >
              Hire Me
            </motion.button>
          </div>

          <button
            className="md:hidden text-muted hover:text-foreground transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-6 flex flex-col gap-4 overflow-hidden"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-muted hover:text-foreground text-left transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pb-16 md:pb-28">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      </motion.div>
    </div>
  );
}
