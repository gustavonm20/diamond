/** Every piece of content that still needs the client's sign-off carries `confirmed: false`. */
export type Confirmable = {
  confirmed: boolean;
  /** What exactly needs to be confirmed. Shown in the ConfirmBadge tooltip and in `npm run check:content`. */
  confirmNote?: string;
};

/** Rich inline text: plain strings, or `{ accent }` parts rendered in Instrument Serif italic gold. */
export type RichPart = string | { accent: string };
export type Rich = RichPart[];

export type SceneKind =
  "fachada" | "letra" | "backlight" | "totem" | "sinalizacao" | "adesivo" | "backdrop" | "outdoor";

/** Temporary procedural illustration standing in for a real project photo. */
export type SceneSpec = {
  kind: SceneKind;
  label: string;
  lit?: boolean;
};

export type Service = Confirmable & {
  id: SceneKind;
  title: string;
  tagline: string;
  idealFor: string;
  scene: SceneSpec;
  waMessage: string;
};

export type Segment = {
  id: string;
  title: string;
  headline: string;
  body: string;
  proof: string[];
  cta: string;
  waMessage: string;
  track: string;
  scene: SceneSpec;
};

export type CaseStudy = Confirmable & {
  client: string;
  segment: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  scene: SceneSpec;
};

export type PortfolioItem = Confirmable & {
  id: string;
  client: string;
  category: SceneKind;
  scene: SceneSpec;
};

export type Stat = Confirmable & {
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
  /** Plain-language value for screen readers. */
  srText: string;
};

export type FaqItem = Confirmable & {
  question: string;
  answer: string;
};

export type ProcessStep = Confirmable & {
  title: string;
  body: string;
};

export type Differentiator = {
  icon: "clock" | "calendar" | "diamond" | "scale" | "chat" | "route";
  title: string;
  body: string;
  kicker?: string;
  size?: "big" | "full";
};

export type TestimonialSlot = Confirmable & {
  segment: string;
};
