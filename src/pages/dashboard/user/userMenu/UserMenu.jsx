import { Heart, ShoppingBag, Star, User } from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";


const UserMenu = () => {
  return (
    <>
       <div className="px-4 text-sm text-gray-500">USER DASHBOARD</div>
      <nav className="mt-2 space-y-1">
        <SidebarLink to="profile" label="My Profile" icon={User} />
        <SidebarLink to="orders" label="My Orders" icon={ShoppingBag} />
        <SidebarLink to="reviews" label="My Reviews" icon={Star} />
        <SidebarLink to="favorites" label="Favorite Meals" icon={Heart} />
      </nav>
    </>
  );
};

export default UserMenu;