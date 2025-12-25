import { User } from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";

const ProfileMenu = ({ onClose }) => {
  return (
    <>
      <SidebarLink
        to="/dashboard"
        label="My Profile"
        icon={User}
        onClick={onClose}
      />
    </>
  );
};

export default ProfileMenu;
