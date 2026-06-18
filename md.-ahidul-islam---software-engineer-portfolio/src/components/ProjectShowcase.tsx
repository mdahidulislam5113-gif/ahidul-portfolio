/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FolderGit2, Github, ExternalLink, HelpCircle, BadgeAlert, Layers, ArrowRight, ShieldAlert } from "lucide-react";
import { PROJECTS } from "../data";
import { Project, ProjectTier } from "../types";

interface ProjectShowcaseProps {
  activeFilterId: string | null;
  highlightedProjectIds: string[];
}

export default function ProjectShowcase({
  activeFilterId,
  highlightedProjectIds,
}: ProjectShowcaseProps) {
  // Store which projects have their architecture/schema diagrams expanded
  const [expandedArchitectureId, setExpandedArchitectureId] = useState<string | null>(null);

  const renderTierGroup = (tier: ProjectTier) => {
    const tierProjects = PROJECTS.filter((p) => p.tier === tier);

    return (
      <div key={tier} className="space-y-4">
        <div className="border-b border-navy-100/40 pb-2">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-teal-300 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            {tier}
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {tierProjects.map((project) => {
            const isHighlighted = highlightedProjectIds.includes(project.id);
            const isDiagExpanded = expandedArchitectureId === project.id;

            return (
              <div
                key={project.id}
                className={`flex flex-col justify-between rounded-xl border bg-navy-800 p-5 transition-all duration-300 ${
                  isHighlighted
                    ? "border-amber-400 bg-amber-500/5 shadow-md ring-4 ring-amber-400/10"
                    : "border-navy-100 hover:border-navy-200 hover:shadow-xs"
                }`}
                id={`project-card-${project.id}`}
              >
                {/* Header Block */}
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.metadata.split(", ").map((tech, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[9px] font-semibold text-teal-300 bg-navy-950 border border-teal-500/20 px-2 py-0.5 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isHighlighted && (
                        <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded-xs animate-pulse">
                          <BadgeAlert className="h-2.5 w-2.5" /> High Match
                        </span>
                      )}
                      
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded p-1 text-navy-450 hover:bg-navy-950 hover:text-teal-300 transition-colors"
                          title="View Repository"
                          id={`proj-github-${project.id}`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="font-display text-base font-bold text-white mt-2.5">
                    {project.title}
                  </h4>
                  <p className="text-xs font-semibold text-teal-300 italic leading-snug mt-0.5">
                    {project.positioning}
                  </p>

                  {/* Bullet Evidence */}
                  <ul className="mt-4 space-y-2">
                    {project.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2 text-xs text-navy-450">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Challenge Callout */}
                  {project.keyChallenges && (
                    <div className="mt-4 rounded-lg bg-red-500/5 p-2.5 border border-red-500/25">
                      <p className="font-display text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5" /> Backend Challenge Solved
                      </p>
                      <p className="text-[11px] leading-relaxed text-red-250 mt-1">
                        {project.keyChallenges}
                      </p>
                    </div>
                  )}
                </div>

                {/* Architecture Expand / CTA bottom */}
                {project.architectureFlow && (
                  <div className="mt-5 pt-4 border-t border-navy-100/50">
                    <button
                      onClick={() => setExpandedArchitectureId(isDiagExpanded ? null : project.id)}
                      className="text-[11px] font-bold text-teal-300 hover:text-white flex items-center gap-1.5 cursor-pointer hover:underline"
                      id={`proj-diag-toggle-${project.id}`}
                    >
                      <Layers className="h-3.5 w-3.5 text-teal-300" />
                      <span>{isDiagExpanded ? "Hide Database & Routing Spec" : "Explore DB & Routing Architecture"}</span>
                    </button>

                    {isDiagExpanded && (
                      <div className="mt-3 rounded-lg bg-navy-950 p-3 border border-navy-100 animate-fadeIn">
                        <p className="font-mono text-[9px] font-semibold text-navy-450 uppercase tracking-widest">
                          System Transaction Flow diagram:
                        </p>
                        
                        {/* Flow Nodes representation */}
                        <div className="mt-2.5 flex flex-wrap items-center gap-1">
                          {project.architectureFlow.nodes.map((node, nIdx) => (
                            <React.Fragment key={nIdx}>
                              <div className="rounded border border-teal-500/20 bg-navy-900 px-2 py-1 font-mono text-[9px] font-medium text-white shadow-3xs">
                                {node}
                              </div>
                              {nIdx < project.architectureFlow.nodes.length - 1 && (
                                <ArrowRight className="h-3 w-3 text-teal-300 stretch-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <p className="text-[10px] text-navy-450 leading-relaxed mt-2.5 italic border-t border-navy-100 pt-2">
                          {project.architectureFlow.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8" id="projects-showcase">
      <div>
        <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <FolderGit2 className="h-5 w-5 text-teal-300" />
          Technical Project Portfolio
        </h2>
        <p className="text-xs text-navy-450 mt-0.5">
          Organized by priority tier to establish immediate database normalization and software flow safety.
        </p>
      </div>

      <div className="space-y-8">
        {[ProjectTier.TIER_1, ProjectTier.TIER_2, ProjectTier.TIER_3].map((tier) =>
          renderTierGroup(tier)
        )}
      </div>
    </div>
  );
}
