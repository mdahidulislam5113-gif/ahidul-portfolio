/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Brain, Cpu, Database, ChevronRight, Play, Layers, BadgeAlert } from "lucide-react";
import { CANDIDATE_INFO } from "../data";

interface SimulatorExample {
  id: string;
  title: string;
  rawText: string;
  expectedJson: string;
}

const PARSING_EXAMPLES: SimulatorExample[] = [
  {
    id: "ex_ahidul",
    title: "Md. Ahidul Islam Resume Block",
    rawText: `Md. Ahidul Islam\nSoftware Engineer | Python, AI\nmdahidulislam5113@gmail.com\nDhaka, Bangladesh\nB.Sc in CSE. CGPA: 3.32/4.00`,
    expectedJson: JSON.stringify({
      candidate_profile: {
        name: "Md. Ahidul Islam",
        primary_title: "Software Engineer",
        focus: "Python, AI & Backend Systems",
        contact: {
          email: "mdahidulislam5113@gmail.com",
          location: "Dhaka, Bangladesh"
        },
        credentials: {
          degree: "B.Sc in CSE",
          grade_cgpa: "3.32/4.00",
          status: "Graduated"
        }
      }
    }, null, 2)
  },
  {
    id: "ex_sec",
    title: "Relational DB Experience Snippet",
    rawText: `BusBd Project: Built transport booking validation logic. Integrated normalized MySQL schema to bypass double booking states. PHP routing API.`,
    expectedJson: JSON.stringify({
      analyzed_project: {
        project_name: "BusBd",
        primary_stack: ["PHP", "MySQL", "APIs"],
        normalized_schema: true,
        transactional_safety: "Concurrent lock mapping",
        hiring_verdict: "Strong SQL & Business Logic Foundations"
      }
    }, null, 2)
  }
];

export default function ThesisHighlight({ isHighlightedByFilter }: { isHighlightedByFilter: boolean }) {
  const [selectedExample, setSelectedExample] = useState<SimulatorExample>(PARSING_EXAMPLES[0]);
  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);
  const [outputJson, setOutputJson] = useState<string>("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulatedLog([]);
    setOutputJson("");
    setActiveStep(1);

    const steps = [
      { msg: "[STG 1/3] Reading document nodes & raw coordinate layouts...", delay: 300, step: 1 },
      { msg: "[STG 2/3] Performing segment alignment against LayoutLMv3 nodes...", delay: 800, step: 2 },
      { msg: "[STG 3/3] Querying Qwen2 LLM reasoning rules with prompt schemas...", delay: 1300, step: 3 },
      { msg: "✔ Validation score: 94.2% accuracy. Outputting strict schema:", delay: 1800, step: 4 }
    ];

    steps.forEach((s) => {
      setTimeout(() => {
        setSimulatedLog((prev) => [...prev, s.msg]);
        setActiveStep(s.step);
        if (s.step === 4) {
          setOutputJson(selectedExample.expectedJson);
          setIsSimulating(false);
        }
      }, s.delay);
    });
  };

  return (
    <section
      className={`rounded-2xl border p-5 sm:p-6 transition-all ${
        isHighlightedByFilter
          ? "border-amber-400 bg-amber-500/5 shadow-md ring-4 ring-amber-400/10"
          : "border-navy-100 bg-navy-800"
      }`}
      id="thesis-section"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-navy-950 px-2.5 py-0.5 font-mono text-[9px] font-bold text-teal-300 border border-teal-500/20 uppercase tracking-wider">
              B.Sc CSE Thesis Innovation
            </span>
            {isHighlightedByFilter && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-amber-300 animate-pulse bg-amber-500/20 px-2 py-0.5 rounded-sm">
                <BadgeAlert className="h-3 w-3" /> Core AI Alignment
              </span>
            )}
          </div>
          <h2 className="font-display text-xl font-bold tracking-tight text-white mt-2">
            Automated Form Filling via Multi-Modal NLP & LLMs
          </h2>
          <p className="font-mono text-xs font-semibold text-teal-300 mt-0.5">
            Python | LayoutLMv3 | Qwen2 API | Tesseract OCR — academic cycle (2024 - 2025)
          </p>
        </div>

        {/* Highlight Score badge */}
        <div className="flex items-center gap-2 self-start rounded-xl bg-navy-950 px-4 py-3 text-white border border-teal-500/10">
          <div className="text-right">
            <p className="font-mono text-[9px] font-medium uppercase tracking-wider text-navy-400">
              Verified Dataset Accuracy
            </p>
            <p className="font-display text-2xl font-black leading-none text-teal-300 mt-1">
              94%
            </p>
          </div>
          <Brain className="h-8 w-8 text-teal-300" />
        </div>
      </div>

      {/* Grid of details & layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        
        {/* Core Achievements (Left cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-navy-400">
              This B.Sc research project designed and benchmarked a fully autonomous, production-ready form alignment engine, mapping highly irregular document scans (Resume PDF documents, receipts, CV profiles) into structured API schema structures.
            </p>

            <ul className="space-y-2.5">
              {[
                { title: "Dual Multi-Modal Pipeline", desc: "Engineered document parsing starting with optical image preprocessing, coordinate bounding alignment (LayoutLMv3) to locate textual regions, and Tesseract region OCR extraction." },
                { title: "LLM Context Synthesis", desc: "Crafted serverless prompt alignment pipelines passing raw layout segments to the Qwen2 LLM API, ensuring high schema conformance." },
                { title: "Production Grade Python Code", desc: "Implemented strict decoupled architectural patterns, isolating data models, fetch modules, coordinate layout engines, and validation layers." },
                { title: "Benchmarked Validation", desc: "Rigorously trained and benchmarked across 180 actual resumes representing 375+ individual validation pages, holding accurate key mappings." }
              ].map((achievement, idx) => (
                <li key={idx} className="flex gap-2 text-xs">
                  <div className="mt-0.5 rounded-full bg-navy-950 p-0.5 text-teal-300 border border-teal-500/10">
                    <ChevronRight className="h-3 w-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">{achievement.title}:</strong>{" "}
                    <span className="text-navy-400">{achievement.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Architectural Data Flow */}
          <div className="mt-6 rounded-xl border border-dashed border-teal-500/25 bg-navy-950/40 p-4">
            <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" /> Pipeline Data Architecture
            </h4>
            
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {[
                { label: "Document Ingest", desc: "Raw PDF/JPG Upload" },
                { label: "LayoutLMv3 + OCR", desc: "Bounding Node Extraction" },
                { label: "Prompt Alignment", desc: "Constraint Injection" },
                { label: "Qwen2 Reasoning", desc: "Context Inference" },
                { label: "Structured JSON", desc: "DB Normalized Form" }
              ].map((step, sIdx) => (
                <React.Fragment key={sIdx}>
                  <div className="group relative rounded-md border border-teal-500/10 bg-navy-900 px-2 py-1.5 shadow-2xs">
                    <p className="font-display text-[9px] font-semibold text-white">{step.label}</p>
                    <p className="font-mono text-[8px] text-navy-400 leading-none mt-0.5">{step.desc}</p>
                  </div>
                  {sIdx < 4 && <ChevronRight className="h-3.5 w-3.5 text-teal-300" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Classifier Playground (Right cols) */}
        <div className="lg:col-span-2 rounded-xl border border-navy-100 bg-navy-950 p-4 font-mono text-[11px] text-navy-200 flex flex-col justify-between" id="thesis-sandbox">
          <div>
            <div className="flex items-center justify-between border-b border-navy-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-teal-300" />
                <span className="font-semibold text-white uppercase tracking-wider text-[10px]">Thesis NLP Playground</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>

            {/* Ingestion Selector */}
            <div className="mt-3.5">
              <label className="text-[9px] uppercase text-navy-400">Select Input Text Snippet:</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {PARSING_EXAMPLES.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      if (!isSimulating) {
                        setSelectedExample(ex);
                        setSimulatedLog([]);
                        setOutputJson("");
                      }
                    }}
                    className={`rounded-md border p-2 text-left leading-tight cursor-pointer hover:border-navy-500 transition-all ${
                      selectedExample.id === ex.id
                        ? "border-teal-400 bg-navy-900 text-teal-200"
                        : "border-navy-800 bg-navy-900/30 text-navy-400"
                    }`}
                  >
                    <p className="font-bold text-[9px] truncate">{ex.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Raw Text Window */}
            <div className="mt-3 rounded bg-navy-900 p-2 text-navy-300 text-[10px] whitespace-pre-wrap border border-navy-800">
              {selectedExample.rawText}
            </div>

            {/* Run button */}
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded bg-teal-400 py-1.5 font-sans font-bold text-navy-950 hover:bg-teal-300 cursor-pointer disabled:opacity-50 transition-colors"
            >
              <Play className="h-3 w-3 fill-navy-950" />
              <span>{isSimulating ? "AI Processing Pipeline Active..." : "Run Simulated Parsing"}</span>
            </button>

            {/* Ingestion logs */}
            {simulatedLog.length > 0 && (
              <div className="mt-3 space-y-1 text-[10px] rounded bg-navy-900/50 p-2 border border-navy-800/30">
                {simulatedLog.map((log, idx) => (
                  <p key={idx} className={idx === simulatedLog.length - 1 ? "text-emerald-300" : "text-navy-400"}>
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Structured Output */}
          <div className="mt-4">
            <label className="text-[9px] uppercase text-navy-400 flex items-center gap-1">
              <Database className="h-3 w-3 text-teal-300" /> Output Database Form Schema:
            </label>
            <div className="mt-1 h-[130px] overflow-y-auto rounded bg-navy-900 p-2 text-emerald-400 text-[10px] leading-relaxed border border-navy-800 font-mono">
              {outputJson ? (
                <pre>{outputJson}</pre>
              ) : (
                <span className="text-navy-500 italic block mt-1">Click &quot;Run Simulated Parsing&quot; to see the LayoutLMv3 context alignment mapped...</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
