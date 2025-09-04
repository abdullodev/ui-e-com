import { useDarkMode } from "@/hooks/useDarkMode";
import { useNavigationTransition } from "@/hooks/useNavigateTransition";
import {
  Heart,
  Menu,
  Monitor,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navbars = [
  {
    key: "1",
    to: "/",
    label: "Home",
  },
  {
    key: "2",
    to: "/categories",
    label: "Categories",
  },
  {
    key: "3",
    to: "/products",
    label: "Products",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { navigateWithTransition } = useNavigationTransition();
  const { theme, setLightTheme, setDarkTheme, setSystemTheme } = useDarkMode();

  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "system":
        return <Monitor className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

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
              GrapeMart
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navbars.map((nav) => (
                <button
                  key={nav.key}
                  onClick={() => navigateWithTransition(nav.to)}
                  className={`hover:text-blue-600 dark:hover:text-blue-400 ${
                    isActive(nav.to)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-300"
                  } px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer`}
                >
                  {nav.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="relative">
              <button
                className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer p-1"
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              >
                {getThemeIcon()}
              </button>

              {/* Theme Dropdown */}
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      setLightTheme();
                      setIsThemeMenuOpen(false);
                    }}
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
                    onClick={() => {
                      setDarkTheme();
                      setIsThemeMenuOpen(false);
                    }}
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
                    onClick={() => {
                      setSystemTheme();
                      setIsThemeMenuOpen(false);
                    }}
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
              )}
            </div>

            <button
              className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              onClick={() => navigateWithTransition("/profile")}
            >
              <User className="h-6 w-6" />
            </button>
            <button
              className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/profile", { state: "wishlist" })}
            >
              <Heart className="h-6 w-6" />
            </button>
            <button
              className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative cursor-pointer"
              onClick={() => navigateWithTransition("/basket")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
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

            {navbars.map((nav) => (
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
      )}

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
