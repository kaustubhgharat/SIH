import { useState } from "react";
import { Leaf, Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const NavbarPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { label: "Add Product", path: "/add-product" },
    { label: "Inventory", path: "/inventory" },
    { label: "Transaction", path: "/transaction" },
    { label: "Analysis", path: "/analysis" },
    { label: "Feedback", path: "/feedback" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Project Name */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-2xl shadow-md">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 select-none">
                AgriTrace
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Produce Traceability System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <SignedIn>
            {" "}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="text-gray-700 hover:text-green-700 font-medium transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </SignedIn>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-md">
                  <span>Login</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Toggle mobile menu"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-2 absolute w-full shadow-lg">
          {/* Mobile Navigation Links */}
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-green-100"
            >
              {label}
            </Link>
          ))}

          <SignedOut>
            <SignInButton mode="modal">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 w-full text-left px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                <span>Login</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 w-full text-left px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <div className="flex items-center px-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      )}
    </header>
  );
};

export default NavbarPage;
