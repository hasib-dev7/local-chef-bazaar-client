import { useEffect, useState } from "react";
import Sidebar from "../../pages/dashboard/sidebar/Sidebar";
import { Menu, X } from "lucide-react";
import { Outlet, useLocation, useNavigation } from "react-router";
import DashboardNavbar from "../../components/shared/navber/DashboardNavbar";
import { Bounce, ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  // const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, setOpen]);
  // Global loading page for whole app
  // if (navigation.state === "loading") {
  //   return <LoadingSpinner></LoadingSpinner>;
  // }
  return (
    <>
      <title>Local Chef Bazaar - Dashboard</title>
      <div className="min-h-screen flex ">
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
      {/* react toast */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Toaster></Toaster>
    </>
  );
};

export default DashboardLayout;
