import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "accent";
  accentColor?: string;
}

function Badge({ className, variant = "default", accentColor, style, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-white/10 text-white hover:bg-white/20": variant === "default",
          "border border-border-default text-text-secondary": variant === "outline",
          "text-white": variant === "accent",
        },
        className
      )}
      style={variant === "accent" && accentColor ? { backgroundColor: accentColor, ...style } : style}
      {...props}
    />
  );
}

export { Badge };
