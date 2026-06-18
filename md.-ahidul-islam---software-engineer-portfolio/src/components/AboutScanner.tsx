/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { GraduationCap, Award, BookOpen, Clock, Globe } from "lucide-react";
import { CANDIDATE_INFO } from "../data";

export default function AboutScanner() {
  return (
    <div className="grid gap-5 lg:grid-cols-5" id="about-scanner">
      {/* Short Bio Block (Left 3 cols) */}
      <div className="lg:col-span-3 rounded-2xl border border-navy-100 bg-navy-800 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-teal-300" />
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Recruiter Cheat Sheet & Bio Summary
            </h2>
          </div>
          
          <div className="mt-4 space-y-3.5">
            {CANDIDATE_INFO.aboutHighlights.map((highlight, idx) => (
              <p key={idx} className="text-xs leading-relaxed text-navy-450">
                {highlight}
              </p>
            ))}
          </div>
        </div>

        {/* Live Learning block */}
        <div className="mt-5 border-t border-navy-100 pt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Currently Deep Learning:
            </span>
            <p className="mt-1 font-mono text-xs font-semibold text-white">
              FastAPI, Docker & PostgreSQL
            </p>
          </div>
          <div>
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" /> Languages Spoken:
            </span>
            <p className="mt-1 font-mono text-xs font-semibold text-white">
              Bengali (Native) | English (Professional)
            </p>
          </div>
        </div>
      </div>

      {/* Education & Certs (Right 2 cols) */}
      <div className="lg:col-span-2 space-y-5">
        
        {/* Academic path */}
        <div className="rounded-2xl border border-navy-100 bg-navy-800 p-5 shadow-3xs">
          <h3 className="font-display text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <GraduationCap className="h-4.5 w-4.5 text-teal-300" /> Academic Background
          </h3>

          <div className="mt-4 space-y-3">
            <div className="border-l-2 border-teal-300 pl-3">
              <p className="font-display text-xs font-bold text-white leading-tight">
                B.Sc. in Computer Science & Engineering
              </p>
              <p className="text-[11px] font-semibold text-navy-450 leading-none mt-0.5">
                {CANDIDATE_INFO.university}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                <span className="bg-navy-950 font-semibold text-teal-300 px-1.5 py-0.5 rounded-sm">
                  CGPA: {CANDIDATE_INFO.cgpa}
                </span>
                <span className="bg-navy-950 text-navy-450 px-1.5 py-0.5 rounded-sm border border-navy-100">
                  Graduating {CANDIDATE_INFO.graduation}
                </span>
              </div>
            </div>

            <div className="border-l-2 border-navy-100 pl-3">
              <p className="font-display text-xs font-semibold text-white leading-tight">
                Higher Secondary Certificate (HSC)
              </p>
              <p className="text-[11px] text-navy-450 leading-none mt-0.5">
                Mohammadpur Govt. College, Dhaka
              </p>
              <p className="font-mono text-[10px] text-teal-300/80 leading-none mt-1">
                GPA: 4.08 / 5.00 | 2019
              </p>
            </div>

            <div className="border-l-2 border-navy-100 pl-3">
              <p className="font-display text-xs font-semibold text-white leading-tight">
                Secondary School Certificate (SSC)
              </p>
              <p className="text-[11px] text-navy-450 leading-none mt-0.5">
                Dhaka Shiksha Board Laboratory School
              </p>
              <p className="font-mono text-[10px] text-teal-300/80 leading-none mt-1">
                GPA: 4.95 / 5.00 | 2017
              </p>
            </div>
          </div>
        </div>

        {/* Certifications and self education */}
        <div className="rounded-2xl border border-navy-100 bg-navy-800 p-5 shadow-3xs">
          <h3 className="font-display text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <Award className="h-4.5 w-4.5 text-teal-300" /> Certificates & Self-Learning
          </h3>

          <div className="mt-3.5 space-y-2.5">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-teal-300">
                Completed Credentials:
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {["Git & GitHub Fundamentals", "Linux CLI Essentials", "Python Data Processing"].map((cert) => (
                  <span
                    key={cert}
                    className="font-sans text-[10px] font-medium text-navy-450 bg-navy-950 border border-navy-100 px-2 py-0.5 rounded-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-teal-300">
                Active Curricular Ingestion:
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {["FastAPI Sandbox Series", "Docker for Developers", "PostgreSQL Tables Normalization", "Advanced Excel Data Filtering"].map((learn) => (
                  <span
                    key={learn}
                    className="font-sans text-[10px] font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-sm"
                  >
                    {learn}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
