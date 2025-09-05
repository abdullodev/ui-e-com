import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import { useThemeStore } from "@/store/useThemStore";
import { Monitor, Moon, Search, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { nav_items } from "../common/constants";

const MobileMenu = () => {
  const { theme, setLightTheme, setDarkTheme, setSystemTheme } =
    useThemeStore();
  const { navigateWithTransition } = useNavigationTransition();

  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="px-3 py-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            />
          </div>
        </div>

        {nav_items.map((nav) => (
          <button
            key={nav.key}
            onClick={() => navigateWithTransition(nav.to)}
            className={`hover:text-blue-600 dark:hover:text-blue-400 ${
              isActive(nav.to)
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-300"
            } px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer block`}
          >
            {nav.label}
          </button>
        ))}

        {/* Mobile Theme Toggle */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme
            </span>
            <div className="flex gap-1">
              <button
                onClick={setLightTheme}
                className={`p-1 rounded ${
                  theme === "light"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                    : "text-gray-500 dark:text-gray-400"
                } transition-colors duration-200`}
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={setDarkTheme}
                className={`p-1 rounded ${
                  theme === "dark"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                    : "text-gray-500 dark:text-gray-400"
                } transition-colors duration-200`}
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={setSystemTheme}
                className={`p-1 rounded ${
                  theme === "system"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                    : "text-gray-500 dark:text-gray-400"
                } transition-colors duration-200`}
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
