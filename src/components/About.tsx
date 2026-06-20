"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";

function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return { count, start };
}

const stats = [
  { label: "Years Experience", target: 2, suffix: "+" },
  { label: "Projects Built", target: 10, suffix: "+" },
  { label: "Companies", target: 3, suffix: "" },
];

const techBadges = [
  "React.js", "Next.js", "TypeScript", "JavaScript",
  "Tailwind CSS", "Material UI", "Redux", "GraphQL",
  "REST API", "JWT", "Node.js", "MongoDB",
  "Firebase", "Git", "CI/CD", "Figma",
];

function StatCard({
  label,
  target,
  suffix,
  delay,
}: {
  label: string;
  target: number;
  suffix: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { count, start } = useCounter(target);

  useEffect(() => {
    if (inView) start();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className="group bg-card border border-border rounded-[var(--radius)] p-7 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_28px_hsl(38_90%_55%_/_0.08)]"
    >
      <div className="text-4xl font-bold text-primary mb-1 tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted font-medium">{label}</div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4"
        >
          // About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl mb-16 leading-tight"
        >
          A developer who cares about the details.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[1.05rem] text-muted-foreground leading-[1.85] mb-6 font-light">
              I&apos;m Virat Sathavara, a Frontend Engineer based in Gujarat, India.
              With 2+ years of professional experience, I specialize in building
              scalable and responsive web applications using React.js, Next.js,
              and TypeScript.
            </p>
            <p className="text-[1.05rem] text-muted-foreground leading-[1.85] font-light mb-8">
              I&apos;ve worked on enterprise SaaS platforms, healthcare workforce
              portals, and marketing automation tools — delivering production-ready
              apps with a strong focus on scalability, performance optimization,
              and user experience.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4 text-primary shrink-0" />
                <span>Software Developer @ Olbuz Pvt. Ltd. (Current)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                <span>B.E. Computer Engineering — S. R. Patel Engineering College (8.38 CGPA)</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Gujarat, India", "Open to Remote", "Open to Frontend Engineer / React / Next.js roles"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 border border-border rounded-full text-muted"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <div>
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={0.15 + i * 0.08} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-medium px-3 py-1.5 bg-card border border-border rounded-full text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
