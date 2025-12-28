import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";
import {
  CircleCheckBig,
  CircleChevronLeft,
  DollarSign,
  Users,
} from "lucide-react";
import AdminPlatformBarChart from "./AdminPlatformBarChart";

const AdminPlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: statistics = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/platform-statistics");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <title>Local Chef Bazaar - Statistics</title>
      <h1 className="text-xl lg:text-3xl text-secondary font-bold mb-5">
        Platform Statistics
      </h1>
      {/* card section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
        {/* total payment */}
        <div className="bg-white p-5 shadow rounded-xl  space-y-2">
          <div className="p-1 lg:p-2 w-10 h-10 lg:w-14 lg:h-14 bg-green-100 flex items-center justify-center rounded-xl">
            <DollarSign size={48} color="#00ff1e" />
          </div>
          <p className="text-[#7e6f67] text-sm">Total Payments</p>
          <p className="">
            <span className="text-secondary font-bold text-xl">
              ৳{statistics.totalPayment}
            </span>
          </p>
        </div>
        {/* Total Users */}
        <div className="bg-white p-5 shadow rounded-xl  space-y-2">
          <div className="p-1 lg:p-2 w-10 h-10 lg:w-14 lg:h-14 bg-orange-100 flex items-center justify-center rounded-xl">
            <Users size={48} color="#f98c10" />
          </div>
          <p className="text-[#7e6f67] text-sm">Total Users</p>
          <p className="">
            <span className="text-secondary font-bold text-xl">
              {statistics.totalUsers}
            </span>
          </p>
        </div>
        {/* total pending orders */}
        <div className="bg-white p-5 shadow rounded-xl  space-y-2">
          <div className="p-1 lg:p-2 w-10 h-10 lg:w-14 lg:h-14 bg-orange-100 flex items-center justify-center rounded-xl">
            <CircleChevronLeft size={48} color="#f98c10" />
          </div>
          <p className="text-[#7e6f67] text-sm">Orders Pending</p>
          <p className="">
            <span className="text-secondary font-bold text-xl">
              {statistics.pendingOrders}
            </span>
          </p>
        </div>
        {/* total orders */}
        <div className="bg-white p-5 shadow rounded-xl  space-y-2">
          <div className="p-1 lg:p-2 w-10 h-10 lg:w-14 lg:h-14 bg-green-100 flex items-center justify-center rounded-xl">
            <CircleCheckBig size={48} color="#00ff1e" />
          </div>
          <p className="text-[#7e6f67] text-sm">Orders Delivered</p>
          <p className="">
            <span className="text-secondary font-bold text-xl">
              {statistics.deliveredOrders}
            </span>
          </p>
        </div>
      </section>
      {/* bar chart */}
      <section>
        <AdminPlatformBarChart statistics={statistics}></AdminPlatformBarChart>
      </section>
    </>
  );
};

export default AdminPlatformStatistics;
