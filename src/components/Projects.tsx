"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiExpress,
  SiNestjs,
} from "react-icons/si";
import { FaPlug, FaShieldAlt } from "react-icons/fa";
import { Car, Users, Globe, Package, BookOpen, Gamepad2, ExternalLink, Github } from "lucide-react";

const techIconMap: Record<string, { Icon: React.ElementType; color: string }> = {
  "MongoDB": { Icon: SiMongodb, color: "#47A248" },
  "Express.js": { Icon: SiExpress, color: "#ffffff" },
  "React": { Icon: SiReact, color: "#61DAFB" },
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  "WebSockets": { Icon: FaPlug, color: "#ffffff" },
  "Firebase": { Icon: SiFirebase, color: "#FFCA28" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Next.js": { Icon: SiNextdotjs, color: "#ffffff" },
  "TypeScript": { Icon: SiTypescript, color: "#3178C6" },
  "JWT": { Icon: FaShieldAlt, color: "#FF6C37" },
  "JavaScript": { Icon: SiJavascript, color: "#F7DF1E" },
  "NestJS": { Icon: SiNestjs, color: "#E0234E" },
  "Authentication": { Icon: FaShieldAlt, color: "#FF6C37" },
  "Real-time": { Icon: FaPlug, color: "#61DAFB" },
};

type Project = {
  id: number;
  title: string;
  shortDesc: string;
  description: string;
  tags: string[];
  featured: boolean;
  category: string;
  liveLink: string | null;
  sourceCode: string | null;
  Icon: React.ElementType;
  gradient: string;
  accent: string;
  num: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Uber Clone — Full-Stack Ride-Hailing Platform",
    shortDesc: "Production-grade MERN stack ride-hailing app with real-time tracking.",
    description:
      "A production-grade full-stack ride-hailing web app built with the MERN stack. Features JWT authentication, REST APIs, WebSocket-based live driver tracking, and a responsive UI with Tailwind CSS & MUI. Deployed on Render with MongoDB Atlas.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "WebSockets", "JWT", "Tailwind CSS"],
    featured: true,
    category: "fullstack",
    liveLink: "https://uber-clone-6qea.onrender.com",
    sourceCode: "https://github.com/ViratSathavara/Uber_Clone",
    Icon: Car,
    gradient: "from-yellow-500/10 to-orange-500/5",
    accent: "#F7DF1E",
    num: "01",
  },
  {
    id: 2,
    title: "Portfolio Website (Next.js)",
    shortDesc: "SEO-optimized portfolio built with Next.js, Tailwind CSS & Framer Motion.",
    description:
      "Personal portfolio built with Next.js 14, Tailwind CSS, Framer Motion, and MUI. Fully SEO-optimized with JSON-LD structured data, SSR, Open Graph tags, accessibility features, and smooth animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
    category: "frontend",
    liveLink: "https://virat-sathavara.netlify.app/",
    sourceCode: "https://github.com/ViratSathavara/Virat-Portffolio",
    Icon: Globe,
    gradient: "from-blue-500/10 to-cyan-500/5",
    accent: "#61DAFB",
    num: "02",
  },
  {
    id: 3,
    title: "Connectify — Social Media App",
    shortDesc: "Real-time social media app with Firebase authentication and live posts.",
    description:
      "Full-featured social media application with Firebase Realtime Database. User authentication (login, signup, password recovery), real-time post creation/editing/deleting, live commenting system, and content-based filtering.",
    tags: ["React.js", "Firebase", "Tailwind CSS", "Authentication", "Real-time"],
    featured: true,
    category: "fullstack",
    liveLink: "https://connectify-social-media-app.netlify.app/",
    sourceCode: "https://github.com/ViratSathavara/Connectify-social-media-app",
    Icon: Users,
    gradient: "from-orange-500/10 to-rose-500/5",
    accent: "#FFCA28",
    num: "03",
  },
  {
    id: 4,
    title: "MERN Stack CRUD — Product Management",
    shortDesc: "Product inventory management system with MVC architecture.",
    description:
      "Full-stack product inventory management system built with MERN stack using MVC architecture. Admins can add, edit, delete, and track products in real-time with seamless MongoDB database synchronization.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    featured: false,
    category: "fullstack",
    liveLink: null,
    sourceCode: "https://github.com/ViratSathavara/MernStack_with_MVC_Pattern",
    Icon: Package,
    gradient: "from-green-500/10 to-emerald-500/5",
    accent: "#47A248",
    num: "04",
  },
  {
    id: 5,
    title: "NestJS CRUD API",
    shortDesc: "RESTful API with NestJS demonstrating modular architecture.",
    description:
      "RESTful API built with NestJS demonstrating full CRUD operations, modular architecture, decorators, and TypeScript-first approach — a foundation for enterprise-grade backend development.",
    tags: ["NestJS", "TypeScript", "Node.js"],
    featured: false,
    category: "backend",
    liveLink: null,
    sourceCode: "https://github.com/ViratSathavara/Nestjs-example-project",
    Icon: FaPlug,
    gradient: "from-red-500/10 to-rose-500/5",
    accent: "#E0234E",
    num: "05",
  },
  {
    id: 6,
    title: "Docket — Word Counter App",
    shortDesc: "Clean word & character counter built during Nivaan Infotech internship.",
    description:
      "A clean word and character counter built with React.js during my internship at Nivaan Infotech. Features real-time counting, text analysis, and a minimal, accessible UI.",
    tags: ["React.js", "JavaScript"],
    featured: false,
    category: "frontend",
    liveLink: "https://docket-word-character-counter.netlify.app/",
    sourceCode: "https://github.com/ViratSathavara/Docket",
    Icon: BookOpen,
    gradient: "from-purple-500/10 to-violet-500/5",
    accent: "#A855F7",
    num: "06",
  },
  {
    id: 7,
    title: "Fruit Crush Game",
    shortDesc: "Browser match-3 game with jQuery and DOM manipulation.",
    description:
      "An interactive browser game built with JavaScript and jQuery featuring match-3 mechanics, score tracking, and smooth animations. Built to sharpen DOM manipulation and event handling skills.",
    tags: ["JavaScript"],
    featured: false,
    category: "frontend",
    liveLink: "https://fruit-crush-game.netlify.app/",
    sourceCode: "https://github.com/ViratSathavara",
    Icon: Gamepad2,
    gradient: "from-pink-500/10 to-rose-500/5",
    accent: "#EC4899",
    num: "07",
  },
];

const categories = ["all", "fullstack", "frontend", "backend"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };
  const onMouseLeave = () => setSpotlight((s) => ({ ...s, opacity: 0 }));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative group bg-gradient-to-br ${project.gradient} bg-card border border-border rounded-[var(--radius)] p-7 overflow-hidden transition-all duration-300 hover:border-border/60`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[var(--radius)]"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(320px circle at ${spotlight.x}px ${spotlight.y}px, ${project.accent}18, transparent 65%)`,
        }}
      />

      {project.featured && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase tracking-wide">
          Featured
        </span>
      )}

      <div className="flex items-start gap-3 mb-5">
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-border/80 shrink-0"
          style={{ background: `${project.accent}15` }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <project.Icon className="w-4 h-4" style={{ color: project.accent }} />
        </motion.div>
        <span className="text-xs font-bold text-muted/50 tracking-widest mt-2">{project.num}</span>
      </div>

      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
        {project.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-5 font-light">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tech) => {
          const techData = techIconMap[tech];
          return (
            <motion.span
              key={tech}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-border text-xs font-medium text-muted rounded-full transition-all duration-200"
              whileHover={{ scale: 1.05 }}
            >
              {techData && (
                <techData.Icon className="w-3 h-3" style={{ color: techData.color }} />
              )}
              {tech}
            </motion.span>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-border">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        )}
        {project.sourceCode && (
          <a
            href={project.sourceCode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Source Code
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${8 + i * 12}%`,
              top: `${20 + (i * 17) % 60}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.8, 1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4"
          >
            // Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8"
          >
            What I&apos;ve built.
          </motion.h2>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-[var(--radius)] text-sm font-medium transition-all duration-200 capitalize ${
                  activeCategory === cat
                    ? "bg-primary text-[hsl(24_8%_5%)] font-semibold"
                    : "bg-card border border-border text-muted hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/ViratSathavara"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors border border-border hover:border-primary/40 rounded-[var(--radius)] px-5 py-2.5"
          >
            <Github className="w-4 h-4" />
            View All Projects on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
