"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiGraphql,
  SiGit,
  SiFigma,
  SiRedux,
  SiTailwindcss,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiNestjs,
  SiBootstrap,
  SiMui,
  SiAxios,
  SiGithub,
  SiGitlab,
  SiNetlify,
  SiCpanel,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaDatabase, FaServer, FaTools } from "react-icons/fa";

type Skill = {
  name: string;
  percentage: number;
  color: string;
  Icon: React.ElementType;
  level: string;
  tooltip?: string;
};

const frontendSkills: Skill[] = [
  { name: "React.js", percentage: 90, Icon: SiReact, color: "#61DAFB", level: "Advanced", tooltip: "1.5+ years — QuickHub, SHIFTit, PMS. Hooks, Context, performance optimization, API integration." },
  { name: "Next.js", percentage: 85, Icon: SiNextdotjs, color: "#ffffff", level: "Advanced", tooltip: "2+ years — SHIFTit Healthcare Portal, PMS Platform & TheIndia Travel. SSR, SSG, App Router, API routes." },
  { name: "TypeScript", percentage: 75, Icon: SiTypescript, color: "#3178C6", level: "Intermediate", tooltip: "Used in SHIFTit and PMS platform. Interfaces, generics, type-safe API responses." },
  { name: "JavaScript (ES6+)", percentage: 85, Icon: SiJavascript, color: "#F7DF1E", level: "Advanced", tooltip: "2+ years of modern JS — async/await, closures, event delegation, performance optimization." },
  { name: "Redux", percentage: 65, Icon: SiRedux, color: "#764ABC", level: "Intermediate", tooltip: "State management using Redux and Redux Toolkit in enterprise SaaS applications." },
  { name: "GraphQL", percentage: 70, Icon: SiGraphql, color: "#E10098", level: "Intermediate", tooltip: "Used in QuickHub (Cloudpeak). Queries, mutations, fragments, Apollo Client." },
  { name: "REST APIs / Axios", percentage: 85, Icon: SiAxios, color: "#5A29E4", level: "Advanced", tooltip: "Extensive experience consuming and designing REST APIs with Axios across multiple production projects." },
  { name: "JWT / Auth", percentage: 75, Icon: FaServer, color: "#FF6C37", level: "Intermediate", tooltip: "Implemented JWT authentication, role-based access control (RBAC), and secure session management." },
];

const stylingSkills: Skill[] = [
  { name: "Tailwind CSS", percentage: 95, Icon: SiTailwindcss, color: "#06B6D4", level: "Expert", tooltip: "Primary styling tool for 1.5+ years — used in all recent projects for rapid, responsive UI development." },
  { name: "Material UI (MUI)", percentage: 85, Icon: SiMui, color: "#007FFF", level: "Advanced", tooltip: "Used across multiple projects for component-based design systems and dashboard layouts." },
  { name: "Bootstrap CSS", percentage: 88, Icon: SiBootstrap, color: "#7952B3", level: "Advanced", tooltip: "3 years of Bootstrap experience for responsive grids and component-based styling." },
  { name: "HTML5", percentage: 95, Icon: FaHtml5, color: "#E34F26", level: "Expert", tooltip: "3+ years building semantic, accessible, SEO-friendly HTML structures." },
  { name: "CSS3", percentage: 90, Icon: FaCss3Alt, color: "#1572B6", level: "Advanced", tooltip: "Animations, flexbox, grid, custom properties, and cross-browser compatibility." },
];

const backendSkills: Skill[] = [
  { name: "Node.js", percentage: 50, Icon: SiNodedotjs, color: "#339933", level: "Basic", tooltip: "Working knowledge for building REST APIs and middleware." },
  { name: "Express.js", percentage: 50, Icon: SiExpress, color: "#ffffff", level: "Basic", tooltip: "Building RESTful APIs with CRUD operations and middleware." },
  { name: "MongoDB", percentage: 60, Icon: SiMongodb, color: "#47A248", level: "Intermediate", tooltip: "Schema design, aggregation pipelines, Mongoose ODM." },
  { name: "PostgreSQL", percentage: 40, Icon: SiPostgresql, color: "#336791", level: "Basic", tooltip: "Basic schema design and complex queries." },
  { name: "SQL", percentage: 45, Icon: FaDatabase, color: "#4479A1", level: "Basic", tooltip: "Relational databases, joins, and data manipulation." },
  { name: "Firebase", percentage: 65, Icon: SiFirebase, color: "#FFCA28", level: "Intermediate", tooltip: "Used in Connectify — Realtime Database and Authentication." },
  { name: "NestJS", percentage: 55, Icon: SiNestjs, color: "#E0234E", level: "Basic", tooltip: "Used in QuickHub project at Cloudpeak Technologies for backend modules." },
];

const deploymentSkills: Skill[] = [
  { name: "cPanel", percentage: 70, Icon: SiCpanel, color: "#FF6C2C", level: "Intermediate", tooltip: "Managed production deployments and server configurations at Olbuz." },
  { name: "Netlify / Render", percentage: 80, Icon: SiNetlify, color: "#00C7B7", level: "Advanced", tooltip: "Deployed personal projects including Uber Clone (Render) and portfolio (Netlify)." },
  { name: "CI/CD Pipelines", percentage: 60, Icon: FaTools, color: "#6366F1", level: "Intermediate", tooltip: "Automated deployment workflows for scalable frontend applications." },
  { name: "Git / GitHub", percentage: 88, Icon: SiGithub, color: "#ffffff", level: "Advanced", tooltip: "Version control, branching, PRs, and collaboration." },
  { name: "GitLab", percentage: 75, Icon: SiGitlab, color: "#FC6D26", level: "Intermediate", tooltip: "GitLab CI/CD and repository management." },
  { name: "Figma", percentage: 65, Icon: SiFigma, color: "#F24E1E", level: "Intermediate", tooltip: "UI design collaboration and design-to-code workflows." },
];

const tabs = [
  { id: "frontend", label: "Frontend", skills: frontendSkills },
  { id: "styling", label: "Styling & UI", skills: stylingSkills },
  { id: "backend", label: "Backend & DB", skills: backendSkills },
  { id: "tools", label: "Tools & Deploy", skills: deploymentSkills },
];

const levelColor: Record<string, string> = {
  Expert: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Advanced: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermediate: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Basic: "text-muted bg-secondary border-border",
};

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between text-sm font-medium mb-2 items-center">
        <span className="flex items-center gap-2 text-foreground">
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.4, delay, type: "spring", stiffness: 200 }}
            className="text-base shrink-0"
          >
            <skill.Icon style={{ color: skill.color }} />
          </motion.span>
          <span className="text-sm">{skill.name}</span>
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${levelColor[skill.level]}`}
          >
            {skill.level}
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.5 }}
            className="text-primary tabular-nums text-xs font-bold w-8 text-right"
          >
            {skill.percentage}%
          </motion.span>
        </div>
      </div>
      <div className="h-[4px] w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 1, 0.5, 1] }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
          }}
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
            animate={inView ? { scale: [1, 1.4, 1] } : {}}
            transition={{
              duration: 0.8,
              delay: delay + 1.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        </motion.div>
      </div>

      {/* Tooltip */}
      {skill.tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6, scale: hovered ? 1 : 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-0 mb-2 z-20 w-64 max-w-[90vw] bg-card border border-border rounded-xl p-3 text-xs text-muted-foreground leading-relaxed pointer-events-none shadow-xl"
        >
          {skill.tooltip}
        </motion.div>
      )}
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("frontend");

  const activeSkills = tabs.find((t) => t.id === activeTab)?.skills ?? [];

  return (
    <section id="skills" className="py-16 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/4 blur-[80px]" />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${10 + (i * 8) % 85}%`,
              top: `${15 + (i * 13) % 70}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4"
        >
          // Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 md:mb-10"
        >
          The tools I work with.
        </motion.h2>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6 md:mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-[var(--radius)] text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-[hsl(24_8%_5%)] font-semibold"
                  : "bg-card border border-border text-muted hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-5 md:gap-y-7 mb-8 md:mb-16">
          {activeSkills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={0.04 + (i % 7) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
