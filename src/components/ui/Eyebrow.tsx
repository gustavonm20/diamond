import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  reveal = true,
  className,
}: {
  children: ReactNode;
  reveal?: boolean;
  className?: string;
}) {
  return <span className={cn("ey", reveal && "rv", className)}>{children}</span>;
}
