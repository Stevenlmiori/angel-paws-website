import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingBlockProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "end";
  as?: "h1" | "h2" | "h3";
} & HTMLAttributes<HTMLDivElement>;

export function HeadingBlock({
  label,
  title,
  description,
  align = "start",
  as: HeadingTag = "h2",
  className,
  ...props
}: HeadingBlockProps) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "end" && "md:text-right",
        className,
      )}
      {...props}
    >
      {label ? (
        <p
          className={cn(
            "text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-secondary",
            align === "end" && "md:ml-auto md:max-w-md",
          )}
        >
          {label}
        </p>
      ) : null}
      <HeadingTag
        className={cn(
          "max-w-[22ch] font-serif text-4xl leading-[1.12] text-on-surface sm:text-5xl lg:text-[3.25rem]",
          align === "end" && "md:ml-auto",
        )}
      >
        {title}
      </HeadingTag>
      {description ? (
        <div
          className={cn(
            "max-w-xl text-lg leading-relaxed text-on-surface-muted",
            align === "end" && "md:ml-auto",
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}
