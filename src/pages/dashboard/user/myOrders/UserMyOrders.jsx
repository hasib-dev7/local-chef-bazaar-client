import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";
import MyOrder from "../../../../components/dashboard/order/MyOrder";

const UserMyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orders = {}, isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/orders/${user?.email}`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  
  return (
    <>
      <title>Local Chef Bazaar - My Order</title>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <MyOrder key={order._id} order={order}></MyOrder>
            ))}
          </div>
        )}
    
    </>
  );
};

export default UserMyOrders;
