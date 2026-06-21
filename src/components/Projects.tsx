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
  SiGraphql,
} from "react-icons/si";
import { FaPlug, FaShieldAlt } from "react-icons/fa";
import {
  Car, Users, Globe, Package, BookOpen, Gamepad2,
  ExternalLink, Github, Briefcase, User, BarChart3,
  MessageSquare, Plane,
} from "lucide-react";

const techIconMap: Record<string, { Icon: React.ElementType; color: string }> = {
  "MongoDB":        { Icon: SiMongodb,    color: "#47A248" },
  "Express.js":     { Icon: SiExpress,    color: "#ffffff" },
  "React":          { Icon: SiReact,      color: "#61DAFB" },
  "React.js":       { Icon: SiReact,      color: "#61DAFB" },
  "Node.js":        { Icon: SiNodedotjs,  color: "#339933" },
  "WebSockets":     { Icon: FaPlug,       color: "#ffffff" },
  "Firebase":       { Icon: SiFirebase,   color: "#FFCA28" },
  "Tailwind CSS":   { Icon: SiTailwindcss,color: "#06B6D4" },
  "Next.js":        { Icon: SiNextdotjs,  color: "#ffffff" },
  "TypeScript":     { Icon: SiTypescript, color: "#3178C6" },
  "JWT":            { Icon: FaShieldAlt,  color: "#FF6C37" },
  "JavaScript":     { Icon: SiJavascript, color: "#F7DF1E" },
  "NestJS":         { Icon: SiNestjs,     color: "#E0234E" },
  "GraphQL":        { Icon: SiGraphql,    color: "#E10098" },
  "Authentication": { Icon: FaShieldAlt,  color: "#FF6C37" },
  "Real-time":      { Icon: FaPlug,       color: "#61DAFB" },
};

type Project = {
  id: number;
  title: string;
  description: string;
  highlights?: string[];
  tags: string[];
  featured: boolean;
  techType: string;          // sub-filter: fullstack | frontend | backend
  projectType: "professional" | "personal";
  activelyWorking: boolean;  // shows "In Progress" badge
  company?: string;          // shown on professional cards
  liveLink: string | null;
  sourceCode: string | null;
  Icon: React.ElementType;
  gradient: string;
  accent: string;
  num: string;
};

/* ─── PROFESSIONAL PROJECTS ─────────────────────────────────────── */
const professionalProjects: Project[] = [
  {
    id: 101,
    title: "PMS — Performance Management System",
    description:
      "Enterprise-level SaaS platform for marketing companies to manage teams, projects, and multi-platform ad analytics (Google Ads, Meta Ads, Bing Ads). Includes 5-level RBAC, CI/CD pipelines, and revenue/ROAS dashboards.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "JWT"],
    featured: true,
    techType: "fullstack",
    projectType: "professional",
    activelyWorking: true,
    company: "Olbuz Pvt. Ltd.",
    liveLink: "https://pms.adtorise.com/",
    sourceCode: null,
    Icon: BarChart3,
    gradient: "from-amber-500/10 to-orange-500/5",
    accent: "#F59E0B",
    num: "01",
  },
  {
    id: 102,
    title: "TheIndia Travel Community",
    description:
      "Production-grade travel community platform built with Next.js. Maintained and enhanced with new features, managed server configurations, and deployment workflows via cPanel and Hostinger.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: false,
    techType: "frontend",
    projectType: "professional",
    activelyWorking: true,
    company: "Olbuz Pvt. Ltd.",
    liveLink: "https://www.theindia.co.in/",
    sourceCode: null,
    Icon: Plane,
    gradient: "from-sky-500/10 to-blue-500/5",
    accent: "#0EA5E9",
    num: "02",
  },
  {
    id: 103,
    title: "SHIFTit Health — Web Admin & Company Portal",
    description:
      "U.S.-based healthcare workforce management platform for managing hospital shifts, workers, and compliance. Built shift management, invoice management, analytics dashboards, and real-time communication modules.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "JWT"],
    featured: true,
    techType: "fullstack",
    projectType: "professional",
    activelyWorking: false,
    company: "Coddit64",
    liveLink: null,
    sourceCode: null,
    Icon: Briefcase,
    gradient: "from-teal-500/10 to-cyan-500/5",
    accent: "#14B8A6",
    num: "03",
  },
  {
    id: 104,
    title: "Quick Hub — Marketing Automation Platform",
    description:
      "Marketing automation platform enabling small businesses to manage campaigns, communication, and business workflows. Integrated WebSockets, WhatsApp support, and campaign management using React.js and NestJS.",
    tags: ["React.js", "NestJS", "GraphQL", "WebSockets", "Tailwind CSS"],
    featured: true,
    techType: "fullstack",
    projectType: "professional",
    activelyWorking: false,
    company: "Cloudpeak Technologies",
    liveLink: null,
    sourceCode: null,
    Icon: MessageSquare,
    gradient: "from-violet-500/10 to-purple-500/5",
    accent: "#8B5CF6",
    num: "04",
  },
];

/* ─── PERSONAL PROJECTS ──────────────────────────────────────────── */
const personalProjects: Project[] = [
  {
    id: 201,
    title: "Uber Clone — Full-Stack Ride-Hailing Platform",
    description:
      "Production-grade full-stack ride-hailing web app built with the MERN stack. Features JWT authentication, REST APIs, WebSocket-based live driver tracking, and a responsive UI. Deployed on Render with MongoDB Atlas.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "WebSockets", "JWT", "Tailwind CSS"],
    featured: true,
    techType: "fullstack",
    projectType: "personal",
    activelyWorking: false,
    liveLink: "https://uber-clone-6qea.onrender.com",
    sourceCode: "https://github.com/ViratSathavara/Uber_Clone",
    Icon: Car,
    gradient: "from-yellow-500/10 to-orange-500/5",
    accent: "#F7DF1E",
    num: "01",
  },
  {
    id: 202,
    title: "Portfolio Website",
    description:
      "A production-grade personal portfolio built from scratch to showcase my work, skills, and experience. Designed as a single-page application with cinematic intro animations, SEO-first architecture, and a fully responsive dark theme.",
    highlights: [
      "Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion for smooth page transitions and scroll animations.",
      "Custom intro loader with scan-line → zoom-out sequence, animated logo, code terminal, and progress bar.",
      "SEO optimized with JSON-LD structured data, Open Graph tags, canonical URLs, and semantic HTML for better discoverability.",
      "Interactive sections: animated skills with doc links, filterable project gallery, contact form with email API, and custom cursor.",
      "Deployed on production with performance-focused SSR, accessible UI patterns, and mobile-first responsive design.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
    techType: "frontend",
    projectType: "personal",
    activelyWorking: true,
    liveLink: "https://viratsathavara.in/",
    sourceCode: "https://github.com/ViratSathavara/Virat-Portffolio",
    Icon: Globe,
    gradient: "from-blue-500/10 to-cyan-500/5",
    accent: "#61DAFB",
    num: "02",
  },
  {
    id: 203,
    title: "Connectify — Social Media App",
    description:
      "Full-featured social media application with Firebase Realtime Database. User authentication (login, signup, password recovery), real-time post creation/editing/deleting, live commenting system, and content-based filtering.",
    tags: ["React.js", "Firebase", "Tailwind CSS", "Authentication", "Real-time"],
    featured: true,
    techType: "fullstack",
    projectType: "personal",
    activelyWorking: false,
    liveLink: "https://connectify-social-media-app.netlify.app/",
    sourceCode: "https://github.com/ViratSathavara/Connectify-social-media-app",
    Icon: Users,
    gradient: "from-orange-500/10 to-rose-500/5",
    accent: "#FFCA28",
    num: "03",
  },
  {
    id: 204,
    title: "MERN Stack CRUD — Product Management",
    description:
      "Full-stack product inventory management system built with MERN stack using MVC architecture. Admins can add, edit, delete, and track products in real-time with seamless MongoDB database synchronization.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    featured: false,
    techType: "fullstack",
    projectType: "personal",
    activelyWorking: false,
    liveLink: null,
    sourceCode: "https://github.com/ViratSathavara/MernStack_with_MVC_Pattern",
    Icon: Package,
    gradient: "from-green-500/10 to-emerald-500/5",
    accent: "#47A248",
    num: "04",
  },
  {
    id: 205,
    title: "Docket — Word Counter App",
    description:
      "A clean word and character counter built with React.js during my internship at Nivaan Infotech. Features real-time counting, text analysis, and a minimal, accessible UI.",
    tags: ["React.js", "JavaScript"],
    featured: false,
    techType: "frontend",
    projectType: "personal",
    activelyWorking: false,
    liveLink: "https://docket-word-character-counter.netlify.app/",
    sourceCode: "https://github.com/ViratSathavara/Docket",
    Icon: BookOpen,
    gradient: "from-purple-500/10 to-violet-500/5",
    accent: "#A855F7",
    num: "05",
  },
  {
    id: 206,
    title: "Fruit Crush Game",
    description:
      "An interactive browser match-3 game built with JavaScript and jQuery featuring score tracking and smooth animations. Built to sharpen DOM manipulation and event handling skills.",
    tags: ["JavaScript"],
    featured: false,
    techType: "frontend",
    projectType: "personal",
    activelyWorking: false,
    liveLink: "https://fruit-crush-game.netlify.app/",
    sourceCode: "https://github.com/ViratSathavara",
    Icon: Gamepad2,
    gradient: "from-pink-500/10 to-rose-500/5",
    accent: "#EC4899",
    num: "06",
  },
];

const allProjects = [...professionalProjects, ...personalProjects];

/* ─── TAB / FILTER CONFIG ────────────────────────────────────────── */
type MainTab = "all" | "professional" | "personal";

const mainTabs: { id: MainTab; label: string; icon: React.ElementType }[] = [
  { id: "all",          label: "All",          icon: Globe     },
  { id: "professional", label: "Professional", icon: Briefcase },
  { id: "personal",     label: "Personal",     icon: User      },
];

const subFilters = ["all", "fullstack", "frontend", "backend"] as const;
type SubFilter = typeof subFilters[number];

/* ─── PROJECT CARD ───────────────────────────────────────────────── */
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
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative group bg-gradient-to-br ${project.gradient} bg-card border border-border rounded-[var(--radius)] p-6 overflow-hidden transition-all duration-300 hover:border-border/60 flex flex-col`}
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[var(--radius)]"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(320px circle at ${spotlight.x}px ${spotlight.y}px, ${project.accent}18, transparent 65%)`,
        }}
      />

      {/* Top badges row */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 flex-wrap justify-end max-w-[55%]">
        {project.activelyWorking && (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/25 uppercase tracking-wide whitespace-nowrap">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            In Progress
          </span>
        )}
        {project.featured && !project.activelyWorking && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 uppercase tracking-wide whitespace-nowrap">
            Featured
          </span>
        )}
      </div>

      {/* Icon + number */}
      <div className="flex items-start gap-3 mb-4">
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-border/80 shrink-0"
          style={{ background: `${project.accent}15` }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <project.Icon className="w-4 h-4" style={{ color: project.accent }} />
        </motion.div>
        <div className="flex flex-col gap-0.5 mt-0.5">
          <span className="text-[10px] font-bold text-muted/40 tracking-widest">{project.num}</span>
          {project.company && (
            <span className="text-[10px] font-semibold text-primary/70 tracking-wide">
              @ {project.company}
            </span>
          )}
        </div>
      </div>

      {/* Title + description */}
      <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 leading-snug pr-2">
        {project.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-4 font-light flex-1">
        {project.description}
      </p>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="text-xs text-muted/90 leading-relaxed mb-4 space-y-1.5 flex-1">
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="text-primary shrink-0 mt-0.5">▸</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tech) => {
          const techData = techIconMap[tech];
          return (
            <motion.span
              key={tech}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-border text-xs font-medium text-muted rounded-full"
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

      {/* Footer links */}
      <div className="flex items-center gap-3 pt-3 border-t border-border">
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
        ) : (
          /* NDA / private codebase indicator for professional projects */
          project.projectType === "professional" && (
            <span className="text-xs text-muted/50 font-medium italic">
              🔒 Proprietary / NDA
            </span>
          )
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

/* ─── MAIN EXPORT ────────────────────────────────────────────────── */
export function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [mainTab, setMainTab]     = useState<MainTab>("all");
  const [subFilter, setSubFilter] = useState<SubFilter>("all");

  // Reset sub-filter when switching main tab
  const handleMainTab = (tab: MainTab) => {
    setMainTab(tab);
    setSubFilter("all");
  };

  const basePool =
    mainTab === "professional" ? professionalProjects :
    mainTab === "personal"     ? personalProjects :
    allProjects;

  const filtered = subFilter === "all"
    ? basePool
    : basePool.filter((p) => p.techType === subFilter);

  // Only show sub-filters that have projects in the current pool
  const availableSubFilters = subFilters.filter(
    (f) => f === "all" || basePool.some((p) => p.techType === f)
  );

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

          {/* ── Main tabs: All / Professional / Personal ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {mainTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = mainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleMainTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-[hsl(24_8%_5%)] font-semibold shadow-[0_0_16px_hsl(38_90%_55%_/_0.3)]"
                      : "bg-card border border-border text-muted hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {tab.label}
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-[hsl(24_8%_5%)/30] text-[hsl(24_8%_5%)]"
                        : "bg-secondary text-muted"
                    }`}
                  >
                    {tab.id === "all"          ? allProjects.length :
                     tab.id === "professional" ? professionalProjects.length :
                     personalProjects.length}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Sub-filters: All / Fullstack / Frontend / Backend ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {availableSubFilters.map((f) => (
              <button
                key={f}
                onClick={() => setSubFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 ${
                  subFilter === f
                    ? "bg-foreground/10 text-foreground border border-foreground/20"
                    : "text-muted/70 hover:text-muted border border-transparent hover:border-border"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Cards grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mainTab}-${subFilter}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-muted">
                No projects in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 md:mt-12"
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
