import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const NavbarPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; path: string }[] = [
    { label: "Home", path: "/" },
    { label: "Add Product", path: "/add-product" },
    { label: "Inventory", path: "/inventory" },
    { label: "Transaction", path: "/transaction" },
    { label: "Analysis", path: "/analysis" },
    { label: "Feedback", path: "/feedback" },
  ];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    const baseClasses = "font-medium transition-colors duration-300";
    return isActive
      ? `${baseClasses} text-green-600`
      : `${baseClasses} text-gray-700 hover:text-green-600`;
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
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
            </NavLink>

            {/* Desktop Navigation */}
            <SignedIn>
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map(({ label, path }) => (
                  <NavLink key={label} to={path} className={getNavLinkClass}>
                    {label}
                  </NavLink>
                ))}
              </nav>
            </SignedIn>

            {/* Right Side Auth */}
            <div className="hidden md:flex items-center space-x-5">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:scale-105">
                    Login / Sign Up
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="ml-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <SignedIn>
                <div className="mr-4">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/40"
          aria-hidden="true"
        ></div>

        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-bold text-lg">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <nav className="flex flex-col space-y-2">
              <SignedIn>
                {navLinks.map(({ label, path }) => (
                  <NavLink
                    key={label}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full mt-4 px-4 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300">
                    Login / Sign Up
                  </button>
                </SignInButton>
              </SignedOut>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPage;
