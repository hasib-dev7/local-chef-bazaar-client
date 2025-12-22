import { FaStar } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";
const CustomerReviewsCard = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews?foodId=${id}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
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
    </>
  );
};

export default CustomerReviewsCard;
