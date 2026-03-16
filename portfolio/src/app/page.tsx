import { HeroSection } from "@/components/hero/HeroSection";
import { MetricsBanner } from "@/components/metrics/MetricsBanner";
import { DomainMatrix } from "@/components/domains/DomainMatrix";
import { ExperienceTimeline } from "@/components/timeline/ExperienceTimeline";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <MetricsBanner />
      <DomainMatrix />
      <ExperienceTimeline />
      <ProjectGrid />

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 bg-bg-primary relative overflow-hidden border-t border-border-subtle">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-accent-health/5 blur-[120px]" />
        </div>
        
        <div className="mx-auto max-w-[800px] px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <SectionHeading 
            title="Let us look at the problem together." 
            subtitle="I am a full-stack data architect who can solve problems wherever the data lives."
            alignment="center"
            className="mb-8"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button size="lg" variant="primary" asChild>
              <a href="mailto:sandeep@example.com">Start a Conversation</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://linkedin.com/in/sandeepghotra" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
