import { useEffect, useState } from "react";
import Sidebar from "../../pages/dashboard/sidebar/Sidebar";
import { Menu, X } from "lucide-react";
import { Outlet, useLocation } from "react-router";
import DashboardNavbar from "../../components/shared/navber/DashboardNavbar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, setOpen]);
  return (
    <>
      <div className="min-h-screen flex bg-[#faf7f2]">
        {/* Desktop Sidebar */}
        <Sidebar isMobile={false} />

        {/* Mobile Sidebar */}
        {open && (
          <div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-64 bg-white h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar isMobile={true} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Dashboard Navbar */}
          <DashboardNavbar open={open} setOpen={setOpen} />

          {/* Dashboard Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
