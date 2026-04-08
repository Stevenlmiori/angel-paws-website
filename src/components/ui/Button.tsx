import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-[0.625rem] px-8 py-3.5 text-sm font-semibold tracking-wide transition duration-300 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/35",
        variant === "primary" &&
          cn(
            "bg-gradient-to-br from-primary to-[#3468d9] text-on-primary",
            "shadow-none hover:shadow-soft",
          ),
        variant === "secondary" &&
          cn(
            "bg-white/45 text-on-surface backdrop-blur-[2px]",
            "hover:bg-white/70 hover:shadow-soft",
          ),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
