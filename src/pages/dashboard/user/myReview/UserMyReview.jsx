import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner";
import ReviewsCard from "../../../../components/dashboard/review/ReviewsCard";

const UserMyReview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews/${user?.email}`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  // console.log(reviews);

  return (
    <>
     <title>Local Chef Bazaar - My Reviews</title>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">
        My Reviews
      </h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not placed any review yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewsCard
              key={review._id}
              review={review}
              refetch={refetch}
            ></ReviewsCard>
          ))}
        </div>
      )}
    </>
  );
};

export default UserMyReview;
