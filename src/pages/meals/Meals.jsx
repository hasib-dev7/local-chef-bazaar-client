import MealCard from "../../components/shared/card/MealCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";
import Container from "../../components/container/Container";

const Meals = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  console.log(meals);
  return (
    <>
      <div className=" bg-linear-to-r from-[#f9ecdd] to-[#e6f0e6] py-8 lg:py-16">
        <Container>
          <div className="w-full lg:w-6/12 mx-auto text-center py-5">
            <h1 class="text-4xl md:text-5xl font-display font-bold text-secondary mb-4">
              Discover <span class="text-primary">Delicious</span> Meals
            </h1>
            <p className="text-[#7e6f67]">
              Explore our collection of homemade dishes prepared fresh by
              talented local chefs. Find your next favorite meal today!
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* meals card */}
        {meals && meals.length > 0 ? (
          <div className="py-5 md:py-8 lg:py-12 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default Meals;
