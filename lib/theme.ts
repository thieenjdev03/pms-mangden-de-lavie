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

/** Maps app property names (rooms.property) to theme accent keys. */
const PROPERTY_TO_PALETTE_KEY: Record<string, keyof typeof propertyColors> = {
  "Villa 1": "ocean",
  "Villa 2": "hillside",
  "Homestay 1": "homestay",
};

/** Solid accent for calendar pills (Hillside = purple per booking calendar spec). */
const CALENDAR_EVENT_ACCENT: Record<keyof typeof propertyColors, string> = {
  ocean: propertyColors.ocean,
  hillside: "#722ED1",
  homestay: propertyColors.homestay,
};

/** Background for FullCalendar events (per property). Falls back to primary. */
export function getPropertyCalendarColor(propertyName: string): string {
  const key = PROPERTY_TO_PALETTE_KEY[propertyName];
  if (key) return propertyColors[key];
  return colors.primary;
}

/** Accent color for calendar event borders / text (pill style). */
export function getCalendarEventAccent(propertyName: string): string {
  const key = PROPERTY_TO_PALETTE_KEY[propertyName];
  if (key) return CALENDAR_EVENT_ACCENT[key];
  return colors.primary;
}
