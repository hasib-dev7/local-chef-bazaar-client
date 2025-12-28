import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/container/Container";
import MealCard from "../../components/shared/card/MealCard";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";
const Meals = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  //  SORT FIX (string → number)
  const sortedMeals = [...meals].sort((a, b) => {
    const priceA = Number(a.price);
    const priceB = Number(b.price);
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#f9ecdd] to-[#e6f0e6] py-14">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary">
              Discover <span className="text-primary">Delicious</span> Meals
            </h1>
            <p className="mt-4 text-[#7e6f67]">
              Fresh homemade meals by experienced chefs. Choose your favorite
              dish and enjoy!
            </p>
          </div>
        </Container>
      </div>
      {/* Sort + Cards */}
      <Container>
        {/* Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          <h2 className="text-2xl font-semibold text-secondary">
            Available Meals
          </h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        {/* Meals Grid */}
        {sortedMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-14">
            {sortedMeals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-gray-500">No meals found</p>
        )}
      </Container>
    </>
  );
};

export default Meals;
