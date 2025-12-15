import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Container from "../../container/Container";

import TitleLogo from "../TitleLogo/TitleLogo";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import { ChefHat } from "lucide-react";

const Navber = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut();
  };
  const navLinks = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/meals", label: "Meals" },
        { to: "/register", label: "Register" },
        { to: "/login", label: "Login" },
      ].map((link, index) => (
        <li>
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-primary hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <>
      {/* Fixed Glass Navbar */}
      <div
        className={`fixed w-full z-50 top-0 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? "py-1" : "py-3"
        }`}
      >
        <Container>
          <div className="navbar ">
            {/* Navbar Start */}
            <div className="navbar-start text-gray-700">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box shadow-lg mt-3 w-52 p-2"
                >
                  {navLinks}
                </ul>
              </div>
              {/* nav logo */}
              <div className="hidden lg:block">
                <TitleLogo></TitleLogo>
              </div>
              <div className="lg:hidden">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
              {user ? (
                <div className="dropdown dropdown-left">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost rounded-full flex items-center gap-2"
                  >
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className={`rounded-full border-2 border-gray-300 transition-all duration-300 ${
                        isScrolled ? "w-6 h-6" : "w-8 h-8"
                      }`}
                    />
                    <span
                      className={`hidden md:inline font-medium transition-all duration-300 ${
                        isScrolled ? "text-sm" : "text-base"
                      }`}
                    >
                      {user.displayName}
                    </span>
                  </label>
                  <ul className="dropdown-content menu bg-white/80 backdrop-blur-md rounded-box shadow-md w-52 p-2 mt-1">
                    <li>
                      <h4 className="font-semibold">{user.displayName}</h4>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-500 font-semibold hover:text-red-700 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="px-2 lg:px-4 py-2 lg:py-3 rounded-md lg:rounded-lg bg-white text-black hover:bg-[#22c35d] hover:text-white "
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-2 lg:px-4 py-2 lg:py-3 rounded-md lg:rounded-lg bg-primary text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Spacer */}
      <div className="h-24"></div>
    </>
  );
};

export default Navber;
