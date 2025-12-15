import { ClipboardList, Package, UtensilsCrossed } from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";

const ChefMenu = () => {
  return (
    <>
      <div className="px-4 mt-6 text-sm text-gray-500">CHEF DASHBOARD</div>

      <nav className="mt-2 space-y-1">
        <SidebarLink
          to="create-meal"
          label="Create Meal"
          icon={UtensilsCrossed}
        />

        <SidebarLink to="my-meals" label="My Meals" icon={Package} />

        <SidebarLink
          to="order-requests"
          label="Order Requests"
          icon={ClipboardList}
        />
      </nav>
    </>
  );
};

export default ChefMenu;
