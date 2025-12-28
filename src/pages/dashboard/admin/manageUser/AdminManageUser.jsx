import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";

const AdminManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  // Mutation for making user fraud
  const { mutateAsync: makeFraud } = useMutation({
    mutationFn: async (userId) =>
      await axiosSecure.patch(`/users/fraud/${userId}`),
    onSuccess: () => {
      toast.success("User marked as fraud ✅");
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Something went wrong ❌";
      toast.error(message);
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
     <title>Local Chef Bazaar - Manage User</title>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">Role</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.role}</td>
                  <td
                    className={`p-2 ${
                      user.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="p-2">
                    {/* Show button only if role is user or chef and status is active */}
                    {["user", "chef"].includes(user.role) &&
                      user.status === "active" && (
                        <button
                          onClick={() => makeFraud(user._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Make Fraud
                        </button>
                      )}
                    {/* If already fraud or admin, show disabled */}
                    {user.status === "fraud" && (
                      <span className="text-gray-400 font-medium">Fraud</span>
                    )}
                    {user.role === "admin" && (
                      <span className="text-gray-400 font-medium">Admin</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminManageUser;
