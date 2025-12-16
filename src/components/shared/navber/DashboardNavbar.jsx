import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
const DashboardNavbar = ({ open, setOpen }) => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut();
  };
  return (
    <>
      <div className=" navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50 ">
        {/* Left side */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden btn btn-ghost btn-circle"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Title */}
          <h2 className="font-semibold text-lg">Dashboard</h2>
        </div>

        {/* Right side */}
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div>
              {user ? (
                <div className="dropdown dropdown-left">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost rounded-full flex items-center gap-2"
                  >
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                    />
                    <span className="hidden md:inline font-medium">
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
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
