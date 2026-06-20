"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, MapPin, ExternalLink } from "lucide-react";

type Project = {
  name: string;
  description: string;
  highlights: string[];
  techStack: string[];
};

type Experience = {
  id: number;
  company: string;
  role: string;
  type: string;
  duration: string;
  current: boolean;
  location: string;
  projects: Project[];
};

type Education = {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  type: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    company: "Olbuz Pvt. Ltd.",
    role: "Software Developer",
    type: "Full-time",
    duration: "March 2026 – Present",
    current: true,
    location: "Remote",
    projects: [
      {
        name: "PMS Management System (Enterprise SaaS Platform)",
        description:
          "Enterprise-level PMS platform for marketing companies to manage teams, projects, and multi-platform advertising analytics.",
        highlights: [
          "Developed enterprise-level PMS platform for marketing companies to manage teams, projects, and multi-platform advertising analytics.",
          "Built analytics dashboards for Google Ads, Meta Ads, and Bing Ads with revenue, ROAS, leads, and conversion tracking.",
          "Implemented 5-level role-based access management (RBAC) with dynamic permissions and secure access control.",
          "Developed and integrated REST APIs for platform synchronization and third-party services.",
          "Managed CI/CD pipelines and automated deployments using Cloudjiffy and cPanel.",
          "Built scalable and responsive UI using Next.js, TypeScript, and Tailwind CSS.",
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "RBAC", "CI/CD", "Cloudjiffy", "cPanel"],
      },
      {
        name: "TheIndia Travel Community",
        description:
          "Production-grade travel platform built with Next.js, maintained and enhanced with new features.",
        highlights: [
          "Maintained and enhanced production-grade travel platform built with Next.js.",
          "Managed production deployments, hosting configurations, bug fixes, and platform maintenance.",
          "Managed server configuration and deployment workflows using cPanel and Hostinger.",
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "cPanel", "Hostinger"],
      },
    ],
  },
  {
    id: 2,
    company: "Coddit64",
    role: "Software Developer",
    type: "Full-time",
    duration: "July 2025 – January 2026",
    current: false,
    location: "Remote",
    projects: [
      {
        name: "SHIFTit Health — Web Admin & Company Portal",
        description:
          "U.S.-based healthcare workforce management platform for managing hospital shifts, workers, and compliance.",
        highlights: [
          "Developed and optimized responsive healthcare management dashboards using Next.js and REST APIs.",
          "Built shift management, analytics dashboards, invoice management, and real-time communication modules.",
          "Implemented role-based shift eligibility and labor law configurations.",
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "MUI", "RBAC"],
      },
    ],
  },
  {
    id: 3,
    company: "Cloudpeak Technologies Pvt. Ltd.",
    role: "Software Developer",
    type: "Full-time",
    duration: "June 2024 – May 2025",
    current: false,
    location: "On-site",
    projects: [
      {
        name: "Quick Hub — Marketing Automation Platform",
        description:
          "Marketing automation platform enabling small businesses to manage campaigns, communication, and business workflows.",
        highlights: [
          "Developed business automation modules using React.js and NestJS.",
          "Integrated WebSockets, WhatsApp support, campaign management, and real-time communication features.",
          "Optimized responsive UI and improved application performance.",
          "Improved frontend performance and enhanced user experience across business automation modules.",
        ],
        techStack: ["React.js", "NestJS", "GraphQL", "WebSockets", "Tailwind CSS", "Node.js", "Express.js"],
      },
    ],
  },
  {
    id: 4,
    company: "Technogeeks, Pune",
    role: "Full Stack Java Developer Intern",
    type: "Internship",
    duration: "January 2024 – April 2024",
    current: false,
    location: "Pune",
    projects: [
      {
        name: "Connectify — Social Media App",
        description:
          "Full-featured social media web application using Firebase Realtime Database.",
        highlights: [
          "Developed Connectify — a social media app using Firebase Realtime Database with content-based features and advanced filtering.",
          "Implemented user authentication (login, signup, password recovery) and real-time data syncing.",
          "Developed features for creating, editing, and deleting posts, along with real-time commenting functionality.",
        ],
        techStack: ["Java", "Spring Boot", "SQL Server", "Firebase", "JavaScript", "HTML", "CSS"],
      },
    ],
  },
  {
    id: 5,
    company: "Nivaan Infotech, Visnagar",
    role: "ReactJS Developer Intern",
    type: "Internship",
    duration: "January 2023 – February 2023",
    current: false,
    location: "Visnagar",
    projects: [
      {
        name: "Docket — Word Counter App",
        description: "Word and character counter application built with React.js.",
        highlights: [
          "Enhanced usability of applications by applying accessibility standards.",
          "Developed 'Docket' — a word counter project using React.js, efficiently counting and displaying word counts.",
        ],
        techStack: ["React.js", "JavaScript", "HTML", "CSS"],
      },
    ],
  },
];

const education: Education[] = [
  {
    id: 1,
    institution: "S. R. Patel Engineering College, Unjha",
    degree: "Bachelor of Engineering in Computer Engineering",
    duration: "June 2020 – June 2024",
    grade: "8.38 CGPA",
    type: "graduation",
  },
  {
    id: 2,
    institution: "Sahjanand School Of Achiever, Gandhinagar",
    degree: "Higher Secondary Certificate — 12th Science",
    duration: "June 2018 – June 2020",
    grade: "55%",
    type: "higher-secondary",
  },
  {
    id: 3,
    institution: "N.M Nootan Serve Vidyalaya, Visnagar",
    degree: "Secondary School Certificate — 10th",
    duration: "June 2016 – June 2018",
    grade: "68%",
    type: "secondary",
  },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="bg-card border border-border rounded-[var(--radius)] overflow-hidden hover:border-primary/30 transition-colors duration-300"
    >
      {/* Header */}
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                exp.type === "Internship"
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                  : "bg-primary/15 text-primary border border-primary/20"
              }`}
            >
              {exp.type}
            </span>
            {exp.current && (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Current
              </span>
            )}
          </div>
          <p className="text-primary font-semibold text-sm mb-1">{exp.company}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span>{exp.duration}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-muted shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Expandable Projects */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-6 border-t border-border pt-5">
          {exp.projects.map((project, pi) => (
            <div key={pi}>
              <p className="text-sm font-semibold text-foreground mb-1">{project.name}</p>
              <p className="text-xs text-muted mb-3 leading-relaxed">{project.description}</p>
              <ul className="space-y-1.5 mb-4">
                {project.highlights.map((h, hi) => (
                  <li key={hi} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-0.5 shrink-0">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-medium px-2 py-0.5 bg-secondary border border-border rounded-full text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-card border border-border rounded-[var(--radius)] p-5 hover:border-primary/30 transition-colors"
    >
      <p className="text-xs text-primary font-semibold mb-1">{edu.duration}</p>
      <h4 className="text-sm font-bold text-foreground mb-0.5">{edu.institution}</h4>
      <p className="text-xs text-muted mb-2">{edu.degree}</p>
      <span className="text-[10px] font-semibold px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full">
        {edu.grade}
      </span>
    </motion.div>
  );
}

export function Experience() {
  const headerRef = useRef(null);
  const eduRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const eduInView = useInView(eduRef, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Experience */}
        <div ref={headerRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4"
          >
            // Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Where I&apos;ve worked.
          </motion.h2>
        </div>

        <div className="space-y-4 mb-24">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* Education */}
        <div ref={eduRef}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4"
          >
            // Education
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-12"
          >
            Where I studied.
          </motion.h2>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <EducationCard key={edu.id} edu={edu} index={i} />
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-card border border-border rounded-[var(--radius)] p-6"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            // Key Achievements
          </p>
          <ul className="space-y-2.5">
            {[
              "Developed an enterprise PMS platform from scratch using Next.js and TypeScript.",
              "Implemented scalable Role-Based Authentication system with 5-level role-based user management.",
              "Managed production deployments across Cloudjiffy, cPanel, and Hostinger environments.",
              "Worked on CI/CD automation and deployment workflows for scalable frontend applications.",
            ].map((achievement, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                <ExternalLink className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                {achievement}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
