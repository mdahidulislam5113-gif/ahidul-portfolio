/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, RefreshCw, Cpu, UserCheck2, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";
import { PRESET_CHAT_QUESTIONS, CANDIDATE_INFO } from "../data";

export default function AIChatAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-msg",
      sender: "ai_assistant",
      text: `Hello! I am Md. Ahidul Islam's Professional AI Portfolio Assistant, powered by Gemini. Ask me anything about his credentials, B.Sc thesis, database normalization design in BusBD, or his immediate availability!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  // Command submission
  const executeQuery = async (userPrompt: string) => {
    if (!userPrompt.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "recruiter",
      text: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userPrompt,
          history: messages.slice(-10), // Pass recent conversation context
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai_assistant",
        text: data.reply || "I encountered an empty output channel. Ahidul is an immediate joiner with expertise in SQL Schemas and Python AI Pipelines!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai_assistant",
        text: "I was unable to establish connection to the backend pipeline. Regardless, I can confirm that Ahidul has 94.2% accuracy in layout parsing, strong SQL joins, and is ready for immediate Dhaka placement!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuery(inputVal);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "init-msg",
        sender: "ai_assistant",
        text: `Hello! I am Md. Ahidul Islam's Professional AI Portfolio Assistant, powered by Gemini. Ask me anything about his credentials, B.Sc thesis, database normalization design in BusBD, or his immediate availability!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="rounded-2xl border border-navy-100 bg-navy-800 shadow-xs overflow-hidden flex flex-col justify-between" id="ai-agent-container" style={{ minHeight: "480px" }}>
      {/* Visual Header */}
      <div className="bg-navy-950 px-4 py-3 flex items-center justify-between border-b border-navy-100/15">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-teal-400 p-1.5 text-navy-950 animate-pulse">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white tracking-tight leading-none">
              Conversational Resume Assistant
            </h3>
            <p className="text-[10px] text-teal-300 mt-0.5 leading-none font-mono">
              Powered by gemini-3.5-flash
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="rounded p-1 text-navy-400 hover:bg-navy-900 hover:text-white transition-colors cursor-pointer"
          title="Clear Conversation"
          id="chat-clear-btn"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Message Output Viewport */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-navy-950/40 max-h-[300px]">
        {messages.map((msg) => {
          const isUser = msg.sender === "recruiter";
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${isUser ? "ml-auto items-end" : "mr-auto items-start"}`}
            >
              <div
                className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  isUser
                    ? "bg-teal-500/15 border border-teal-500/40 text-teal-300 rounded-br-none"
                    : "bg-navy-900 border border-navy-100 px-3 py-2 text-white rounded-bl-none shadow-3xs"
                }`}
              >
                {msg.text}
              </div>
              <span className="font-mono text-[9px] text-navy-400 mt-0.5 px-1">{msg.timestamp}</span>
            </div>
          );
        })}
        {isGenerating && (
          <div className="flex items-center gap-1.5 text-teal-300 mr-auto max-w-[85%]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
            </span>
            <span className="font-mono text-[10px] italic">Gemini is synthesizing response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset clickers panel */}
      <div className="p-3 border-t border-navy-100/15 bg-navy-900">
        <p className="font-mono text-[9px] uppercase tracking-wider text-teal-300 flex items-center gap-1">
          <HelpCircle className="h-3 w-3" /> Click Preset Screening Prompt:
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {PRESET_CHAT_QUESTIONS.map((question, idx) => (
            <button
              key={idx}
              onClick={() => executeQuery(question)}
              disabled={isGenerating}
              className="text-left text-[10px] font-medium text-navy-400 hover:text-white bg-navy-950 border border-navy-100/40 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-navy-800 transition-all disabled:opacity-50"
              id={`preset-chat-${idx}`}
            >
              {question.replace("Md. Ahidul Islam ", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Custom TextInput Bar */}
      <form onSubmit={handleSend} className="p-3 bg-navy-950/60 border-t border-navy-100/15 flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask e.g., 'What was his grade & university?'"
          disabled={isGenerating}
          className="flex-1 bg-navy-950 border border-navy-100/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-hidden focus:ring-1 focus:ring-teal-300 placeholder:text-navy-400"
          id="chat-input"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isGenerating}
          className="rounded-lg bg-navy-900 border border-teal-500/20 text-teal-300 px-3 hover:bg-navy-800 hover:border-teal-400 disabled:opacity-40 transition-all flex items-center justify-center cursor-pointer"
          id="chat-submit-btn"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
