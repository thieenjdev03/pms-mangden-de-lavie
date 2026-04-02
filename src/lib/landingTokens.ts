/**
 * Nature Healing palette for the public landing (mirrors app/globals.css @theme heal-*).
 * Use Tailwind classes (bg-heal-*, text-heal-*) in UI; this file is for programmatic use.
 */
export const landingColors = {
  primary: {
    50: "#f3f7f4",
    100: "#e0ebe4",
    200: "#c2d8cb",
    300: "#9fc1ae",
    400: "#7aa88f",
    500: "#5f9276",
    600: "#4a7a61",
    700: "#3a614e",
    800: "#2f4e40",
    900: "#263f34",
  },
  accent: "#1f4d3a",
  accentHover: "#173c2d",
  neutral: {
    light: "#f8faf9",
    soft: "#eef2f0",
    glass: "rgba(255,255,255,0.6)",
    border: "rgba(255,255,255,0.2)",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#5b6b63",
    muted: "#8a9a92",
  },
  highlight: "#6b8f7b",
} as const;
