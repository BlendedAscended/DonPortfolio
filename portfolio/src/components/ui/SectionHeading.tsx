import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4",
        alignment === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <h2 className="font-geist text-4xl font-bold tracking-tight sm:text-5xl text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-[700px] text-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
