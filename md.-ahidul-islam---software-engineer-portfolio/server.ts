/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini GenAI server-side
const geminiKey = process.env.GEMINI_API_KEY;
const ai = geminiKey
  ? new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// AI Recruiter Assistant Proxy Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Elegant, immediate fallback if key is missing
      return res.json({
        reply: "Hello! I am Ahidul's Recruiter AI Assistant. It looks like the Gemini API key isn't loaded in the platform secrets yet. Regardless, I can confirm that Md. Ahidul Islam is an immediate-joiner Software Engineer in Dhaka with deep expertise in Python, Relational Database Normalization (MySQL/PostgreSQL), and Multi-Modal AI Document Pipelines (LayoutLMv3, Qwen2 APIs)!"
      });
    }

    // Comprehensive CV corpus injected as a system instruction
    const systemInstruction = `You are 'Ahidul's Recruiter Assistant Bot', a highly professional, objective AI representative for Md. Ahidul Islam, a Computer Science & Engineering graduate from Bangladesh.
Your goal is to answer a recruiter's question clearly, concisely, and with concrete facts from Ahidul's resume.
Be polite, corporate, and immediately confident. Show why he is internship-ready and ready to join immediately as a Software Engineer in Dhaka.

Candidate Facts:
- Name: Md. Ahidul Islam
- Title: Software Engineer | Python, AI & Backend Systems
- Contact: mdahidulislam5113@gmail.com | Phone: 01993217559 | GitHub: https://github.com/mdahidulislam5113-gif | LinkedIn: https://www.linkedin.com/in/md-ahidul-islam-41aa913bb
- Availability: Immediate joiner (On-site or Hybrid in Dhaka)
- Education: B.Sc in Computer Science & Engineering from Daffodil International University (CGPA 3.32/4.00, 2025). High School GPA: 4.08/5.00, School GPA: 4.95/5.00.
- Thesis (AI Highlight): 'Automated Form Filling from Document Images via Multi-Modal NLP & LLMs'. Created a Python pipeline: Document ingestion -> OCR extraction (Tesseract & LayoutLMv3) -> Qwen2 LLM API reasoning -> parsed JSON. Achieved 94% accuracy on 180 CVs and 375+ validation pages. Beautifully modular.
- Projects:
  1. BusBd (Bus ticket system): Built custom APIs, full-stack website (PHP, MySQL, JS, CSS). Normalized DB schema, optimized queries, handled concurrent seat locking to prevent double booking. GitHub: https://github.com/mdahidulislam5113-gif/busbd
  2. StudyShare (Educational resource portal): Client-side fuzzy searching, RESTful fetch calls, mobile-responsive layout. Deployed live work showcase on ahidnahid.github.io. GitHub: https://github.com/mdahidulislam5113-gif/StudyShare
  3. Mini C Compiler (C interpretation): Lexer/parser rules in C, compiler design concepts.
  4. Flutter Multi-App (Dart): Mobile states, local JSON storage.
  5. Banking Network (Secured subnetting, ACLs, enterprise architecture).
- Core Skills: Python, PHP, JavaScript, SQL (MySQL, PostgreSQL), C/C++, Dart, FastAPI (learning), Docker (learning), Git & GitHub.
- Languages: Bengali (Native), English (Professional).

Directives:
1. Speak on behalf of Md. Ahidul Islam's agent or assistant. Give objective, highly technical, and professional explanations.
2. DO NOT overstate experiences. Say: He's a fast learner with real proof of projects.
3. Keep answers highly scannable, using short lists or bold words. Max 3 sentences or 3 bullets per reply.
4. If a question is irrelevant to recruiting, resume, or engineering, politely redirect the recruiter back to hiring Ahidul.
5. Emphasize projects over scores when answering. Give the developer impression: "This candidate has real practical experience."`;

    const chatHistory = history
      ? history.map((h: any) => ({
          role: h.sender === "recruiter" ? "user" : "model",
          parts: [{ text: h.text }],
        }))
      : [];

    const contents = [...chatHistory, { role: "user", parts: [{ text: message }] }];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in server.ts:", error);
    return res.status(500).json({ error: "Failed to communicate with AI Assistant." });
  }
});

// Boot the Express service and hook Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware loaded gracefully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static distribution ready.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server active at host 0.0.0.0 on port ${PORT}`);
  });
}

startServer();
