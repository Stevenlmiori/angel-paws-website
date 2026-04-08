import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const toneClasses = {
  default: "bg-surface",
  lifted:
    "bg-gradient-to-b from-white/[0.72] via-surface to-surface",
  warm: "bg-gradient-to-br from-surface via-[#f6f3ee] to-[#efe9e0]",
  mist: "bg-gradient-to-b from-[#f3f6f8] to-surface",
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
