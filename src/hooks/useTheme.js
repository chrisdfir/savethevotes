"use client";
import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((value) => {
    const isDark =
      value === "dark" ||
      (value === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("savethevote-theme");
    const initial = stored || "system";
    setTheme(initial);
    applyTheme(initial);

    // Listen for system preference changes
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if ((stored || "system") === "system") applyTheme("system");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [applyTheme]);

  const setAndApply = useCallback(
    (value) => {
      setTheme(value);
      localStorage.setItem("savethevote-theme", value);
      applyTheme(value);
    },
    [applyTheme]
  );

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setAndApply(next);
  }, [theme, setAndApply]);

  return { theme, setTheme: setAndApply, toggle, mounted };
}
