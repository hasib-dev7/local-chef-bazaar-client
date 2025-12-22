import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";
import ChefRequestOrders from "../../../../components/dashboard/order/ChefRequestOrders";
const ChefOrderRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: requestOrders = {}, isLoading } = useQuery({
    queryKey: ["requestOrders", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/request-orders/${user?.email}`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        My Orders
      </h1>

      {requestOrders.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not placed any order requests yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requestOrders.map((order) => (
            <ChefRequestOrders
              key={order._id}
              order={order}
            ></ChefRequestOrders>
          ))}
        </div>
      )}
    </>
  );
};

export default ChefOrderRequests;
