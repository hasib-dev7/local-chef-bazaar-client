/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Container from "../../components/container/Container";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";
import {
  ChefHat,
  Clock5,
  Heart,
  MapPin,
  MoveLeft,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link } from "react-router";
import CustomButton from "../../components/ui/CustomButton";
import CustomerReviewsForm from "../customerReviews/CustomerReviewsForm";
import CustomerReviewsCard from "../customerReviews/CustomerReviewsCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import ErrorPages from "../error/ErrorPages";
const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  // get user email meal data
  const {
    data: meals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals/${id}`
      );
      return result.data;
    },
  });
  // get user faurd status data to the usersCollection
  const { data: users } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data;
    },
  });
  // reviews rating
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews?foodId=${id}`);
      return result.data;
    },
  });
  // favorite collection
  const { mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/favorite", payload),
    onSuccess: () => {
      // invalidateQueries
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Meal added to favorites successfully!");
      //
      mutationReset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const handleFavorite = async (meal) => {
    const favoriteInfo = {
      userEmail: user?.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefID: meal.chefID,
      chefName: meal.chefName,
      price: meal.price,
    };
    await mutateAsync(favoriteInfo);
  };

  const handleOrderClick = () => {
    if (users?.status === "fraud" && users?.role === "user") {
      toast.error("Fraud user cannot place orders 🚫");
      return;
    }
    // normal user → navigate to order page
    navigate(`/order-form/${meals._id}`);
  };
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPages></ErrorPages>;
  // ingredients array
  const ingredientsArray = meals.ingredients?.[0]?.split("\n");

  return (
    <>
      <title>{meals.foodName}</title>
      <Container>
        {/* customer card section */}
        <section className="pt-5 md:pt-8 lg:pt-12">
          <Link to="/meals" className="flex items-center gap-2">
            <MoveLeft size={20} color="#000000" />
            <span className="text-lg text-black/80 hover:text-black transition-all">
              Back to Meals
            </span>
          </Link>
          {/* left side image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
            {/* Image wrapper */}
            <div className="w-full h-96 lg:h-[600px] overflow-hidden rounded-2xl relative ">
              <img
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-108"
                src={meals.image}
                alt={meals.foodName}
              />
              {/* rating */}
              <div className="flex justify-center items-center gap-1 px-3 py-1 bg-[#7e6f67] rounded-2xl absolute top-3 right-3">
                <span>
                  <Star size={16} color="#ffd500" />
                </span>
                <span className="text-black">
                  {reviews.length > 0
                    ? (
                        reviews.reduce(
                          (acc, curr) => acc + (curr.rating || 0),
                          0
                        ) / reviews.length
                      ).toFixed(1)
                    : "0"}
                </span>
              </div>
            </div>
            {/* right side  card text details */}
            <div className=" space-y-5">
              <h2 className="text-secondary hover:text-primary font-semibold text-xl md:text-2xl lg:text-4xl transition-colors line-clamp-1">
                {meals.foodName}
              </h2>

              <div className="flex items-center gap-4 ">
                <p className="flex items-center gap-2">
                  <ChefHat size={16} color="#11d46f" />
                  <span className="text-[#7e6f67] text-sm">
                    {meals.chefName}
                  </span>
                </p>
                <p className="bg-white/90 text-sm text-secondary px-5 py-1 rounded-2xl shadow">
                  ID : {meals.chefID}
                </p>
              </div>
              {/* price */}
              <p className="text-primary text-xl lg:text-4xl font-bold ">
                $ {meals.price}
              </p>
              {/*  */}
              <div className="bg-white p-5 shadow rounded-xl  space-y-4">
                {/* Delivery Time */}
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-orange-100 rounded-full">
                    <Clock5 size={22} color="#f98c10" />
                  </span>
                  <div>
                    <p className="text-[#7e6f67]">Delivery Time</p>
                    <p className="flex items-center gap-2">
                      <span className="text-secondary font-semibold text-sm">
                        {meals.deliveryTime}
                      </span>
                    </p>
                  </div>
                </div>
                {/* Delivery Area */}
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-orange-100 rounded-full">
                    <MapPin size={22} color="#f98c10" />
                  </span>
                  <div>
                    <p className="text-[#7e6f67]">Delivery Area</p>
                    <p className="flex items-center gap-2">
                      <span className="text-secondary font-semibold text-sm">
                        {meals.address}
                      </span>
                    </p>
                  </div>
                </div>
                {/* Chef Experience */}
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-orange-100 rounded-full">
                    <ChefHat size={22} color="#f98c10" />
                  </span>
                  <div>
                    <p className="text-[#7e6f67]">Chef Experience</p>
                    <p className="flex items-center gap-2">
                      <span className="text-secondary font-semibold text-sm">
                        {meals.chefExperience}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Ingredients */}
              <div>
                <h2 className="text-lg text-secondary  font-semibold">
                  Ingredients
                </h2>
                <div className="flex flex-wrap gap-4 mt-3">
                  {ingredientsArray?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#37ae63] text-white border rounded-xl px-4 py-1"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/*  button */}
              <div className="w-full grid  grid-cols-6 gap-4">
                {/* order button */}
                {/* <Link
                  to={`/order-form/${meals._id}`}
                  className="col-span-3 lg:col-span-4"
                >
                  <CustomButton>
                    <span className="flex justify-center items-center gap-2">
                      <ShoppingCart size={16} color="#ffffff" />
                      Order Now
                    </span>
                  </CustomButton>
                </Link> */}
                <div className="col-span-3 lg:col-span-4">
                  <CustomButton onClick={handleOrderClick}>
                    <span className="flex justify-center items-center gap-2">
                      <ShoppingCart size={16} color="#ffffff" />
                      Order Now
                    </span>
                  </CustomButton>
                </div>
                {/* favorite button */}
                <div
                  onClick={() => handleFavorite(meals)}
                  className="col-span-3 lg:col-span-2"
                >
                  <button className="w-full  flex justify-center items-center gap-2 px-3 py-2 rounded-lg outline-0 border shadow">
                    <span>
                      <Heart size={16} color="#000000" />
                    </span>
                    <span>Favorite</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* customer reviews form */}
        <section className="pt-5 md:pt-8 lg:pt-10">
          <CustomerReviewsForm meals={meals}></CustomerReviewsForm>
        </section>
        {/* customer reviews card */}
        <section className="pb-5 md:pb-8 lg:pb-10 pt-4 md:pt-6 lg:pt-5">
          <CustomerReviewsCard id={meals._id}></CustomerReviewsCard>
        </section>
      </Container>
    </>
  );
};

export default MealDetails;
