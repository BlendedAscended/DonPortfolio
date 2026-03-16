"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { domains } from "@/data/domains";
import { Card } from "@/components/ui/Card";
import { Bot, User } from "lucide-react";

export function AIChatSimulation() {
  const [activeDomain, setActiveDomain] = useState(domains[0]);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string; key: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initial load
  useEffect(() => {
    startConversation(domains[0]);
  }, []);

  const startConversation = (domain: typeof domains[0]) => {
    setActiveDomain(domain);
    setMessages([]);
    setIsTyping(true);

    // Sequence events
    setTimeout(() => {
      setMessages([{ role: "user", content: `Tell me about your experience in ${domain.name}.`, key: Date.now().toString() }]);
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: "ai", content: domain.pitch, key: (Date.now() + 1).toString() }]);
      }, 1500); // Fake processing delay
    }, 500);
  };

  return (
    <Card className="w-full h-full min-h-[480px] flex flex-col justify-between overflow-hidden p-0 border-border-default bg-bg-secondary/50">
      {/* Header */}
      <div className="flex items-center space-x-3 px-6 py-4 border-b border-border-subtle bg-bg-card/40">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-health/10">
          <Bot className="w-4 h-4 text-accent-health" style={{ color: activeDomain.accent }} />
        </div>
        <div>
          <h3 className="font-geist text-sm font-semibold text-white">Knowledge Agent</h3>
          <p className="text-xs text-text-secondary">Simulating responses from {activeDomain.name} database</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-end">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.key}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[85%] items-start space-x-3 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
              >
                <div 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-bg-elevated" : "bg-bg-elevated"}`}
                  style={msg.role === "ai" ? { border: `1px solid ${activeDomain.accent}40` } : {}}
                >
                  {msg.role === "user" ? <User className="w-4 h-4 text-text-secondary" /> : <Bot className="w-4 h-4" style={{ color: activeDomain.accent }} />}
                </div>
                <div 
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-bg-elevated text-text-primary rounded-tr-sm" 
                      : "bg-transparent border border-border-subtle text-text-primary rounded-tl-sm shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  }`}
                  style={msg.role === "ai" ? { borderLeft: `2px solid ${activeDomain.accent}`, backgroundColor: `rgba(255,255,255,0.02)` } : {}}
                >
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex w-full justify-start items-center space-x-2 pl-11"
           >
             <div className="flex space-x-1 p-2 rounded-xl bg-bg-elevated">
               <motion.div className="w-1.5 h-1.5 rounded-full bg-text-secondary" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
               <motion.div className="w-1.5 h-1.5 rounded-full bg-text-secondary" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
               <motion.div className="w-1.5 h-1.5 rounded-full bg-text-secondary" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
             </div>
           </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Domain Chips Input Area */}
      <div className="px-6 py-4 border-t border-border-subtle bg-bg-primary/20">
        <p className="text-xs text-text-tertiary mb-3 uppercase tracking-wider font-semibold">Query specific domain context:</p>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={domain.id}
              onClick={() => startConversation(domain)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                activeDomain.id === domain.id 
                  ? "text-white" 
                  : "bg-transparent border-border-default text-text-secondary hover:text-white hover:border-border-strong"
              }`}
              style={activeDomain.id === domain.id ? { backgroundColor: domain.accent, borderColor: domain.accent } : {}}
            >
              {domain.name}
            </motion.button>
          ))}
        </div>
      </div>
    </Card>
  );
}
