"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, Phone, Linkedin, Github, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
      }, 5000);
    }
  };

  return (
    <div className="py-16 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4 block">
            // Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl mb-4 leading-tight">
            Let&apos;s build something together.
          </h2>
          <p className="text-base text-muted max-w-xl font-light">
            Have an opportunity, project, or just want to talk? Fill the form and I&apos;ll get back to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">

          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[380px] flex items-center justify-center bg-card border border-green-500/20 rounded-[var(--radius)] p-8"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted text-sm font-light">
                    Thanks for reaching out. I&apos;ll get back to you shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={status === "loading"}
                    placeholder="John Doe"
                    className="w-full bg-card border border-border rounded-[var(--radius)] px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    placeholder="john@example.com"
                    className="w-full bg-card border border-border rounded-[var(--radius)] px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    disabled={status === "loading"}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-card border border-border rounded-[var(--radius)] px-4 py-3 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-[11px] text-muted/60 mt-1 text-right">
                    {message.length}/1000
                  </p>
                </div>

                {/* Error message */}
                {status === "error" && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 bg-destructive/10 border border-destructive/25 rounded-[var(--radius)] px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{errorMsg}</p>
                  </motion.div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.02, boxShadow: "0 0 24px hsl(38 90% 55% / 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-[hsl(24_8%_5%)] font-bold py-4 rounded-[var(--radius)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* ── RIGHT: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-7">

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <h3 className="text-xs font-semibold text-muted uppercase tracking-widest">
                    Email
                  </h3>
                </div>
                <a
                  href="mailto:viratsathavara2510@gmail.com"
                  className="text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors break-all"
                >
                  viratsathavara2510@gmail.com
                </a>
              </div>

              <div className="h-px w-full bg-border" />

              {/* Phone */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <h3 className="text-xs font-semibold text-muted uppercase tracking-widest">
                    Phone
                  </h3>
                </div>
                <a
                  href="tel:+919429086515"
                  className="text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  +91 94290 86515
                </a>
              </div>

              <div className="h-px w-full bg-border" />

              {/* Social */}
              <div>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
                  Social
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.linkedin.com/in/virat-sathavara-576109249/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors group"
                  >
                    <Linkedin className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                    LinkedIn
                    <span className="text-muted text-sm group-hover:text-primary transition-colors">↗</span>
                  </a>
                  <a
                    href="https://github.com/ViratSathavara"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors group"
                  >
                    <Github className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                    GitHub
                    <span className="text-muted text-sm group-hover:text-primary transition-colors">↗</span>
                  </a>
                </div>
              </div>

              <div className="h-px w-full bg-border" />

              {/* Availability */}
              <div className="flex items-center gap-2.5">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-muted font-light">
                  Open to Frontend Engineer / React / Next.js roles
                </span>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
