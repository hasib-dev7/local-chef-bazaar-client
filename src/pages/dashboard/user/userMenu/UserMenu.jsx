import { Heart, ShoppingBag, Star, User } from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";
const UserMenu = ({onClose}) => {
  return (
    <>
      <div className="px-4 text-sm text-gray-500">USER DASHBOARD</div>
      <nav className="mt-2 space-y-1">
        <SidebarLink
          to="dashboard/user-profile"
          label="My Profile"
          icon={User}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/user-orders"
          label="My Orders"
          icon={ShoppingBag}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/user-review"
          label="My Reviews"
          icon={Star}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/user-favoriteMeal"
          label="Favorite Meals"
          icon={Heart}
          onClick={onClose}
        />
      </nav>
    </>
  );
};

export default UserMenu;
