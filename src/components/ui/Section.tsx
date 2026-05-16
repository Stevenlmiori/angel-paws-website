import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const toneClasses = {
  default: "bg-surface",
  lifted:
    "bg-gradient-to-b from-white/[0.72] via-surface to-surface",
  warm: "bg-gradient-to-br from-surface via-surface-container-low to-tertiary-container/35",
  mist: "bg-gradient-to-b from-primary-container/35 to-surface",
  /** Navy band — use with `text-on-surface-inverse-muted` for supporting copy */
  inverse: "section-tone-inverse",
  /** Warm charcoal — distinct from all-white / all-blue ministry sites */
  charcoal: "section-tone-charcoal",
} as const;

export type SectionTone = keyof typeof toneClasses;

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
} & HTMLAttributes<HTMLElement>;

export function Section({
  children,
  tone = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-24 md:py-32 lg:py-40",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
