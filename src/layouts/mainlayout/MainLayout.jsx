import { Outlet, useNavigation } from "react-router";
import Navber from "../../components/shared/navber/Navber";
import Footer from "../../components/shared/footer/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";

const MainLayout = () => {
  // const navigation = useNavigation();

  // Global loading page for whole app
  // if (navigation.state === "loading") {
  //   return <LoadingSpinner></LoadingSpinner>;
  // }
  return (
    <>
      <div className="flex flex-col  min-h-screen ">
        {/* navber */}
        <Navber></Navber>
        {/* outlate */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        {/* footer */}
        <Footer></Footer>
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

export default MainLayout;
