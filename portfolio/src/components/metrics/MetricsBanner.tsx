"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { DollarSign, Zap, Target, Shield, TrendingUp, Bot, Rocket } from "lucide-react";
import { crossDomainMetrics } from "@/data/metrics";

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Zap,
  Target,
  Shield,
  TrendingUp,
  Bot,
  Rocket
};

export function MetricsBanner() {
  return (
    <section className="w-full py-12 overflow-hidden border-y border-border-subtle bg-bg-secondary/30 relative z-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex overflow-x-auto pb-4 pt-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap lg:justify-center gap-4 scrollbar-hide snap-x">
          {crossDomainMetrics.map((metric, index) => {
            const Icon = iconMap[metric.icon] || Target;
            
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-center shrink-0 w-[240px] lg:w-[calc(25%-12px)] xl:w-[calc(14.28%-12px)]"
              >
                <Card className="flex flex-col items-center justify-center text-center h-full py-6 px-4 hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-border-subtle flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div className="font-geist text-3xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="font-inter text-sm text-text-secondary font-medium mb-1">
                    {metric.label}
                  </div>
                  <div className="font-inter text-[11px] uppercase tracking-[0.08em] font-semibold text-text-tertiary">
                    {metric.context}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
