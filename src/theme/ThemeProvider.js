import { createContext, useContext, useMemo, useState } from "react";
import { darkColors, lightColors } from "./colors";

const ThemeCtx = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const value = useMemo(() => {
    const colors = mode === "dark" ? darkColors : lightColors;
    return {
      mode,
      colors,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
      setMode,
    };
  }, [mode]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
