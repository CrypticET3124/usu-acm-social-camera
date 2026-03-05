import React, { createContext, useContext } from "react";
import { CAMERA_THEMES } from "./themes";
import { CameraTheme } from "./types";

const defaultTheme = CAMERA_THEMES[0];
const CameraThemeContext = createContext<CameraTheme>(defaultTheme);

export function CameraThemeProvider({
  value,
  children,
}: {
  value?: Partial<CameraTheme>;
  children: React.ReactNode;
}) {
  const merged = { ...defaultTheme, ...(value ?? {}) };
  return (
    <CameraThemeContext.Provider value={merged}>
      {children}
    </CameraThemeContext.Provider>
  );
}

export function useCameraTheme(): CameraTheme {
  return useContext(CameraThemeContext);
}

