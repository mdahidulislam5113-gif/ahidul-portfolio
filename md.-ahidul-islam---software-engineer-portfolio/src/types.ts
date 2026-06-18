/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ProjectTier {
  TIER_1 = "Tier 1: High Impact Proof",
  TIER_2 = "Tier 2: Engineering Concepts",
  TIER_3 = "Tier 3: Systems & Networking"
}

export interface Project {
  id: string;
  title: string;
  positioning: string;
  github?: string;
  live?: string;
  tier: ProjectTier;
  metadata: string; // Focus tags (e.g. PHP, JavaScript, etc.)
  bulletPoints: string[];
  keyChallenges?: string;
  architectureFlow?: {
    nodes: string[];
    description: string;
  };
}

export interface RecruiterFilter {
  id: string;
  label: string;
  icon: string;
  skillsHighlighted: string[];
  projectsHighlighted: string[];
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: "recruiter" | "ai_assistant";
  text: string;
  timestamp: string;
}
