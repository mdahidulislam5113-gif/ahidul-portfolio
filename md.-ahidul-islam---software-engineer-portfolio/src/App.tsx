/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Sparkles, Code2, Database, HelpCircle, FileText, CheckCircle, X, Download, Eye, ZoomIn, Info, BookOpen } from "lucide-react";
import { CANDIDATE_INFO, RECRUITER_FILTERS, PROJECTS } from "./data";
import Header from "./components/Header";
import RecruiterMatchEngine from "./components/RecruiterMatchEngine";
import ThesisHighlight from "./components/ThesisHighlight";
import ProjectShowcase from "./components/ProjectShowcase";
import SkillsGrid from "./components/SkillsGrid";
import AboutScanner from "./components/AboutScanner";
import AIChatAgent from "./components/AIChatAgent";

export default function App() {
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "skills" | "thesis" | "about" | "ai-chat">("overview");
  const [isImgZoomed, setIsImgZoomed] = useState(false);
  const [isCVPreviewOpen, setIsCVPreviewOpen] = useState(false);

  // Retrieve matching details based on active filter
  const activeFilter = RECRUITER_FILTERS.find((f) => f.id === activeFilterId);
  const highlightedProjects = activeFilter ? activeFilter.projectsHighlighted : [];
  const highlightedSkills = activeFilter ? activeFilter.skillsHighlighted : [];

  const handleNavigateToTab = (tabId: "overview" | "projects" | "skills" | "thesis" | "about" | "ai-chat") => {
    setActiveTab(tabId);
    setTimeout(() => {
      const el = document.getElementById("tab-content-zone");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-navy-50 font-sans tracking-normal select-none" id="portfolio-app">
      {/* Top Navigation - passed state to trigger the interactive CV Preview modal on-click */}
      <Header onOpenCV={() => setIsCVPreviewOpen(true)} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        
        {/* HERO SECTION (DECISION ZONE) */}
        <section className="relative rounded-3xl overflow-hidden border border-navy-100 bg-navy-800 shadow-xs p-6 sm:p-8 lg:p-10" id="hero-section">
          {/* Decorative subtle gradient splash */}
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-navy-200/10 blur-3xl opacity-30 pointer-events-none" />
          
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Mobile-only Top Profile Visual - Clickable to Zoom! */}
              <div 
                onClick={() => setIsImgZoomed(true)}
                className="flex items-center gap-3.5 bg-navy-950/50 p-3.5 rounded-2xl border border-navy-100/15 lg:hidden cursor-pointer hover:bg-navy-950 transition-all group"
                title="Click to zoom HD portrait"
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full blur-[2px] opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative h-18 w-18 rounded-full overflow-hidden border-2 border-teal-300 bg-navy-950 flex items-center justify-center">
                    <img
                      src="/profile.jpg.jpeg"
                      alt={CANDIDATE_INFO.name}
                      className="h-full w-full object-cover object-top transition-all duration-300 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(".avatar-fallback-mobile") as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="avatar-fallback-mobile hidden absolute inset-0 flex items-center justify-center bg-navy-950 text-teal-300 font-display text-sm font-bold uppercase tracking-wide">
                      {CANDIDATE_INFO.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-teal-500 text-white rounded-full p-1 border border-navy-950 shadow-md">
                    <ZoomIn className="h-2.5 w-2.5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-base font-bold text-white tracking-tight leading-none group-hover:text-teal-300 transition-colors">
                      {CANDIDATE_INFO.name}
                    </h3>
                    <span className="rounded-full bg-teal-500/10 text-teal-300 text-[8px] font-mono font-bold px-1.5 border border-teal-500/20 py-0.5 animate-pulse">LIVE CV</span>
                  </div>
                  <p className="font-mono text-[10px] text-teal-300 mt-1.5 font-semibold leading-none">
                    Computer Science & Engineering Graduate
                  </p>
                  <p className="font-mono text-[9px] text-navy-400 mt-1">
                    Class of {CANDIDATE_INFO.graduation} | CGPA 3.32
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-navy-100/20 px-3 py-1 border border-navy-100">
                <span className="font-mono text-[10px] font-bold text-navy-500 uppercase tracking-widest">
                  Software Engineering Candidate
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-navy-300" />
                <span className="font-mono text-[10px] font-bold text-teal-300 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-teal-300" /> AI & NLP Ingestion
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.12]">
                  {CANDIDATE_INFO.headline}
                </h1>
                
                <p className="font-sans text-sm md:text-base text-navy-400 max-w-2xl leading-relaxed">
                  {CANDIDATE_INFO.subheadline}
                </p>
              </div>

              {/* Proof line block required by system constraints */}
              <div className="border-l-4 border-navy-300 pl-4 py-1 bg-navy-950/40 rounded-r-lg max-w-xl">
                <p className="font-sans text-xs font-semibold text-navy-500 italic leading-snug">
                  “Built multiple real-world software projects in transportation, education, and system design domains.”
                </p>
              </div>

              {/* Core Hero CTAs - Navigates tabs dynamically */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleNavigateToTab("projects")}
                  className="rounded-lg border border-teal-350 bg-teal-500/10 px-5 py-2.5 text-xs font-bold text-teal-300 hover:bg-teal-500/20 active:scale-97 cursor-pointer transition-all shadow-md flex items-center gap-1.5"
                  id="hero-view-proj"
                >
                  <Code2 className="h-4 w-4 text-teal-300" />
                  <span>Explore Practical Projects</span>
                </button>
                <button
                  onClick={() => handleNavigateToTab("overview")}
                  className="rounded-lg border border-navy-100 bg-navy-950 px-5 py-2.5 text-xs font-bold text-teal-300 hover:bg-teal-500/10 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
                  id="hero-filter-btn"
                >
                  <span>Configure Hiring Filter</span>
                </button>
                <button
                  onClick={() => handleNavigateToTab("ai-chat")}
                  className="rounded-lg border border-dashed border-teal-500 bg-teal-500/5 px-5 py-2.5 text-xs font-bold text-teal-300 hover:bg-teal-500/15 cursor-pointer transition-colors flex items-center gap-1.5"
                  id="hero-chat-btn"
                >
                  <Sparkles className="h-4 w-4 text-teal-300 animate-pulse" />
                  <span>Query AI Assistant</span>
                </button>
              </div>

              {/* Contact targets bar */}
              <div className="pt-4 border-t border-navy-100 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-teal-300" />
                  <span>{CANDIDATE_INFO.location.split(" (")[0]}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Mail className="h-4 w-4 text-teal-300" />
                  <a href={`mailto:${CANDIDATE_INFO.email}`} className="hover:text-teal-300 py-0.5 px-1 bg-navy-950/20 rounded hover:bg-navy-950/40 border border-transparent hover:border-navy-100/10 transition-all font-semibold text-teal-300">
                    {CANDIDATE_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Phone className="h-4 w-4 text-teal-300" />
                  <a href={`tel:${CANDIDATE_INFO.phone}`} className="hover:text-teal-300 transition-colors">
                    {CANDIDATE_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Mini Metric Dash & Visual Graphic */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Clean Minimalist Candidate Graphic Card */}
              <div className="rounded-2xl border border-navy-100 bg-navy-950 p-5 text-white shadow-lg overflow-hidden relative">
                {/* Visual code decoration */}
                <div className="absolute bottom-[-20px] right-[-20px] text-navy-800 font-mono text-[80px] leading-none select-none opacity-10 font-bold">
                  {"<>"}
                </div>
                
                <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4.5 w-4.5 text-teal-300" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal-300">
                      Engineering Proof Desk
                    </span>
                  </div>
                  <span className="rounded-full bg-teal-500/20 text-teal-300 font-mono text-[8px] font-bold px-2 py-0.5 border border-teal-500/30 animate-pulse">
                    IMMEDIATE JOINER
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {/* High definition profile image & metadata display - Bigger and Clickable! */}
                  <div className="flex flex-col items-center text-center p-4 bg-navy-900/60 rounded-xl border border-navy-800/50 relative group">
                    <div 
                      onClick={() => setIsImgZoomed(true)}
                      className="relative shrink-0 cursor-pointer"
                      title="Click to Zoom HD Portrait"
                    >
                      {/* Hover ring effects */}
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full blur-[4px] opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Big Portrait Frame */}
                      <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden border-3 border-teal-300 bg-navy-950 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xl">
                        <img
                          src="/profile.jpg.jpeg"
                          alt={CANDIDATE_INFO.name}
                          className="h-full w-full object-cover object-top transition-all duration-300 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.parentElement?.querySelector(".avatar-fallback") as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div className="avatar-fallback hidden absolute inset-0 flex items-center justify-center bg-navy-950 text-teal-300 font-display text-2xl font-bold uppercase tracking-wide">
                          {CANDIDATE_INFO.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </div>
                      </div>

                      {/* Floating zoom indicator */}
                      <div className="absolute bottom-1 right-1 bg-teal-500 hover:bg-teal-400 text-white rounded-full p-1.5 border border-navy-950 shadow-md transition-all">
                        <ZoomIn className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>

                    <div className="mt-3.5">
                      <h3 className="font-display text-lg font-extrabold text-white tracking-tight">
                        {CANDIDATE_INFO.name}
                      </h3>
                      <p className="font-mono text-xs text-teal-300 mt-1 font-semibold">
                        CSE Graduate & Software Engineer
                      </p>
                      <button 
                        onClick={() => setIsImgZoomed(true)}
                        className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] text-navy-450 hover:text-teal-300 tracking-wider uppercase bg-navy-950/80 px-2 py-0.5 rounded-full border border-navy-800 transition-colors"
                      >
                        <Eye className="h-2.5 w-2.5" />
                        <span>Click to Expand HD Portrait</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] text-teal-300 font-semibold uppercase tracking-wider">
                      Target Role
                    </p>
                    <p className="font-sans text-xs text-white mt-0.5 leading-relaxed">
                      {CANDIDATE_INFO.role}
                    </p>
                  </div>

                  {/* Core KPI metrics list */}
                  <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-navy-800">
                    <div className="bg-navy-900/60 p-2.5 rounded-lg border border-navy-800/30">
                      <p className="font-mono text-[9px] text-navy-400 uppercase tracking-widest leading-none">
                        Thesis Accuracy
                      </p>
                      <p className="font-display text-xl font-bold text-teal-300 mt-1">
                        94.2%
                      </p>
                    </div>
                    <div className="bg-navy-900/60 p-2.5 rounded-lg border border-navy-800/30">
                      <p className="font-mono text-[9px] text-navy-400 uppercase tracking-widest leading-none">
                        B.Sc CGPA
                      </p>
                      <p className="font-display text-xl font-bold text-teal-300 mt-1">
                        3.32 / 4.0
                      </p>
                    </div>
                  </div>

                  <div className="bg-navy-900/40 p-3 rounded-lg border border-navy-850 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[9px] text-navy-400 uppercase tracking-widest leading-none">
                        Primary Stack
                      </p>
                      <p className="text-[11px] font-semibold text-navy-200 mt-1">
                        Python, SQL, PHP, Dart
                      </p>
                    </div>
                    <Database className="h-5 w-5 text-teal-300/80" />
                  </div>
                </div>
              </div>

              {/* Recruitment confidence box */}
              <div className="rounded-2xl border border-navy-100 bg-navy-950 p-4 border-dashed">
                <h4 className="font-display text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-teal-300" />
                  Hiring Confidence
                </h4>
                <p className="text-[11px] text-navy-400 mt-1.5 leading-relaxed">
                  He maintains verifiable public repository files for every system mentioned. Feel free to clone or inspect his code layouts directly under the projects view below.
                </p>
              </div>
            </div>
            
          </div>
        </section>

        {/* TAB NAVIGATION PANEL */}
        <div className="bg-navy-800 p-2.5 rounded-2xl border border-navy-100 flex flex-wrap gap-2.5 sticky top-[68px] z-30 shadow-lg backdrop-blur-md" id="tab-controls-root">
          {[
            { id: "overview", label: "Overview & Matcher", icon: Sparkles, badge: "DECISION ZONE" },
            { id: "projects", label: "Practical Projects", icon: Code2, badge: "PORTFOLIO" },
            { id: "skills", label: "Technical Skills", icon: Database },
            { id: "thesis", label: "Academic Thesis", icon: BookOpen },
            { id: "about", label: "Biographical Info", icon: Info },
            { id: "ai-chat", label: "AI Representative Bot", icon: Sparkles, badge: "GEMINI 3.5" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigateToTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold whitespace-nowrap cursor-pointer transition-all border shrink-0 ${
                  isActive
                    ? "bg-teal-500/15 border-teal-400/40 text-teal-300 shadow-md scale-[1.02]"
                    : "border-transparent text-navy-400 hover:bg-navy-950/60 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-teal-300" : "text-navy-450"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`ml-1 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${isActive ? "bg-teal-500/20 text-teal-300 animate-pulse" : "bg-navy-900 text-navy-400"}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT ZONE */}
        <div id="tab-content-zone" className="pt-2">
          {activeTab === "overview" && (
            <div className="space-y-10">
              <RecruiterMatchEngine
                activeFilterId={activeFilterId}
                onFilterToggle={(id) => setActiveFilterId(id)}
              />
              <div className="grid gap-6 md:grid-cols-12 bg-navy-800 p-6 rounded-2xl border border-navy-100/60">
                <div className="md:col-span-8 space-y-4">
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-teal-300" /> Executive Candidate Summary
                  </h3>
                  <p className="text-xs text-navy-400 leading-relaxed">
                    Welcome! I am Md. Ahidul Islam, a fresh Computer Science & Engineering graduate of Daffodil International University. Fully motivated and ready to build scalable full-stack applications of tomorrow.
                  </p>
                  <p className="text-xs text-navy-400 leading-relaxed">
                    By choosing the <strong className="text-teal-300">"Hiring Filter"</strong> buttons above, this cockpit dynamically highlights exactly how my practical projects, B.Sc. thesis, and skills align with your business goals.
                  </p>
                </div>
                <div className="md:col-span-4 bg-navy-950/40 p-4 rounded-xl border border-navy-100/15 flex flex-col justify-center space-y-2">
                  <span className="text-[10px] uppercase font-mono font-bold text-teal-300 tracking-wider">Quick Action Panel</span>
                  <button 
                    onClick={() => handleNavigateToTab("projects")}
                    className="w-full text-left font-display text-xs font-semibold text-white hover:text-teal-300 py-1.5 px-2 bg-navy-950 hover:bg-navy-900 rounded border border-navy-850 flex items-center justify-between cursor-pointer"
                  >
                    <span>Browse {PROJECTS.length} Built Projects</span>
                    <Code2 className="h-4 w-4 text-teal-300" />
                  </button>
                  <button 
                    onClick={() => handleNavigateToTab("ai-chat")}
                    className="w-full text-left font-display text-xs font-semibold text-white hover:text-teal-300 py-1.5 px-2 bg-navy-950 hover:bg-navy-900 rounded border border-navy-850 flex items-center justify-between cursor-pointer"
                  >
                    <span>Test Interactive Agent Screening</span>
                    <Sparkles className="h-4 w-4 text-teal-300" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "thesis" && (
            <ThesisHighlight
              isHighlightedByFilter={
                activeFilter ? activeFilter.projectsHighlighted.includes("thesis_ai") : false
              }
            />
          )}

          {activeTab === "projects" && (
            <ProjectShowcase
              activeFilterId={activeFilterId}
              highlightedProjectIds={highlightedProjects}
            />
          )}

          {activeTab === "skills" && (
            <SkillsGrid
              activeFilterId={activeFilterId}
              highlightedSkillNames={highlightedSkills}
            />
          )}

          {activeTab === "about" && (
            <AboutScanner />
          )}

          {activeTab === "ai-chat" && (
            <section className="grid gap-6 md:grid-cols-5" id="ai-representative">
              {/* Actionable Invitation block */}
              <div className="md:col-span-2 rounded-2xl border border-navy-100 bg-navy-800 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-navy-950 px-2 py-0.5 font-mono text-[9px] font-bold text-teal-300 border border-teal-500/20 text-center uppercase tracking-wider">
                      Contact Decision Hub
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight mt-3">
                    Setup Interview or Technical Sync
                  </h3>
                  <p className="text-xs text-navy-400 leading-relaxed mt-2">
                    Evaluate Md. Ahidul Islam for open software apprenticeships, internships, or entry-level developer positions in Dhaka or remote.
                  </p>

                  <div className="mt-5 space-y-3.5">
                    {[
                      { name: "Direct Corporate Email", val: CANDIDATE_INFO.email, href: `mailto:${CANDIDATE_INFO.email}` },
                      { name: "Mobile Call Service", val: CANDIDATE_INFO.phone, href: `tel:${CANDIDATE_INFO.phone}` },
                      { name: "Professional LinkedIn Network", val: "Md. Ahidul Islam Profile", href: CANDIDATE_INFO.linkedin }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-navy-950/60 p-2.5 rounded-lg border border-navy-100">
                        <div>
                          <p className="font-mono text-[9.5px] uppercase tracking-wider text-teal-300/85">{item.name}</p>
                          <p className="font-sans text-xs font-semibold text-white mt-0.5">{item.val}</p>
                        </div>
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : "_self"}
                          rel="noreferrer"
                          className="rounded bg-navy-900 p-1.5 text-teal-300 hover:bg-navy-850 hover:text-white border border-teal-500/20 transition-all cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-navy-100 pt-4 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-mono text-[10px] text-teal-300 font-semibold italic">
                    Immediate joiner for Dhaka (On-site / Hybrid) and globally (Remote).
                  </span>
                </div>
              </div>

              {/* Chat Assistant */}
              <div className="md:col-span-3">
                <AIChatAgent />
              </div>
            </section>
          )}
        </div>

      </main>

      {/* 1. PORTRAIT LIGHTBOX MODAL */}
      {isImgZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-md p-4 print:hidden animate-fade-in">
          <div className="relative max-w-md w-full bg-navy-900 border border-navy-100/30 rounded-2xl overflow-hidden p-6 shadow-2xl flex flex-col items-center">
            <button 
              onClick={() => setIsImgZoomed(false)}
              className="absolute top-4 right-4 text-navy-400 hover:text-white p-1 hover:bg-navy-950/80 rounded-full cursor-pointer transition-colors"
              title="Close image zoom"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="h-72 w-72 rounded-full overflow-hidden border-4 border-teal-300 shadow-2xl mt-4">
              <img 
                src="/profile.jpg.jpeg" 
                alt={CANDIDATE_INFO.name} 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <h3 className="font-display text-xl font-bold text-white mt-5">{CANDIDATE_INFO.name}</h3>
            <p className="font-mono text-xs text-teal-300 mt-1">Software Engineer Portrait</p>
            <p className="text-xs text-navy-400 max-w-sm text-center leading-relaxed mt-2.5">
              Computer Science & Engineering graduate of Daffodil International University. Ready to build high-end client & server layouts immediately.
            </p>
            
            <button 
              onClick={() => setIsImgZoomed(false)}
              className="mt-6 w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-display text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer shadow-md text-center"
            >
              Close Portrait View
            </button>
          </div>
        </div>
      )}

      {/* 2. PDF CV REAL PREVIEWER MODAL */}
      {isCVPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-md p-4 sm:p-6 print:hidden">
          <div className="relative max-w-5xl w-full bg-navy-900 border border-navy-100/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
            
            {/* Header portion of Modal */}
            <div className="px-5 py-4 bg-navy-950/80 border-b border-navy-100/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-teal-350" />
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                    Ahidul_Islam_General_CV.pdf
                  </h3>
                  <p className="font-mono text-[9px] text-teal-300 font-semibold leading-none mt-1">
                    Direct interactive preview • Verifiable file
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href="/Ahidul_Islam_General_CV.pdf"
                  download="Ahidul_Islam_General_CV.pdf"
                  className="flex items-center gap-1.5 rounded-lg border border-teal-350 bg-teal-500/15 px-3 py-1.5 text-xs font-bold text-teal-300 hover:bg-teal-500/25 active:scale-97 transition-all cursor-pointer"
                  title="Direct download file"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download PDF Direct</span>
                </a>
                
                <button 
                  onClick={() => setIsCVPreviewOpen(false)}
                  className="text-navy-400 hover:text-white p-1.5 hover:bg-navy-950 rounded-full cursor-pointer transition-colors"
                  title="Close PDF view"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Body portion - PDF Iframe visualizer */}
            <div className="flex-1 bg-navy-950 overflow-hidden relative p-1.5 flex flex-col justify-center items-center">
              <iframe
                src="/Ahidul_Islam_General_CV.pdf"
                className="w-full h-full rounded-2xl border border-navy-800/40 shadow-inner bg-white/5"
                title="Ahidul Islam General CV Preview"
              />
            </div>
            
            {/* Footer portion of Modal */}
            <div className="px-5 py-3.5 bg-navy-950/40 border-t border-navy-100/10 text-center text-[10px] text-navy-400 flex flex-col sm:flex-row items-center sm:justify-between gap-2.5">
              <span className="font-mono text-teal-300 font-bold uppercase tracking-wider">
                Immediate Availability Dhaka Bangladesh / Global Remote
              </span>
              <button 
                onClick={() => setIsCVPreviewOpen(false)}
                className="px-5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-850 hover:text-white text-navy-400 text-xs font-bold transition-all cursor-pointer"
              >
                Close Document Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer credits blocks */}
      <footer className="mt-16 border-t border-navy-100 bg-navy-800 py-8" id="app-footer">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-navy-400 space-y-2 sm:px-6 lg:px-8">
          <p className="font-display font-bold text-teal-300">
            Md. Ahidul Islam — Software Engineering Portfolio
          </p>
          <p className="font-sans text-[11px] text-navy-400">
            Engineered using full-stack React, Vite, Tailwind CSS v4, Express, and Google Gemini API.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-navy-400 font-mono text-[10px]">
            <a href={CANDIDATE_INFO.github} target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">GitHub Repository</a>
            <span>•</span>
            <a href={CANDIDATE_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">LinkedIn Profile</a>
            <span>•</span>
            <a href={`mailto:${CANDIDATE_INFO.email}`} className="hover:text-teal-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
