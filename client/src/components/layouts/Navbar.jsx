import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ToolTip from "../ui/ToolTip";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "Explore", path: "/" },
  { label: "Movies", path: "/movies" },
  { label: "Sports", path: "/sports" },
  { label: "Live", path: "/live" },
];

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close the mobile menu automatically when the route changes
  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMenu]);

  // Common styles for NavLinks to maintain consistency
  const getNavLinkClass = ({ isActive }) =>
    `text-sm lg:text-base font-semibold transition-colors duration-200 ${
      isActive
        ? "text-primary-600"
        : "text-text-secondary hover:text-primary-500"
    }`;

  return (
    <>
      {/* Sticky Navbar with Frosted Glass Effect */}
      <nav className="sticky top-0 z-30 w-full flex items-center justify-between h-20 px-4 md:px-8 lg:px-12 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/logo.png"
            alt="BookShowFast Logo"
            className="h-8 lg:h-10 hidden sm:block"
          />
          {/* Fallback for very small screens */}
          <img
            src="/images/logosmaller.png"
            alt="BookShowFast Icon"
            className="h-10 sm:hidden"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 xl:gap-8 mr-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={getNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth/Action Buttons */}
          <div className="flex items-center gap-4 ">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="relative border-2 border-transparent hover:border-primary-100 rounded-full p-1 transition-colors group flex items-center justify-center bg-primary-50"
                  aria-label="User Profile"
                >
                  <img
                    src="/svg/user.svg"
                    alt="profile"
                    className="h-6 w-6 text-primary-600"
                  />
                  <ToolTip text="Profile" />
                </Link>
                <Button onClick={() => logout()} variant="outline">
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  onClick={() => navigate("/get-started")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setShowMenu(true)}
          className="lg:hidden p-2 -mr-2 text-text-secondary hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 rounded-default transition-colors"
          aria-expanded={showMenu}
          aria-label="Open menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay (Backdrop) */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-card shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out transform lg:hidden ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-bold text-lg text-primary-600">Menu</span>
          <button
            onClick={() => setShowMenu(false)}
            className="p-2 text-text-secondary hover:text-error-500 bg-gray-50 hover:bg-error-50 rounded-full transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col flex-1 overflow-y-auto py-4 px-6 gap-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary-600"
                      : "text-text-primary hover:text-primary-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Sidebar Footer / Auth */}
          <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-3 rounded-default bg-primary-50 hover:bg-primary-100 transition-colors"
                >
                  <img src="/svg/user.svg" alt="profile" className="h-6 w-6" />
                  <span className="font-medium text-text-primary">
                    My Profile
                  </span>
                </Link>
                <Button onClick={logout} variant="outline" fullWidth>
                  Log out
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  onClick={() => navigate("/get-started")}
                  fullWidth
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
