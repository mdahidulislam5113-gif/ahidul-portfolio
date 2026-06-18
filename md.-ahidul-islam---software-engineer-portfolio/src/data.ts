/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ProjectTier, RecruiterFilter } from "./types";

export const CANDIDATE_INFO = {
  name: "Md. Ahidul Islam",
  headline: "Building Practical Software Systems Through Continuous Learning",
  subheadline: "CSE graduate focused on clean, robust software engineering, relational database schemas, and AI & NLP pipelines.",
  role: "Software Engineer | Python, AI & Backend Systems",
  location: "Dhaka, Bangladesh (Immediate Joiner - On-site / Hybrid)",
  email: "mdahidulislam5113@gmail.com",
  phone: "01993217559",
  github: "https://github.com/mdahidulislam5113-gif",
  githubUsername: "mdahidulislam5113-gif",
  linkedin: "https://www.linkedin.com/in/md-ahidul-islam-41aa913bb",
  portfolioUrl: "https://ahidnahid.github.io",
  cgpa: "3.32 / 4.00",
  graduation: "2025",
  university: "Daffodil International University",
  aboutHighlights: [
    "Software engineering graduate with hands-on practice building clean, real-world systems in transport, educational resource sharing, and compiler design.",
    "B.Sc Thesis built a production-grade multi-modal AI processing pipeline achieving 94% accuracy across 180+ resume document files.",
    "Strong foundations in data structures & algorithms (DSA), normalized database schema engineering, and OOP principles.",
    "Currently expanding technical vocabulary through FastAPI, containerization (Docker), PostgreSQL, and cloud deployments."
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "busbd",
    title: "BusBd — Bus Transport Information System",
    positioning: "Real-world transport software handling live transit routes, seat validation, and transactional data flows",
    tier: ProjectTier.TIER_1,
    metadata: "PHP, JavaScript, MySQL, HTML5, CSS",
    github: "https://github.com/mdahidulislam5113-gif/busbd",
    bulletPoints: [
      "Built a full-stack transactional web system featuring custom APIs to process real-time schedules and ticket requests.",
      "Engineered a fully normalized relational database schema in MySQL; optimized query performance for rapid lookup and route joins.",
      "Implemented server-side validation models and strict exception handlers preventing double-booking race conditions."
    ],
    keyChallenges: "Managing concurrent seat-reservation transactions without race conditions or database deadlocks. Solved by writing strict transaction scopes and applying atomic reservation states.",
    architectureFlow: {
      nodes: ["User Request", "Express Routing & Guard", "PHP Ticket Engine API", "Normalized MySQL Schema", "Transactional Lock Validation", "Atomic Seat Receipt"],
      description: "User requests ticket -> Server performs concurrent lock-check -> DB transaction commits seat state -> PDF ticket receipt executes."
    }
  },
  {
    id: "studyshare",
    title: "StudyShare — Academic Resource Discovery Platform",
    positioning: "Peer-to-peer resource portal focused on instant indexing, dynamic search filters, and asynchronous page loads",
    tier: ProjectTier.TIER_1,
    metadata: "JavaScript, HTML5, CSS, RESTful API Client",
    github: "https://github.com/mdahidulislam5113-gif/StudyShare",
    bulletPoints: [
      "Developed a robust client-side routing model utilizing asynchronous RESTful fetch calls for instant content rendering.",
      "Programmed a lightweight fuzzy search and dynamic tag validation logic filtering academic objects on-the-fly.",
      "Engineered an elegant, highly responsive document storage catalog for effortless student indexing and access."
    ],
    keyChallenges: "Providing dynamic multi-parameter catalog filtering on large static data without blocking the browser thread. Solved by decoupling query handlers and rendering in fragments.",
    architectureFlow: {
      nodes: ["Client Search Prompt", "Fuzzy Search Engine", "REST API Content Loader", "Asynchronous Cache Controller", "Fragment DOM Refresh"],
      description: "Recruiter types key -> Fuzzy search matches meta tags -> Decoupled client-side storage loads dataset instantly."
    }
  },
  {
    id: "thesis_ai",
    title: "B.Sc Thesis: Multi-Modal Document Form Extraction",
    positioning: "Automated Form Filling from Document Images via Multi-Modal NLP & LLM reasoning engine",
    tier: ProjectTier.TIER_1,
    metadata: "Python, LayoutLMv3, Qwen2 LLM API, Tesseract OCR",
    bulletPoints: [
      "Designed and executed a full production-grade data pipeline: Document Ingestion -> Regional OCR -> LLM Context Alignment -> Parsed JSON.",
      "Achieved a highly robust 94% data accuracy rate verified across a robust dataset of 180 CVs and 375+ raw document pages.",
      "Implemented a highly modular Python codebase cleanly separating extraction, prompt inference, and schema mapping layers.",
      "Conducted detailed error-analysis matrices and bench-marked model performance variables across massive structural variance."
    ],
    keyChallenges: "Noisy OCR outputs and misaligned bounding-box mappings on visually diverse layouts. Solved by regional layout clustering and context-enhanced LLM schema prompts.",
    architectureFlow: {
      nodes: ["Uploaded Document Image", "Tesseract OCR & LayoutLMv3 Analysis", "Structured Node Mapping", "Hugging Face & Qwen2 LLM Processing", "Strict JSON Form Mapping"],
      description: "Raw PDF/Image upload -> Optical layout parsed into coordinate nodes -> LLM synthesizes content -> Validated structural JSON output."
    }
  },
  {
    id: "compiler",
    title: "Interactive Mini C Compiler",
    positioning: "Interpreter and compile-time utility demonstrating parser design and computer science fundamentals",
    tier: ProjectTier.TIER_2,
    metadata: "C, Compiler Design Concepts, Lex / Yacc",
    bulletPoints: [
      "Built a command-line syntax analyzer processing custom lexical rules and variable declarations in C.",
      "Engineered intermediate code-generation structures, validating simple operations and handling loop conditions.",
      "Designed clear diagnostic error-messaging layers pinpointing exact syntax faults in simulated C source files."
    ]
  },
  {
    id: "flutter",
    title: "Flutter Multi-App Mobile Suite",
    positioning: "Cross-platform mobile implementation demonstrating native widget lifecycles and clean UI/UX state",
    tier: ProjectTier.TIER_2,
    metadata: "Dart, Flutter SDK, Mobile Design",
    bulletPoints: [
      "Programmed elegant cross-platform structures utilizing reactive state machines and local JSON storage models.",
      "Developed modular widget hierarchies optimizing frame-loading rates and transitions during complex multi-page state transitions.",
      "Connected REST endpoints pulling real-time mock payloads for responsive content feeds."
    ]
  },
  {
    id: "banking_net",
    title: "Secure Enterprise Banking Network Architecture",
    positioning: "Scalable enterprise subnet routing architecture modeling critical secure transactions",
    tier: ProjectTier.TIER_3,
    metadata: "Computer Networks, Subnetting, Security Protocols",
    bulletPoints: [
      "Designed a secure subnet architecture for multi-department simulated bank headquarters with isolated access levels.",
      "Configured robust ACL filtering layers, static routing topologies, and edge protection constraints preventing data leakage.",
      "Bench-marked transfer latencies and verified packet safety criteria through strict hardware-mimicked simulations."
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: ["Python", "PHP", "JavaScript", "SQL (MySQL, PostgreSQL)", "C", "C++", "Dart", "HTML5", "CSS3"]
  },
  {
    title: "Frameworks & Backend",
    skills: ["Flutter (Mobile)", "FastAPI", "Express.js", "Node.js", "REST APIs", "Ajax/JSON"]
  },
  {
    title: "AI & Document Parsing",
    skills: ["LayoutLMv3", "Hugging Face Transformers", "Qwen2 & LLM Prompting", "Tesseract OCR", "NLP Pipelines"]
  },
  {
    title: "Tools & OS",
    skills: ["Git & GitHub", "Docker", "VS Code", "Android Studio", "Linux CLI", "Database Schema Engineering"]
  },
  {
    title: "Core CS Concepts",
    skills: ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)", "Compiler Design", "Computer Networking"]
  }
];

export const RECRUITER_FILTERS: RecruiterFilter[] = [
  {
    id: "fast_api",
    label: "Python/API Software Engineer",
    icon: "Terminal",
    skillsHighlighted: ["Python", "FastAPI", "REST APIs", "Linux CLI", "Git & GitHub"],
    projectsHighlighted: ["thesis_ai", "compiler"],
    description: "Looking for robust backend logic, parsed data, fast API endpoints, and clean Python architectures."
  },
  {
    id: "fullstack_mysql",
    label: "Web & Database Engineer",
    icon: "Database",
    skillsHighlighted: ["PHP", "JavaScript", "SQL (MySQL, PostgreSQL)", "Database Schema Engineering", "HTML5", "CSS3"],
    projectsHighlighted: ["busbd", "studyshare"],
    description: "Hiring for relational database modeling, queries optimization, session routes, and server-client integration."
  },
  {
    id: "ai_nlp",
    label: "AI, LLM & Data Engineer",
    icon: "Sparkles",
    skillsHighlighted: ["LayoutLMv3", "Hugging Face Transformers", "Qwen2 & LLM Prompting", "Tesseract OCR", "Python", "NLP Pipelines"],
    projectsHighlighted: ["thesis_ai"],
    description: "Seeking practical engineers who handle optical pipelines, multi-modal forms extraction, and LLM text transformations."
  },
  {
    id: "mobile_dev",
    label: "Flutter Mobile Developer",
    icon: "Smartphone",
    skillsHighlighted: ["Dart", "Flutter (Mobile)", "Git & GitHub", "Object-Oriented Programming (OOP)"],
    projectsHighlighted: ["flutter"],
    description: "Hiring for clean cross-platform client logic, native widget structures, and reactive flow layouts."
  }
];

export const PRESET_CHAT_QUESTIONS = [
  "Does Md. Ahidul Islam have actual experience with database schema design? Explain with projects.",
  "Tell me about his B.Sc thesis. What metrics were achieved?",
  "Is he immediate joiner? What are his technical tools?",
  "Explain why he is internship-ready and how he stands out."
];
