import { useState } from "react";
import Sidebar from "../../pages/dashboard/sidebar/Sidebar";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#faf7f2]">
      {/* Desktop Sidebar */}
      <Sidebar isMobile={false} />

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="w-64 bg-white h-full">
            <Sidebar isMobile={true} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Mobile Top Bar */}
        <div className="lg:hidden mb-4">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
