import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminPlatformBarChart = ({ statistics }) => {
  const {
    totalPayment,
    totalUsers,
    pendingOrders,
    deliveredOrders,
    activeChefs,
    totalMeals,
    avgRating,
  } = statistics;

  const chartData = [
    { name: "Total Payment", value: totalPayment },
    { name: "Total Users", value: totalUsers },
    { name: "Pending Orders", value: pendingOrders },
    { name: "Delivered Orders", value: deliveredOrders },
    { name: "Active Chefs", value: activeChefs },
    { name: "Total Meals", value: totalMeals },
    { name: "Avg Rating", value: Number(avgRating) },
  ];

  return (
    <>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold my-6 lg:my-10">
        Platform Metrics Overview
      </h2>
      <div className="p-4 sm:p-6 md:p-8 bg-white  rounded w-full">
        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AdminPlatformBarChart;
