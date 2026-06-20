"use client";

import { useState, useEffect } from "react";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { ScrollingAvatar } from "./ScrollingAvatar";
import { motion, AnimatePresence } from "framer-motion";

export function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25 selection:text-foreground">
      <Cursor />
      <ScrollingAvatar />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl py-4 border-b border-border/60 shadow-[0_1px_0_hsl(38_90%_55%_/_0.05)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-lg font-extrabold tracking-[-0.04em] text-foreground hover:text-primary transition-colors"
          >
            VS<span className="text-primary">.</span>
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
    </div>
  );
}
