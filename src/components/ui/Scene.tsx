import type { HTMLAttributes } from "react";
import type { SceneSpec } from "@/types/content";
import { cn } from "@/lib/cn";
import { sceneSvg } from "@/lib/scene";

/**
 * Temporary placeholder illustration (ported from the reference `scene()`).
 * To use a real photo, swap this for:
 *   <Image src="/projetos/reserva.jpg" alt="Fachada do Reserva Beach Club à noite" fill sizes="…" />
 */
export function Scene({
  scene,
  lit,
  className,
  ...rest
}: { scene: SceneSpec; lit?: boolean } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("scene", className)}
      dangerouslySetInnerHTML={{
        __html: sceneSvg(scene.kind, scene.label, lit ?? scene.lit ?? true),
      }}
      {...rest}
    />
  );
}
