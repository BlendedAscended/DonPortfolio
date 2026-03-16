import * as React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/timeline";

export function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-bg-primary py-16 px-6 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Identity Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-geist text-2xl font-bold text-white tracking-tight">{identity.name}</h3>
            <p className="text-text-secondary font-medium">{identity.title}</p>
            <p className="max-w-xs text-sm text-text-tertiary">"{identity.methodology}"</p>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-geist text-sm uppercase tracking-wider text-text-primary">Navigation</h4>
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-sm text-text-secondary hover:text-white transition-colors">Home</a>
              <a href="#domains" className="text-sm text-text-secondary hover:text-white transition-colors">Domains Matrix</a>
              <a href="#timeline" className="text-sm text-text-secondary hover:text-white transition-colors">Experience Timeline</a>
              <a href="#projects" className="text-sm text-text-secondary hover:text-white transition-colors">Project Showcase</a>
            </nav>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col space-y-4 md:items-end">
            <h4 className="font-geist text-sm uppercase tracking-wider text-text-primary">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/sandeepghotra" target="_blank" rel="noopener noreferrer" className="p-2 -mx-2 text-text-secondary hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/sandeepghotra" target="_blank" rel="noopener noreferrer" className="p-2 text-text-secondary hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:sandeep@example.com" className="p-2 text-text-secondary hover:text-white transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-border-subtle pt-8 md:flex-row space-y-4 md:space-y-0 text-sm text-text-tertiary">
          <p>© {new Date().getFullYear()} {identity.name}. All rights reserved.</p>
          <p className="text-center md:text-right font-medium text-text-secondary">
            "{identity.close}"
          </p>
        </div>
      </div>
    </footer>
  );
}
