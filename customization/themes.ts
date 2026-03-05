import type { CameraTheme } from "./types";

/**
 * Available camera themes for the app.
 * Students can add new themes here to learn about theming and how theme values
 * affect overlays and stickers throughout the app.
 * 
 * Themes use semantic color names (primary, secondary, surface, muted) that can be
 * reused across different components without adding new properties.
 */
export const CAMERA_THEMES: CameraTheme[] = [
  {
    name: "ACM Dark",
    primaryColor: "white",
    primaryTextColor: "white",
    secondaryColor: "rgba(155,155,155,1)",
    secondaryTextColor: "white",
    surfaceColor: "rgba(5,5,5,0.9)",
    surfaceTextColor: "white",
    mutedColor: "rgba(255,255,255,0.2)",
    mutedTextColor: "rgba(230,230,230,1)",
  },
  {
    name: "Neon Mint",
    primaryColor: "#7CFFB2",
    primaryTextColor: "#7CFFB2",
    secondaryColor: "rgba(124,255,178,0.3)",
    secondaryTextColor: "white",
    surfaceColor: "rgba(4,4,8,0.95)",
    surfaceTextColor: "white",
    mutedColor: "rgba(124,255,178,0.2)",
    mutedTextColor: "rgba(200,200,200,1)",
  },
  {
    name: "Daylight",
    primaryColor: "#111111",
    primaryTextColor: "#111111",
    secondaryColor: "rgba(100,100,100,1)",
    secondaryTextColor: "white",
    surfaceColor: "rgba(250,250,250,0.96)",
    surfaceTextColor: "#111111",
    mutedColor: "rgba(0,0,0,0.15)",
    mutedTextColor: "rgba(50,50,50,1)",
  },
];
