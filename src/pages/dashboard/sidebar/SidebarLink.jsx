import { NavLink } from "react-router";

const SidebarLink = ({ to, label, icon: Icon }) => {
  return (
    <>
      <NavLink
        to={to}
        end
        //  onClick={onclick}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-all duration-300
        ${
          isActive
            ? "bg-orange-100 text-orange-600 font-medium translate-x-1"
            : "text-gray-700 hover:bg-gray-100"
        }`
        }
      >
        {Icon && <Icon size={18} />}
        <span>{label}</span>
      </NavLink>
    </>
  );
};

export default SidebarLink;
