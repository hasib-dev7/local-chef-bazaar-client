import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure.jsx";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";
import MyMealCard from "../../../../components/shared/card/MyMealCard";

const ChefMyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: meals = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["inventory", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-meals/${user?.email}`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  // console.log(meals);
  return (
    <>
      <h1 className="text-lg lg:text-2xl text-secondary font-bold">My Meals</h1>
      {/* meals card */}
      {meals && meals.length > 0 ? (
        <div className="py-5 md:py-8 lg:py-12 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((myMeal) => (
            <MyMealCard key={myMeal._id} myMeal={myMeal} refetch={refetch} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ChefMyMeals;
