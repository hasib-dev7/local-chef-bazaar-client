import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/spinner/LoadingSpinner";
import ProfileCard from "../../../components/dashboard/profileCard/ProfileCard";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users, isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/user/profile");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
     <title>Local Chef Bazaar -My Profile</title>
      <div>
        {users.map((user) => (
          <ProfileCard key={user._id} users={user}></ProfileCard>
        ))}
      </div>
    </>
  );
};

export default MyProfile;
