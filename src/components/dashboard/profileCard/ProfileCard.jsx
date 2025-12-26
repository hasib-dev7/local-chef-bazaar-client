import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpinner from "../../shared/spinner/LoadingSpinner";
const ProfileCard = ({ users }) => {
  const { name, email, image, address, role, status, _id } = users;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // get pendding role request data
  const { data: roleRequest, isLoading } = useQuery({
    queryKey: ["role-request", _id],
    enabled: !!_id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/role/requestType/${_id}`);
      return data;
    },
  });
  // halper state form data......
  const isPending = roleRequest?.requestStatus === "pending";
  const isChefPending = isPending && roleRequest?.requestType === "chef";
  const isAdminPending = isPending && roleRequest?.requestType === "admin";
  // post role request mutations
  const {
    // refresh,
    mutateAsync,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post("/role/request", payload),
    onSuccess: () => {
      toast.success("Request sent successfully ✅");
      // invalidateQueries
      queryClient.invalidateQueries(["role-request", _id]);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again ❌";
      toast.error(message);
    },
  });
  // request handler
  const handleRequest = async (requestType) => {
    const requestData = {
      userId: _id,
      requestType,
    };
    // send to the server data
    await mutateAsync(requestData);
  };
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="flex justify-center mt-10 px-2 lg:px-4">
      <div className="w-full lg:max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={image || "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-orange-200 object-cover"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
        {/* Info Section */}
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-medium">Address:</span>{" "}
            {address || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Role:</span>{" "}
            <span className="capitalize">{role}</span>
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`font-medium ${
                status === "active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </span>
          </p>
          {/* Only for chef */}
          {role === "chef" && (
            <p>
              <span className="font-medium">Chef ID:</span> CHEF-XXXX
            </p>
          )}
        </div>
        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          {/* USER role */}
          {role === "user" && (
            <>
              {/* Be a Chef */}
              <button
                onClick={() => handleRequest("chef")}
                disabled={isChefPending || isSubmitting}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isChefPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
              >
                {isChefPending ? "Requested" : "Be a Chef"}
              </button>
              {/* Be an Admin */}
              <button
                onClick={() => handleRequest("admin")}
                disabled={isAdminPending || isSubmitting}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isAdminPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-900 text-white"
                  }`}
              >
                {isAdminPending ? "Requested" : "Be an Admin"}
              </button>
            </>
          )}
          {/* CHEF role */}
          {role === "chef" && (
            <button
              onClick={() => handleRequest("admin")}
              disabled={isAdminPending || isSubmitting}
              className={`w-full py-2 rounded-lg text-sm font-medium transition
                ${
                  isAdminPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-900 text-white"
                }`}
            >
              {isAdminPending ? "Requested" : "Be an Admin"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
