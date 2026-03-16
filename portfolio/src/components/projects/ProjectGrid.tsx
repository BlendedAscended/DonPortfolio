"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { domains } from "@/data/domains";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";

// Extract all projects from domains and inject domain references
const allProjects = domains.flatMap(domain => 
  domain.projects.map(project => ({ ...project, domain }))
);

export function ProjectGrid() {
  const [filter, setFilter] = useState<string>("All");

  const filteredProjects = filter === "All" 
    ? allProjects 
    : allProjects.filter(p => p.domain.name === filter);

  return (
    <section id="projects" className="py-24 bg-bg-secondary/20 relative">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <SectionHeading 
            title="Project Showcase"
            subtitle="Deep dives into production architectures and implementation results."
          />
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                filter === "All" 
                  ? "bg-white text-black" 
                  : "bg-bg-card border border-border-default text-text-secondary hover:text-white"
              }`}
            >
              All Projects
            </button>
            {domains.map(domain => (
              <button
                key={domain.id}
                onClick={() => setFilter(domain.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                  filter === domain.name ? "text-white" : "text-text-secondary hover:text-white bg-bg-card border-border-default"
                }`}
                style={filter === domain.name ? { backgroundColor: domain.accent, borderColor: domain.accent } : {}}
              >
                {domain.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={`${project.name}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="h-full flex flex-col group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl"
                  style={{ borderLeft: `4px solid ${project.domain.accent}` }}
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" style={{ color: project.domain.accent, borderColor: `${project.domain.accent}40` }} className="text-[10px] bg-transparent">
                        {project.domain.name}
                      </Badge>
                      <button className="text-text-tertiary hover:text-white transition-colors" aria-label="View Project">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <h3 className="font-geist text-xl font-bold text-white mb-4 group-hover:text-[color:var(--hover-color)] transition-colors" style={{ '--hover-color': project.domain.accent } as React.CSSProperties}>
                      {project.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(t => (
                        <Badge key={t} variant="outline" className="font-mono text-[10px] text-text-secondary bg-bg-primary/50">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-subtle mt-auto">
                    <p className="text-sm font-medium" style={{ color: project.domain.accent }}>
                      <span className="text-text-secondary font-normal mr-2">Impact:</span>
                      {project.impact}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center z-10">
                    <div>
                      <h4 className="font-geist text-lg font-bold text-white mb-2">{project.name}</h4>
                      <p className="text-sm text-text-secondary mb-6">{project.impact}</p>
                      <button 
                        className="px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
                        style={{ backgroundColor: `${project.domain.accent}20`, color: project.domain.accent, border: `1px solid ${project.domain.accent}40` }}
                      >
                        View Architecture Details
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
