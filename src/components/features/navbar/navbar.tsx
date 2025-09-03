import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              GrapeMart
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navbars.map((nav) => (
                <Link
                  key={nav.key}
                  to={nav.to}
                  className={`hover:text-blue-600 ${
                    isActive(nav.to) ? "text-blue-600" : "text-gray-500"
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-500 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/profile")}
            >
              <User className="h-6 w-6" />
            </button>
            <button
              className="text-gray-500 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/profile", { state: "wishlist" })}
            >
              <Heart className="h-6 w-6" />
            </button>
            <button
              className="text-gray-500 hover:text-blue-600 transition-colors relative"
              onClick={() => navigate("/basket")}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Categories
            </Link>
            <Link
              to="products"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
