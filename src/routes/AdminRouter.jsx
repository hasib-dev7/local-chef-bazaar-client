import { Navigate } from "react-router";
import LoadingSpinner from "../components/shared/spinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const AdminRouter = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "admin") return children;
  return <Navigate to="/"></Navigate>;
};

export default AdminRouter;
