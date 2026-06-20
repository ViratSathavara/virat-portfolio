import { SiGithub } from "react-icons/si";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-sm font-medium text-muted">
            Virat Sathavara © {new Date().getFullYear()}
          </div>
          <div className="text-xs text-muted/60">
            Frontend Engineer — React.js | Next.js | TypeScript
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:viratsathavara2510@gmail.com"
            aria-label="Email"
            className="text-muted hover:text-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/ViratSathavara"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-foreground transition-colors"
          >
            <SiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/virat-sathavara-576109249/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-foreground transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
