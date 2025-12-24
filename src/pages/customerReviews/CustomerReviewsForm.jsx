import { FaStar } from "react-icons/fa6";
import Textarea from "../../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";
const CustomerReviewsForm = ({ meals }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const {
    mutateAsync,
    reset: mutationReset,
    refetch,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/reviews", payload),
    onSuccess: () => {
      // invalidateQueries
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review submitted successfully!");
      //
      mutationReset();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const { reviews, rating } = data;
    const reviewInfo = {
      reviews,
      rating: Number(rating),
      mealName: meals.foodName,
      foodId: meals._id,
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      email: user?.email,
    };
    // reset form data
    reset();
    await mutateAsync(reviewInfo);
    refetch();
  };
  return (
    <>
      <h1 className="text-2xl text-secondary font-bold ">Customer Reviews</h1>
      <div className="bg-white p-5 rounded-xl shadow mt-5">
        <h2 className="text-lg text-secondary font-semibold">Write a Review</h2>
        <div className="flex gap-2 mt-4">
          <FaStar className="text-2xl text-orange-400" />
          <FaStar className="text-2xl text-orange-400" />
          <FaStar className="text-2xl text-orange-400" />
          <FaStar className="text-2xl text-orange-400" />
          <FaStar className="text-2xl text-orange-400" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
              <div>
                <Textarea
                  id="reviews"
                  type="text"
                  placeholder="Share your experience with this meal..."
                  {...register("reviews", {
                    required: "reviews comment is required",
                  })}
                  error={errors.reviews}
                ></Textarea>
              </div>
              <div>
                <Input
                  id="rating"
                  type="number"
                  placeholder="Enter rating (1-10)"
                  min={1}
                  max={10}
                  {...register("rating", {
                    required: "rating is required",
                    min: { value: 1, message: "rating must be at least 1" },
                    max: {
                      value: 10,
                      message: "rating must not be more than 10",
                    },
                  })}
                  error={errors.rating}
                />
              </div>
            </div>
            <button className="text-sm font-medium px-6 py-3 rounded-lg text-white bg-primary ">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerReviewsForm;
