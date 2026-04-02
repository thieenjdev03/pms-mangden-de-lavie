/** Design tokens — use these instead of ad-hoc hex values (see docs/PRIMARY_COLOR_LIST.md). */

export const colors = {
  primary: "#1677FF",
  secondary: "#5B76B2",
  tertiary: "#D45500",
  background: "#F5F5F5",
  textPrimary: "#1F1F1F",
  textSecondary: "#8C8C8C",
  border: "#E5E7EB",
} as const;

/** Calendar / property accents (ocean, hillside, homestay). */
export const propertyColors = {
  ocean: "#1677FF",
  hillside: "#5B76B2",
  homestay: "#D45500",
} as const;

/** Maps villa ids (seed data) to theme accent keys. */
const VILLA_ID_TO_PALETTE_KEY: Record<string, keyof typeof propertyColors> = {
  v1: "ocean",
  v2: "hillside",
  v3: "homestay",
};

/** Extra accents for villas created at runtime (stable hash by id). */
const EXTRA_CALENDAR_ACCENTS = ["#13C2C2", "#EB2F96", "#52C41A", "#FA8C16", "#2F54EB"] as const;

function hashVillaId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Solid accent for calendar pills (Hillside = purple per booking calendar spec). */
const CALENDAR_EVENT_ACCENT: Record<keyof typeof propertyColors, string> = {
  ocean: propertyColors.ocean,
  hillside: "#722ED1",
  homestay: propertyColors.homestay,
};

/** Background for FullCalendar events (per villa). Falls back to primary. */
export function getPropertyCalendarColor(villaId: string): string {
  const key = VILLA_ID_TO_PALETTE_KEY[villaId];
  if (key) return propertyColors[key];
  const i = hashVillaId(villaId) % EXTRA_CALENDAR_ACCENTS.length;
  return EXTRA_CALENDAR_ACCENTS[i] ?? colors.primary;
}

/** Accent color for calendar event borders / text (pill style). */
export function getCalendarEventAccent(villaId: string): string {
  const key = VILLA_ID_TO_PALETTE_KEY[villaId];
  if (key) return CALENDAR_EVENT_ACCENT[key];
  const i = hashVillaId(villaId) % EXTRA_CALENDAR_ACCENTS.length;
  return EXTRA_CALENDAR_ACCENTS[i] ?? colors.primary;
}
