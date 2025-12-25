import { BarChart3, ClipboardCheck,  Users } from "lucide-react";
import SidebarLink from "../../sidebar/SidebarLink";

const AdminMenu = ({onClose}) => {
  return (
    <>
    
      <nav className="mt-2 space-y-1">
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
