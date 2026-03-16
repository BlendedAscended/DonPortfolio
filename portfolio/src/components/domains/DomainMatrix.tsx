"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { domains } from "@/data/domains";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Search } from "lucide-react";

export function DomainMatrix() {
  const [activeDomainId, setActiveDomainId] = useState(domains[0].id);
  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];

  return (
    <section id="domains" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <SectionHeading 
          title="Domain Expertise" 
          subtitle="A matrix of systems built across six distinct industries."
          alignment="center"
          className="mb-16"
        />

        {/* Toggle Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {domains.map((domain) => {
            const isActive = activeDomainId === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive ? "text-white" : "text-text-secondary hover:text-white glass-card"
                }`}
                style={isActive ? { backgroundColor: domain.accent, borderColor: domain.accent } : {}}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDomainIndicator"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: domain.accent }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{domain.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="min-h-[600px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-12"
            >
              {/* Header inside domain */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-border-default">
                <div>
                  <h3 className="font-geist text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    {activeDomain.name}
                    <Badge variant="outline" className="text-xs font-mono">
                      {activeDomain.resumeCount} Resumes
                    </Badge>
                  </h3>
                  <p className="text-text-secondary text-lg">{activeDomain.tagline}</p>
                </div>
                <div 
                  className="pl-4 border-l-2 py-1 max-w-md italic text-sm text-text-tertiary"
                  style={{ borderLeftColor: activeDomain.accent }}
                >
                  "{activeDomain.pitch}"
                </div>
              </div>

              {/* Sub-domains Grid */}
              <div>
                <h4 className="font-geist text-sm uppercase tracking-wider text-text-primary mb-6">Sub-Specializations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeDomain.subDomains.map((sub, idx) => (
                    <Card key={idx} className="p-5 hover:border-white/20">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white text-base">{sub.name}</h5>
                        <Badge style={{ backgroundColor: `${activeDomain.accent}20`, color: activeDomain.accent }} className="border-none font-mono text-[10px]">
                          {sub.count}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{sub.focus}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-geist text-sm uppercase tracking-wider text-text-primary mb-6">Technology Stack</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeDomain.techStack.map((category) => (
                    <div key={category.cat}>
                      <h5 className="text-sm font-semibold text-text-secondary mb-3">{category.cat}</h5>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <Badge key={item} variant="outline" className="bg-bg-secondary/50 font-mono text-xs text-text-primary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Domain Specific Metrics */}
              <div>
                <h4 className="font-geist text-sm uppercase tracking-wider text-text-primary mb-6">Key Impact Metrics</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeDomain.metrics.map((metric) => (
                    <div key={metric.label} className="p-4 rounded-xl bg-bg-secondary/30 border border-border-subtle">
                      <div className="font-geist text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="font-inter text-xs text-text-secondary font-medium mb-1">{metric.label}</div>
                      <div className="font-inter text-[10px] uppercase tracking-wider text-text-tertiary">{metric.context}</div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
