"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { identity } from "@/data/timeline";
import { Button } from "@/components/ui/Button";
import { AIChatSimulation } from "./AIChatSimulation";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-tech/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-cloud/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 w-full z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">
          
          {/* Left Panel */}
          <motion.div 
            className="w-full lg:w-[55%] flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border-default bg-white/5 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-health animate-pulse" />
              <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">{identity.totalResumes} Resumes Analyzed</span>
            </motion.div>

            <h1 className="font-geist text-5xl sm:text-6xl lg:text-[72px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-6">
              {identity.headline}
            </h1>
            
            <h2 className="font-geist text-2xl sm:text-3xl lg:text-[40px] font-semibold text-text-secondary tracking-[-0.02em] mb-6">
              {identity.title}
            </h2>

            <p className="font-inter text-lg sm:text-xl text-text-primary mb-4 p-0">
              {identity.subheadline}
            </p>

            <p className="font-inter text-base sm:text-lg text-text-tertiary leading-relaxed max-w-[600px] mb-10">
              {identity.philosophy}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="primary" asChild>
                <a href="#domains">Explore Domains</a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div 
            className="w-full lg:w-[45%] h-full flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-full max-w-[540px]">
              <AIChatSimulation />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
