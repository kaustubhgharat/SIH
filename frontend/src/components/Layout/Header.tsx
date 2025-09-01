import React, { useState, useEffect } from "react";
import { Leaf, Menu, X, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import type { UserRole } from "../../types";


export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const roles: { key: UserRole; label: string; path: string }[] = [
    { key: "farmer", label: "Farmer", path: "/farmer" },
    { key: "distributor", label: "Distributor", path: "/distributor" },
    { key: "consumer", label: "Consumer", path: "/consumer" },
  ];

  // check login status on mount
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                AgriTrace
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Produce Traceability System
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {roles.map((role) => (
              <Link
                key={role.key}
                to={role.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === role.path
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {role.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          {roles.map((role) => (
            <Link
              key={role.key}
              to={role.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === role.path
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {role.label}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="pt-3 border-t border-gray-200">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
