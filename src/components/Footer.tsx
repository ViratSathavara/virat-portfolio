import { SiGithub } from "react-icons/si";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo + name */}
        <div className="flex items-center gap-3">
          {/* Icon badge */}
          <div
            className="relative w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0"
            style={{
              background: "#0D0B09",
              border: "1px solid hsl(38 90% 55% / 0.2)",
            }}
          >
            <span
              className="text-[11px] font-black tracking-[-1px] leading-none"
              style={{
                background: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VS
            </span>
            <span
              className="absolute bottom-[3px] right-[2px] w-[4px] h-[4px] rounded-full"
              style={{ background: "#F59E0B" }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-foreground">
              Virat Sathavara © {new Date().getFullYear()}
            </span>
            <span className="text-[11px] text-muted/60 mt-0.5">
              Frontend Engineer — React.js | Next.js | TypeScript
            </span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:viratsathavara2510@gmail.com"
            aria-label="Email"
            className="text-muted hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/ViratSathavara"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-primary transition-colors"
          >
            <SiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/virat-sathavara-576109249/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-primary transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
