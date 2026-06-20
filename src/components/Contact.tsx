"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold tracking-widest text-muted uppercase mb-4 block">
            // CONTACT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl mb-6">
            Let&apos;s build something together.
          </h2>
          <p className="text-lg text-muted max-w-xl">
            Have an opportunity, project, or just want to talk? I&apos;d love
            to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <div className="h-full min-h-[300px] flex items-center justify-center bg-card border border-border rounded-[var(--radius)] p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message Sent
                  </h3>
                  <p className="text-muted">
                    Thanks for reaching out! I&apos;ll get back to you soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-card border border-border rounded-[var(--radius)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-card border border-border rounded-[var(--radius)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-card border border-border rounded-[var(--radius)] px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can I help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-[var(--radius)] hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-3">
                  Email
                </h3>
                <a
                  href="mailto:viratsathavara2510@gmail.com"
                  className="text-xl font-medium text-foreground hover:text-primary transition-colors break-all"
                >
                  viratsathavara2510@gmail.com
                </a>
              </div>

              <div className="h-px w-full bg-border" />

              <div>
                <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-3">
                  Phone
                </h3>
                <a
                  href="tel:+919429086515"
                  className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                >
                  +91 94290 86515
                </a>
              </div>

              <div className="h-px w-full bg-border" />

              <div>
                <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-3">
                  Social
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://www.linkedin.com/in/virat-sathavara-576109249/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-medium text-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    LinkedIn <span className="ml-2 text-muted">↗</span>
                  </a>
                  <a
                    href="https://github.com/ViratSathavara"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-medium text-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    GitHub <span className="ml-2 text-muted">↗</span>
                  </a>
                  <a
                    href="https://virat-sathavara.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-medium text-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    Portfolio <span className="ml-2 text-muted">↗</span>
                  </a>
                </div>
              </div>

              <div className="h-px w-full bg-border" />

              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Frontend Engineer / React / Next.js roles
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
