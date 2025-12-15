import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();
  if (authLoading) {
    return <span className="loading loading-spinner text-success"></span>;
  }
  if (!user) {
    return (
      <Navigate state={location.pathname} to="/login">
        {" "}
      </Navigate>
    );
  }
  return children;
};

export default PrivateRouter;
