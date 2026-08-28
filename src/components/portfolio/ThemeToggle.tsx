import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        window.localStorage.setItem("theme", next);
      }}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="theme-toggle"
    >
      {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
