import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Container from "../../container/Container";
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

  const navLinks = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/meals", label: "Meals" },
      ].map((link) => (
        <li>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? "bg-[#f07f2c] text-white"
                  : "text-gray-700 hover:bg-[#f07f2c] hover:text-white"
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
              <div>
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#f07f2c] flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold font-display">
                    LocalChef<span className="text-[#f07f2c]">Bazaar</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
              <h1>navber end</h1>
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
