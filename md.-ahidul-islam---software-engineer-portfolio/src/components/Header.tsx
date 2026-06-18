/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, Linkedin, Github, FileText } from "lucide-react";
import { CANDIDATE_INFO } from "../data";

interface HeaderProps {
  onOpenCV?: () => void;
}

export default function Header({ onOpenCV }: HeaderProps) {
  const handleDownloadCV = () => {
    if (onOpenCV) {
      onOpenCV();
    } else {
      const originalTitle = document.title;
      document.title = "Ahidul_Islam_General_CV";
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 200);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-100 bg-navy-800/90 backdrop-blur-md print:hidden" id="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Side: Brand with Circular Avatar & Live Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-3">
            {/* Header Circle Bar - Premium Circular Profile Avatar */}
            <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-teal-300 bg-navy-950 shrink-0 shadow-md">
              <img
                src="/profile.jpg.jpeg"
                alt={CANDIDATE_INFO.name}
                className="h-full w-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.parentElement?.querySelector(".header-avatar-fallback") as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="header-avatar-fallback hidden absolute inset-0 flex items-center justify-center bg-navy-950 text-teal-300 font-display text-xs font-bold uppercase tracking-wide">
                AI
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-sm md:text-base font-bold tracking-tight text-white leading-none">
                {CANDIDATE_INFO.name}
              </span>
              <span className="font-mono text-[9px] text-teal-300 mt-1 font-semibold leading-none">
                Software Engineer
              </span>
            </div>
            <span className="hidden h-5 w-px bg-navy-850 sm:block" />
          </div>
          
          <div className="mt-1 flex items-center gap-1.5 sm:mt-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] font-bold text-teal-300 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Ready for Immediate Join
            </span>
          </div>
        </div>

        {/* Right Side: Links & CTAs */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-4 text-navy-400 sm:flex">
            <a
              href={`mailto:${CANDIDATE_INFO.email}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white hover:bg-teal-500/10 transition-all bg-navy-950/50 px-3 py-1.5 rounded-lg border border-navy-100/10"
              title="Send Direct Corporate Email"
              id="header-email-link"
            >
              <Mail className="h-3.5 w-3.5 text-teal-300" />
              <span>{CANDIDATE_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Email link on small screen sizes */}
            <a
              href={`mailto:${CANDIDATE_INFO.email}`}
              className="sm:hidden flex items-center justify-center p-2 rounded-lg text-teal-300 bg-teal-500/15 hover:bg-teal-500/25 transition-all text-xs border border-teal-500/20"
              title="Direct Email"
            >
              <Mail className="h-4 w-4" />
            </a>

            <a
              href={CANDIDATE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-navy-400 hover:bg-navy-950 hover:text-teal-300 transition-colors"
              title="GitHub Profile"
              id="header-github-btn"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href={CANDIDATE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-navy-400 hover:bg-navy-950 hover:text-teal-300 transition-colors"
              title="LinkedIn Profile"
              id="header-linkedin-btn"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-1.5 rounded-lg border border-teal-350 bg-teal-500/10 px-4 py-1.5 text-xs font-bold text-teal-300 hover:bg-teal-500/20 active:scale-97 transition-all cursor-pointer shadow-xs"
              title="View & Search CV document details first"
              id="header-resume-download"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>View CV (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
