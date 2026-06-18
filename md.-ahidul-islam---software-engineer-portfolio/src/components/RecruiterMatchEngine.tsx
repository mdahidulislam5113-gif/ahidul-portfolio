/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Terminal, Database, Sparkles, Smartphone, CheckSquare, RefreshCw } from "lucide-react";
import { RECRUITER_FILTERS } from "../data";

interface RecruiterMatchEngineProps {
  activeFilterId: string | null;
  onFilterToggle: (id: string | null) => void;
}

export default function RecruiterMatchEngine({
  activeFilterId,
  onFilterToggle,
}: RecruiterMatchEngineProps) {
  // Map string icon names to Lucide elements
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Terminal":
        return <Terminal className="h-4 w-4" />;
      case "Database":
        return <Database className="h-4 w-4" />;
      case "Sparkles":
        return <Sparkles className="h-4 w-4" />;
      case "Smartphone":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Terminal className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-2xl border border-navy-100 bg-navy-800 p-5 shadow-xs" id="match-engine">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-teal-300" />
            Recruiter Match Engine
          </h2>
          <p className="text-xs text-navy-450 mt-0.5">
            Select your open requisition below to isolate proof of skills, thesis outcomes, and relevant project tiers.
          </p>
        </div>
        {activeFilterId && (
          <button
            onClick={() => onFilterToggle(null)}
            className="flex items-center gap-1 self-start rounded-full border border-teal-500/20 bg-navy-950 px-3 py-1 font-mono text-[10px] font-bold text-teal-300 hover:bg-navy-900 transition-all cursor-pointer"
            id="reset-filter-btn"
          >
            <RefreshCw className="h-3 w-3" />
            Reset Custom Highlight
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {RECRUITER_FILTERS.map((filter) => {
          const isActive = activeFilterId === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterToggle(isActive ? null : filter.id)}
              className={`group flex flex-col justify-between rounded-xl border text-left p-4 cursor-pointer transition-all ${
                isActive
                  ? "border-teal-300 bg-navy-950 text-white shadow-md ring-2 ring-teal-300/25"
                  : "border-navy-100 bg-navy-950/40 text-navy-450 hover:border-navy-200 hover:bg-navy-900 hover:text-white"
              }`}
              id={`filter-card-${filter.id}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-lg p-1.5 ${
                      isActive
                        ? "bg-navy-800 text-teal-300"
                        : "bg-navy-950 text-teal-300 group-hover:bg-navy-900"
                    }`}
                  >
                    {renderIcon(filter.icon)}
                  </div>
                  <span className="font-display text-xs font-bold leading-tight tracking-tight">
                    {filter.label}
                  </span>
                </div>
                <p
                  className={`mt-2 text-[11px] leading-relaxed ${
                    isActive ? "text-white/80" : "text-navy-450"
                  }`}
                >
                  {filter.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-navy-100/10 flex flex-wrap gap-1">
                {filter.skillsHighlighted.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded-sm ${
                      isActive
                        ? "bg-navy-800 text-teal-300 border border-teal-500/20"
                        : "bg-navy-900 text-navy-450"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
                {filter.skillsHighlighted.length > 3 && (
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded-sm ${
                      isActive ? "bg-navy-800 text-teal-300" : "bg-navy-900 text-navy-450"
                    }`}
                  >
                    +{filter.skillsHighlighted.length - 3} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
