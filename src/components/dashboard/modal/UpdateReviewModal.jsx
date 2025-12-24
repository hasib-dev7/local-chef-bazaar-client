import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Textarea from "../../ui/Textarea";
import Label from "../../ui/Label";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
const UpdateReviewModal = ({ isOpen, setIsOpen, review }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const id = review._id;
  const {
    mutateAsync,
    reset: mutationReset,
    refetch,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.patch(`/reviews/${id}`, payload),
    onSuccess: () => {
      // invalidateQueries
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review Update successfully!");
      //
      mutationReset();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // reset,
  } = useForm();
  // update review
  const handleReview = async (data) => {
    const { rating, reviews } = data;
    const updateData = {
      rating,
      reviews,
    };
    await mutateAsync(updateData);
    // reset form data
    reset();
    // refech
    refetch;
    // close modal
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/30">
        <DialogPanel className="max-w-lg w-full space-y-4 border bg-white p-12 rounded-md">
          <DialogTitle className="font-bold text-lg">Update Review</DialogTitle>
          <form onSubmit={handleSubmit(handleReview)}>
            <div className=" space-y-3">
              <Label htmlFor="reating">Reating</Label>
              <Input
                id="reating"
                type="number"
                defaultValue={review.rating}
                min={1}
                max={10}
                {...register("rating", {
                  min: { value: 1, message: "reating must be positive" },
                  max: {
                    value: 10,
                    message: "reating must not be more than 10",
                  },
                })}
                error={errors.rating}
              />
              <Label htmlFor="reviews">Review</Label>
              <Textarea
                id="reviews"
                type="text"
                defaultValue={review.reviews}
                placeholder="Write your review..."
                {...register("reviews", {})}
                error={errors.reviews}
              ></Textarea>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                // onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateReviewModal;
