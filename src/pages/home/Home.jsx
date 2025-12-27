import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/banner/Banner";
import Container from "../../components/container/Container";
import axios from "axios";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";
import MealCard from "../../components/shared/card/MealCard";
import { Link } from "react-router";
import LatestReviews from "../customerReviews/LatestReviews";
import ExtraSection from "../../components/extraSection/ExtraSection";

const Home = () => {
  const { data: latest = [], isLoading } = useQuery({
    queryKey: ["latest"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/latest`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <Container>
        {/* banner section */}
        <div className="mt-8 lg:mt-12">
          <Banner></Banner>
        </div>
        {/* latest card  section */}
        <section className="mt-8 lg:mt-12">
          <div className="w-full lg:w-6/12 mx-auto text-center py-5">
            <h1 className="text-4xl md:text-5xl font-display font-heading-font font-bold text-secondary mb-4">
              Today's Fresh <span class="text-primary">Meals</span>
            </h1>
            <p className="text-[#7e6f67]">
              Discover delicious homemade meals prepared fresh daily by our
              talented local chefs. Order now and enjoy authentic flavors
              delivered to your doorstep.
            </p>
          </div>
          <div className="mt-5 lg:mt-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latest.map((meal) => (
              <MealCard key={meal._id} meal={meal}></MealCard>
            ))}
          </div>
          {/* all meals button */}
          <div className="pt-5 lg:pt-10 flex justify-center">
            <Link
              to="/meals"
              className=" text-center btn btn-outline hover:bg-orange-200 "
            >
              View All Meals
            </Link>
          </div>
        </section>
        {/* latest reviews section */}
        <section className="mt-8 lg:mt-12">
          <LatestReviews></LatestReviews>
        </section>
        {/* extra section */}
        <section className="my-8 lg:my-12">
          <ExtraSection></ExtraSection>
        </section>
      </Container>
    </>
  );
};

export default Home;
