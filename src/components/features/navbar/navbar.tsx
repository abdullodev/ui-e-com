import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import { useThemeStore } from "@/store/useThemStore";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import DrawerCart from "./feature/drawer-cart";
import Language from "./feature/language";
import NavUser from "./feature/nav-user";
import SearchBar from "./feature/search-bar";
import ThemeMode from "./feature/theme-mode";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const { navigateWithTransition } = useNavigationTransition();
  const { theme, setDarkTheme, setLightTheme, setSystemTheme } =
    useThemeStore();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer transition-colors duration-200"
              onClick={() => navigateWithTransition("/")}
            >
              Grape
            </h1>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <SearchBar />

            {/* Language */}
            <Language />

            {/* Theme Dropdown */}
            <ThemeMode
              setDarkTheme={setDarkTheme}
              setLightTheme={setLightTheme}
              setSystemTheme={setSystemTheme}
              theme={theme}
              key="theme_mode"
            />

            <NavUser />

            <DrawerCart />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for theme menu */}
      {isThemeMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsThemeMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
