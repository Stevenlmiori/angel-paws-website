import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  narrow?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function Container({
  children,
  narrow = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        narrow ? "max-w-[min(100%,42rem)]" : "max-w-[min(100%,72rem)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
