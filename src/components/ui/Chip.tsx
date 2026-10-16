import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Chip({
  pressed,
  className,
  ...rest
}: { pressed: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" aria-pressed={pressed} className={cn("chip", className)} {...rest} />
  );
}
