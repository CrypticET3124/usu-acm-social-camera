import React, { createContext, useContext } from "react";
import { THEMES } from "./themes";
import { Theme } from "./types";

const defaultTheme = THEMES[0];
const CameraThemeContext = createContext<Theme>(defaultTheme);

export function ThemeProvider({
  value,
  children,
}: {
  value?: Partial<Theme>;
  children: React.ReactNode;
}) {
  const merged = { ...defaultTheme, ...(value ?? {}) };
  return (
    <CameraThemeContext.Provider value={merged}>
      {children}
    </CameraThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(CameraThemeContext);
}

