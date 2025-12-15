import { BarChart3, ClipboardCheck, Users } from 'lucide-react';
import React from 'react';
import SidebarLink from '../../sidebar/SidebarLink';

const AdminMenu = () => {
  return (
    <>
      <div className="px-4 mt-6 text-sm text-gray-500">
        ADMIN DASHBOARD
      </div>

      <nav className="mt-2 space-y-1">
        <SidebarLink
          to="manage-users"
          label="Manage Users"
          icon={Users}
        />

        <SidebarLink
          to="manage-requests"
          label="Manage Requests"
          icon={ClipboardCheck}
        />

        <SidebarLink
          to="stats"
          label="Platform Statistics"
          icon={BarChart3}
        />
      </nav>
    </>
  );
};

export default AdminMenu;