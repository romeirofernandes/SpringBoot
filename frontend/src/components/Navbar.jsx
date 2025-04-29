import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaFlag } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const syncLogin = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", syncLogin);
    return () => window.removeEventListener("storage", syncLogin);
  }, []);

  return (
    <nav className="backdrop-blur-md bg-white/20 shadow-lg rounded-full w-4xl mx-auto mt-4">
      <div className="max-w-5xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FaFlag className="text-[#e10600] text-2xl" />
            <span className="text-xl font-bold text-white">
              F1 Race Explorer
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                (isActive
                  ? "text-[#e10600] font-semibold"
                  : "hover:text-[#e10600]") + " text-white"
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                (isActive
                  ? "text-[#e10600] font-semibold"
                  : "hover:text-[#e10600]") + " text-white"
              }
            >
              Teams
            </NavLink>
            <NavLink
              to="/drivers"
              className={({ isActive }) =>
                (isActive
                  ? "text-[#e10600] font-semibold"
                  : "hover:text-[#e10600]") + " text-white"
              }
            >
              Drivers
            </NavLink>
            <NavLink
              to="/races"
              className={({ isActive }) =>
                (isActive
                  ? "text-[#e10600] font-semibold"
                  : "hover:text-[#e10600]") + " text-white"
              }
            >
              Races
            </NavLink>
            <NavLink
              to="/circuits"
              className={({ isActive }) =>
                (isActive
                  ? "text-[#e10600] font-semibold"
                  : "hover:text-[#e10600]") + " text-white"
              }
            >
              Circuits
            </NavLink>
            <NavLink
              to="/game"
              className={({ isActive }) =>
                (isActive
                  ? "text-[#0090d0] font-semibold"
                  : "hover:text-[#0090d0]") + " text-white"
              }
            >
              F1 Quiz
            </NavLink>
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    (isActive
                      ? "text-[#e10600] font-semibold"
                      : "hover:text-[#e10600]") + " text-white"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    (isActive
                      ? "text-[#0090d0] font-semibold"
                      : "hover:text-[#0090d0]") + " text-white"
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-4 bg-[#e10600] hover:bg-[#c10600] px-4 py-2 rounded font-semibold text-white"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden space-y-2 text-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 text-white ${
                  isActive
                    ? "text-[#e10600] font-semibold"
                    : "hover:text-[#e10600]"
                }`
              }
              end
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                `block py-2 text-white ${
                  isActive
                    ? "text-[#e10600] font-semibold"
                    : "hover:text-[#e10600]"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Teams
            </NavLink>
            <NavLink
              to="/drivers"
              className={({ isActive }) =>
                `block py-2 text-white ${
                  isActive
                    ? "text-[#e10600] font-semibold"
                    : "hover:text-[#e10600]"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Drivers
            </NavLink>
            <NavLink
              to="/races"
              className={({ isActive }) =>
                `block py-2 text-white ${
                  isActive
                    ? "text-[#e10600] font-semibold"
                    : "hover:text-[#e10600]"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Races
            </NavLink>
            <NavLink
              to="/circuits"
              className={({ isActive }) =>
                `block py-2 text-white ${
                  isActive
                    ? "text-[#e10600] font-semibold"
                    : "hover:text-[#e10600]"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Circuits
            </NavLink>
            <NavLink
              to="/game"
              className={({ isActive }) =>
                `block py-2 text-white ${
                  isActive
                    ? "text-[#0090d0] font-semibold"
                    : "hover:text-[#0090d0]"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              F1 Quiz
            </NavLink>
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 text-white ${
                      isActive
                        ? "text-[#e10600] font-semibold"
                        : "hover:text-[#e10600]"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `block py-2 text-white ${
                      isActive
                        ? "text-[#0090d0] font-semibold"
                        : "hover:text-[#0090d0]"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block py-2 font-semibold text-white"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
