import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { waLinkProps } from "@/lib/whatsapp";
import { Icon, type IconName } from "./Icon";

type Variant = "gold" | "line" | "ink";

type Common = {
  variant?: Variant;
  size?: "sm" | "md";
  /** Magnetic hover on fine pointers (handled globally by <Magnetic />). */
  magnetic?: boolean;
  icon?: IconName;
  iconPosition?: "start" | "end";
  children: ReactNode;
};

function classes(variant: Variant, size: Common["size"], className?: string) {
  return cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);
}

function Content({
  icon,
  iconPosition = "end",
  children,
}: Pick<Common, "icon" | "iconPosition" | "children">) {
  const i = icon ? (
    <Icon name={icon} className={icon === "arrowRight" ? "arrow" : undefined} />
  ) : null;
  return (
    <>
      {iconPosition === "start" && i}
      {children}
      {iconPosition === "end" && i}
    </>
  );
}

export function ButtonLink({
  variant = "gold",
  size,
  magnetic,
  icon,
  iconPosition,
  className,
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={classes(variant, size, className)}
      data-magnetic={magnetic || undefined}
      {...rest}
    >
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </a>
  );
}

export function Button({
  variant = "gold",
  size,
  magnetic,
  icon,
  iconPosition,
  className,
  children,
  type = "button",
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={classes(variant, size, className)}
      data-magnetic={magnetic || undefined}
      {...rest}
    >
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}

/** Opens WhatsApp with an origin-specific message. Click tracked as `whatsapp_click {origin}`. */
export function WaButton({
  message,
  origin,
  ...props
}: Common & { message: string; origin: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >) {
  return <ButtonLink {...waLinkProps(message, origin)} {...props} />;
}
