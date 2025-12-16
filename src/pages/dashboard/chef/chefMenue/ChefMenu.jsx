import { ClipboardList, Package, User, UtensilsCrossed } from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";
const ChefMenu = ({onClose}) => {
  return (
    <>
      <div className="px-4 mt-6 text-sm text-gray-500">CHEF DASHBOARD</div>
      <nav className="mt-2 space-y-1">
        <SidebarLink
          to="dashboard/chef-profile"
          label="My Profile"
          icon={User}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/chef-createMeal"
          label="Create Meal"
          icon={UtensilsCrossed}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/chef-myMeals"
          label="My Meals"
          icon={Package}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/chef-orderRequest"
          label="Order Requests"
          icon={ClipboardList}
          onClick={onClose}
        />
      </nav>
    </>
  );
};

export default ChefMenu;
