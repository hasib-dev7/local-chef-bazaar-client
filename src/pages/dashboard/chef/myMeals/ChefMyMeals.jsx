import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";
import MyMealCard from "../../../../components/shared/card/MyMealCard";

const ChefMyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["inventory", user?.email],
    enabled: !!user?.email, // important safety
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-meals/${user?.email}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="text-lg lg:text-2xl text-secondary font-bold">My Meals</h1>

      {meals.length === 0 ? (
        <p className="mt-6 text-gray-500 text-center">
          You have not placed any meals yet.
        </p>
      ) : (
        <div className="py-5 md:py-8 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((myMeal) => (
            <MyMealCard
              key={myMeal._id}
              myMeal={myMeal}
              refetch={refetch}
            ></MyMealCard>
          ))}
        </div>
      )}
    </>
  );
};

export default ChefMyMeals;
