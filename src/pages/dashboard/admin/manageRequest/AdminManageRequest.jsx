import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";

const AdminManageRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/role-requests");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  const handleApprove = async (id) => {
    await axiosSecure.patch(`/role-requests/approve/${id}`);
    toast.success("Request approved");
    refetch();
  };
  const handleReject = async (id) => {
    await axiosSecure.patch(`/role-requests/reject/${id}`);
    toast.error("Request rejected");
    refetch();
  };
  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Manage Role Requests</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td className="capitalize">{req.requestType}</td>
                {/* <td>{req.requestStatus}</td> */}

                <td
                  className={
                    req.requestStatus === "pending"
                      ? "text-yellow-500 font-bold"
                      : req.requestStatus === "approved"
                      ? "text-green-500 font-bold"
                      : "text-red-500 font-bold"
                  }
                >
                  {req.requestStatus}
                </td>
                <td>{new Date(req.requestTime).toLocaleString()}</td>
                <td className="space-x-2">
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleApprove(req._id)}
                    className="btn btn-success btn-sm"
                  >
                    Accept
                  </button>
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleReject(req._id)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminManageRequest;
