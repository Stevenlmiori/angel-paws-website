import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[0.875rem] bg-gradient-to-br from-white/80 to-white/40 p-8 md:p-10",
        "shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
