import AdminMenu from "../admin/adminMenue/AdminMenu";
import ChefMenu from "../chef/chefMenue/ChefMenu";
import UserMenu from "../user/userMenu/UserMenu";

const Sidebar = ({ isMobile }) => {
  return (
    <>
      <aside
        className={`w-64 bg-white border-r flex flex-col h-screen ${
          isMobile ? "lg:hidden" : "hidden lg:flex"
        }`}
      >
        <div className="p-6 text-xl font-bold text-orange-500">
          LocalChefBazaar
        </div>

        {/* Scrollable menu */}
        <div className="flex-1 overflow-y-auto px-2">
          <UserMenu />
          <ChefMenu />
          <AdminMenu />
        </div>

        <div className="mt-auto p-4">
          <a href="/" className="text-sm text-gray-600">
            ← Back to Home
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
