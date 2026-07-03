import { useEffect, useState } from "react";
import { isTheme } from "../theme";
import type { Theme } from "../theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return isTheme(savedTheme) ? savedTheme : "light";
  });

  useEffect(() => {
    const validatedTheme = isTheme(theme) ? theme : "light";

    document.documentElement.dataset.theme = validatedTheme;
    localStorage.setItem("theme", validatedTheme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return {
    theme,
    toggleTheme
  };
}
