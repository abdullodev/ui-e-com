import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface DarkModeState {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setSystemTheme: () => void;
  initializeTheme: () => void;
}

const isValidTheme = (value: string): value is Theme => {
  return ["light", "dark", "system"].includes(value);
};

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  try {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && isValidTheme(storedTheme)) {
      return storedTheme;
    }
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
  }

  // If no valid stored theme, check system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"; // Changed from "system" to "dark" for cleaner initial state
  }

  return "light";
};

const getIsDark = (theme: Theme): boolean => {
  if (typeof window === "undefined") return false;

  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return theme === "dark";
};

const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("light", "dark");

  let actualTheme: "light" | "dark";

  if (theme === "system") {
    actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } else {
    actualTheme = theme;
  }

  root.classList.add(actualTheme);

  // Store theme preference in localStorage
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
};

export const useThemeStore = create<DarkModeState>((set, get) => {
  let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

  const setupSystemThemeListener = () => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Remove existing listener if any
    if (mediaQueryListener) {
      mediaQuery.removeEventListener("change", mediaQueryListener);
      mediaQueryListener = null;
    }

    // Only add listener if theme is set to system
    if (get().theme === "system") {
      mediaQueryListener = (e: MediaQueryListEvent) => {
        const currentTheme = get().theme;
        if (currentTheme === "system") {
          set({ isDark: e.matches });
          applyTheme("system");
        }
      };

      mediaQuery.addEventListener("change", mediaQueryListener);
    }
  };

  const updateTheme = (newTheme: Theme) => {
    const isDark = getIsDark(newTheme);
    applyTheme(newTheme);

    set({ theme: newTheme, isDark });

    // Setup or cleanup system theme listener
    setupSystemThemeListener();
  };

  const initialTheme = getInitialTheme();

  // Apply theme immediately on store creation
  if (typeof window !== "undefined") {
    applyTheme(initialTheme);
  }

  return {
    theme: initialTheme,
    isDark: getIsDark(initialTheme),

    toggleTheme: () => {
      const currentTheme = get().theme;
      let newTheme: Theme;

      switch (currentTheme) {
        case "light":
          newTheme = "dark";
          break;
        case "dark":
          newTheme = "system";
          break;
        case "system":
          newTheme = "light";
          break;
        default:
          newTheme = "light";
      }

      updateTheme(newTheme);
    },

    setLightTheme: () => updateTheme("light"),
    setDarkTheme: () => updateTheme("dark"),
    setSystemTheme: () => updateTheme("system"),

    initializeTheme: () => {
      const theme = get().theme;
      applyTheme(theme);
      setupSystemThemeListener();
    },
  };
});
