import { Heart, ShoppingBag, Star} from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";
const UserMenu = ({onClose}) => {
  return (
    <>
      
      <nav className="mt-2 space-y-1">
       
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
