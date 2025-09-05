import { useThemeStore } from "@/store/useThemStore";
import { Monitor, Moon, Sun } from "lucide-react";

const ThemeMode = () => {
  const { theme, setLightTheme, setDarkTheme, setSystemTheme } =
    useThemeStore();

  return (
    <div className="absolute p-2 right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
      <button
        onClick={setLightTheme}
        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 rounded-md ${
          theme === "light"
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        <Sun className="h-4 w-4" />
        Light
      </button>
      <button
        onClick={setDarkTheme}
        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 rounded-md ${
          theme === "dark"
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        <Moon className="h-4 w-4" />
        Dark
      </button>
      <button
        onClick={setSystemTheme}
        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 rounded-md ${
          theme === "system"
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        <Monitor className="h-4 w-4" />
        System
      </button>
    </div>
  );
};

export default ThemeMode;
