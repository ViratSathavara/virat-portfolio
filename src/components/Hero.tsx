"use client";

import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { Linkedin, ArrowDown, Download } from "lucide-react";
import Image from "next/image";

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  duration: 3 + Math.random() * 5,
  delay: Math.random() * 4,
}));

export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-8%] w-[700px] h-[700px] rounded-full bg-primary/8 blur-[160px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/6 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/3 blur-[200px]" />

        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background:
                p.id % 3 === 0
                  ? "hsl(38 90% 55%)"
                  : p.id % 3 === 1
                  ? "hsl(350 75% 60%)"
                  : "hsl(200 70% 60%)",
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1.5, 0],
              y: [0, -30 - Math.random() * 20, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="hsl(38 90% 55%)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-center pt-28 pb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="inline-block w-8 h-px bg-primary" />
            <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              Hello, I&apos;m
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-[-0.03em] mb-6"
          >
            <span className="gradient-text">
              Virat
              <br />
              Sathavara
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-3 mb-4"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-lg md:text-xl font-light text-muted-foreground tracking-wide">
              Frontend Engineer — React.js | Next.js | TypeScript
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-base text-muted-foreground/70 leading-relaxed max-w-md mb-12 font-light"
          >
            Building scalable and responsive web applications with 2+ years of
            experience in enterprise SaaS platforms, dashboards, and API
            integrations. Based in Gujarat, India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.button
              onClick={() => scrollTo("projects")}
              className="px-7 py-3.5 bg-primary text-[hsl(24_8%_5%)] font-bold rounded-[var(--radius)] text-sm tracking-wide"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 32px hsl(38 90% 55% / 0.5)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              View Work
            </motion.button>
            <motion.a
              href="/Virat_Sathavara_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-foreground font-medium rounded-[var(--radius)] text-sm"
              whileHover={{
                scale: 1.04,
                borderColor: "hsl(38 90% 55% / 0.6)",
                color: "hsl(38 90% 55%)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-4 h-4" />
              Download CV
            </motion.a>
            <motion.button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3.5 border border-border text-foreground font-medium rounded-[var(--radius)] text-sm"
              whileHover={{
                scale: 1.04,
                borderColor: "hsl(38 90% 55% / 0.6)",
                color: "hsl(38 90% 55%)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.button>

            <div className="flex items-center gap-4 ml-1">
              <motion.a
                href="https://github.com/ViratSathavara"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <SiGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/virat-sathavara-576109249/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-[-40px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, hsl(38 90% 55% / 0.12) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute inset-[-20px] rounded-full border border-primary/10"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[0, 90, 180, 270].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/40"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(50px) translate(-50%, -50%)`,
                  }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-[-2px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(38 90% 55% / 0.5), hsl(350 75% 60% / 0.3), transparent)",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Image
              src="/avatar.png"
              alt="Virat Sathavara — Frontend Engineer"
              width={288}
              height={360}
              className="relative w-60 h-[300px] md:w-72 md:h-[360px] object-cover object-top rounded-2xl border border-primary/20"
              style={{
                filter: "drop-shadow(0 0 20px hsl(38 90% 55% / 0.3))",
              }}
              priority
            />

            <motion.div
              className="absolute -bottom-3 -right-3 bg-card border border-border rounded-xl px-3 py-2 text-xs font-semibold text-primary backdrop-blur-sm"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              2+ Years Exp 🚀
            </motion.div>

            <motion.div
              className="absolute -top-3 -left-3 bg-card border border-border rounded-xl px-3 py-2 text-xs font-semibold text-foreground backdrop-blur-sm"
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              Open to Work ✅
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors"
        onClick={() => scrollTo("about")}
      >
        <span className="text-[10px] tracking-[0.22em] uppercase font-semibold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
