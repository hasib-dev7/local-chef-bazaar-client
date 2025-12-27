import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";
import { FaStar } from "react-icons/fa6";
const LatestReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const result = await axiosSecure.get("/latest/reviews");
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <div className="w-full lg:w-6/12 mx-auto text-center py-5">
        <h1 className="text-4xl md:text-5xl font-display font-heading-font font-bold text-secondary mb-4">
          What Our <span class="text-primary">Customers </span>Say
        </h1>
        <p className="text-[#7e6f67]">
          Real stories from satisfied customers who have experienced the joy of
          homemade meals.
        </p>
      </div>
      {/* reviews card */}
      <div className="mt-5 lg:mt-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-7 rounded-xl shadow mt-5 flex flex-col lg:flex-row justify-between space-y-3"
          >
            <div className="flex flex-col items-center lg:flex-row gap-3">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <img src={review.reviewerImage} />
                </div>
              </div>

              <div>
                {/* rating */}
                <div className="flex items-center gap-1 my-3">
                  <span>
                    {" "}
                    <FaStar size={16} className="text-2xl text-orange-400" />
                  </span>
                  <span>{review.rating}</span>
                </div>
                <h2 className="text-lg text-secondary font-semibold">
                  {review.reviewerName}
                </h2>

                <p className="text-[#7e6f67]">{review.reviews}</p>
              </div>
            </div>

            <p className="text-[#7e6f67]">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestReviews;
