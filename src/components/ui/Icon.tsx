import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandWhatsapp,
  IconBuildingSkyscraper,
  IconCalendarCheck,
  IconCalendarEvent,
  IconCircleCheck,
  IconClock,
  IconDiamond,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconPlus,
  IconQuote,
  IconRoute,
  IconX,
  type IconProps,
} from "@tabler/icons-react";

/** Tabler outline icons used across the page (same names as the reference). */
export const Icons = {
  arrowLeft: IconArrowLeft,
  arrowRight: IconArrowRight,
  whatsapp: IconBrandWhatsapp,
  scale: IconBuildingSkyscraper,
  calendar: IconCalendarCheck,
  calendarEvent: IconCalendarEvent,
  check: IconCircleCheck,
  clock: IconClock,
  diamond: IconDiamond,
  mail: IconMail,
  pin: IconMapPin,
  chat: IconMessageCircle,
  phone: IconPhone,
  plus: IconPlus,
  quote: IconQuote,
  route: IconRoute,
  close: IconX,
} as const;

export type IconName = keyof typeof Icons;

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const C = Icons[name];
  return <C stroke={1.6} aria-hidden="true" focusable="false" {...props} />;
}
