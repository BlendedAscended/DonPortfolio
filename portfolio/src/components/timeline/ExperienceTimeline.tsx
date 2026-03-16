"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/timeline";
import { domains } from "@/data/domains";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionHeading 
          title="Experience Narrative"
          subtitle="The evolution of my cross-industry architecture and engineering experience."
          alignment="center"
          className="mb-20"
        />

        <div className="relative" ref={containerRef}>
          {/* Centered Line for Desktop */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle -translate-x-1/2 hidden md:block" />
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-cloud via-accent-tech to-accent-aiml origin-top -translate-x-1/2 hidden md:block"
            style={{ scaleY: lineHeight }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={item.period} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Center Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-bg-card border-2 border-text-tertiary -translate-x-1/2 mt-1.5 md:mt-0 z-10 transition-colors duration-300 hidden md:block" />

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <Card className="p-6 md:p-8 hover:border-border-default group">
                        <div className="font-inter text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">
                          {item.period}
                        </div>
                        <h3 className="font-geist text-2xl font-bold text-white mb-4">
                          {item.title}
                        </h3>

                        {/* Domain Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.domains.map(domainId => {
                            const domain = domains.find(d => d.id === domainId);
                            if (!domain) return null;
                            return (
                              <Badge 
                                key={domainId} 
                                variant="accent" 
                                accentColor={domain.accent}
                                className="opacity-80 group-hover:opacity-100 transition-opacity"
                              >
                                {domain.name}
                              </Badge>
                            );
                          })}
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tech.map(t => (
                            <Badge key={t} variant="outline" className="font-mono text-[10px] bg-bg-secondary text-text-secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>

                        {/* Impact Statement */}
                        <p className="text-sm text-text-secondary leading-relaxed border-t border-border-subtle pt-4 mt-4">
                          <span className="font-semibold text-text-primary">Impact: </span>
                          {item.impact}
                        </p>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
