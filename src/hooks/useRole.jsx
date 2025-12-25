import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isLoading } = useQuery({
    enabled: !authLoading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role`);
      return data.role;
    },
  });
  return [role,isLoading]
};

export default useRole;
