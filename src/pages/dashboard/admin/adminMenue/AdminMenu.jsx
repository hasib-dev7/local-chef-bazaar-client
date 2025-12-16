import { BarChart3, ClipboardCheck, User, Users } from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";

const AdminMenu = ({onClose}) => {
  return (
    <>
      <div className="px-4 mt-6 text-sm text-gray-500">ADMIN DASHBOARD</div>
      <nav className="mt-2 space-y-1">
        <SidebarLink
          to="dashboard/admin-profile"
          label="My Profile"
          icon={User}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/admin-manageUser"
          label="Manage Users"
          icon={Users}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/admin-manageRequest"
          label="Manage Requests"
          icon={ClipboardCheck}
          onClick={onClose}
        />
        <SidebarLink
          to="dashboard/admin-PlatformStatistics"
          label="Platform Statistics"
          icon={BarChart3}
          onClick={onClose}
        />
      </nav>
    </>
  );
};

export default AdminMenu;
