/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Cpu, BadgeAlert } from "lucide-react";
import { SKILL_CATEGORIES } from "../data";

interface SkillsGridProps {
  activeFilterId: string | null;
  highlightedSkillNames: string[];
}

export default function SkillsGrid({
  activeFilterId,
  highlightedSkillNames,
}: SkillsGridProps) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-navy-800 p-5 shadow-xs" id="skills-grid">
      <div>
        <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Cpu className="h-5 w-5 text-teal-300" />
          Core Technical Frameworks & Concepts
        </h2>
        <p className="text-xs text-navy-400 mt-0.5">
          Verifiable technical skills cataloged clearly for high recruiter scanability.
        </p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => {
          // Check if any skill in this block is active/highlighted
          const hasInnerHighlight = category.skills.some((s) =>
            highlightedSkillNames.includes(s)
          );

          return (
            <div
              key={category.title}
              className={`rounded-xl border p-4 transition-all ${
                hasInnerHighlight && activeFilterId
                  ? "border-teal-300/40 bg-navy-950/80 shadow-2xs"
                  : "border-navy-100 bg-navy-950/40"
              }`}
            >
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-teal-300">
                {category.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => {
                  const isHighlighted = highlightedSkillNames.includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`font-mono text-xs px-2.5 py-1 rounded-md transition-all ${
                        isHighlighted && activeFilterId
                          ? "bg-teal-500/10 font-bold text-teal-300 shadow-3xs ring-1 ring-teal-300/40"
                          : "bg-navy-900 text-teal-300 border border-teal-500/20 hover:border-teal-400 hover:text-white"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
