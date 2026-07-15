"use client";

import { useEffect, useCallback, createContext, useContext } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeInner({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useNextTheme();
  const typedTheme = (theme as Theme) || "dark";

  const toggle = useCallback(() => {
    setTheme(typedTheme === "dark" ? "light" : "dark");
  }, [typedTheme, setTheme]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", typedTheme === "dark" ? "#0a0a0a" : "#f5f5f0");
    }
  }, [typedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: typedTheme, toggle, setTheme: setTheme as (t: Theme) => void }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeInner>
        {children}
      </ThemeInner>
    </NextThemesProvider>
  );
}
