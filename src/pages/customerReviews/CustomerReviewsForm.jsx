import { FaStar } from "react-icons/fa6";
import Textarea from "../../components/ui/Textarea";
import { useForm } from "react-hook-form";
const CustomerReviewsForm = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
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
        <form>
          <div className=" space-y-4 mt-4">
            <Textarea
              id="reviews"
              type="text"
              placeholder="Share your experience with this meal..."
              {...register("reviews", {
                required: "reviews comment is required",
              })}
              error={errors.reviews}
            ></Textarea>
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
