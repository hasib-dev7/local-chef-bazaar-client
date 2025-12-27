/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Input from "../../../../components/ui/Input";
import Label from "../../../../components/ui/Label";
import CustomButton from "../../../../components/ui/CustomButton";
import { Utensils } from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import Textarea from "../../../../components/ui/Textarea";
import { imageUpload } from "../../../../utils/imageUpload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure.jsx";
import LoadingSpinner from "../../../../components/shared/spinner/LoadingSpinner.jsx";
const ChefCreateMeal = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  // Get chef data from API
  const { data: chef, isLoading } = useQuery({
    queryKey: ["chef", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/chef/${user?.email}`);
      return data;
    },
  });
  // Mutation for creating meal
  const {
    mutateAsync,
    isPending,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/meals", payload),
    onSuccess: () => {
      toast.success("Meal added successfully ✅");
      queryClient.invalidateQueries(["meals"]);
      mutationReset();
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    if (!chef) return toast.error("Chef data not loaded yet!");
    const ingredientsArray = data.ingredients.split(",").map((i) => i.trim());
    try {
      const imageURL = await imageUpload(data.image[0]);
      const mealData = {
        ...data,
        price: Number(data.price),
        chef_email: user?.email,
        chef_image: user?.photoURL,
        chefID: chef?.chefId, // chefId from API
        chefName: chef?.name, // chef name from API
        image: imageURL,
        ingredients: ingredientsArray,
        address: chef?.address, // now address will be included
      };
    //  send to data server db
      await mutateAsync(mealData);
      reset();
    } catch (err) {
      toast.error(err.message || "Failed to upload meal image!");
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  if (isLoading) return <LoadingSpinner />;
  const isBlocked = chef?.status === "fraud";
  return (
    <>
      {isBlocked ? (
        <p className="text-red-500 font-medium mb-3 text-center">
          You are blocked and cannot create meals 🚫
        </p>
      ) : (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="my-10 w-full lg:w-7/12 mx-auto bg-white/80 backdrop-blur-2xl shadow-xl p-8 border border-white/40 rounded-md"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-5">Create New Meal</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="my-5 space-y-4">
            {/* Food Name & Chef Name */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="space-y-1 text-sm">
                <Label htmlFor="foodName">Food Name</Label>
                <Input
                  id="foodName"
                  placeholder="Enter food name"
                  {...register("foodName", {
                    required: "Food name is required",
                  })}
                  error={errors.foodName}
                />
              </div>
              <div className="space-y-1 text-sm">
                <Label htmlFor="chefName">Chef Name</Label>
                <Input
                  id="chefName"
                  value={chef?.name}
                  {...register("chefName")}
                  readOnly
                />
              </div>
            </div>
            {/* Price & Delivery Time */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="space-y-1 text-sm">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  {...register("price", { required: true, min: 1 })}
                  error={errors.price}
                />
              </div>
              <div className="space-y-1 text-sm">
                <Label htmlFor="deliveryTime">Estimated Delivery Time</Label>
                <Input
                  id="deliveryTime"
                  placeholder="e.g., 45 minutes"
                  {...register("deliveryTime", { required: true })}
                  error={errors.deliveryTime}
                />
              </div>
            </div>
            {/* Chef ID & Email */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="space-y-1 text-sm">
                <Label htmlFor="chefID">Chef ID</Label>
                <Input
                  id="chefID"
                  value={chef?.chefId}
                  {...register("chefID")}
                  readOnly
                />
              </div>
              <div className="space-y-1 text-sm">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email}
                  {...register("email")}
                  readOnly
                />
              </div>
            </div>
            {/* Image */}
            <div>
              <Label htmlFor="image">Food Image</Label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", { required: "Food image is required" })}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:bg-orange-50"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>
            {/* Ingredients */}
            <div className="space-y-1 text-sm">
              <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
              <Textarea
                id="ingredients"
                placeholder="e.g., Rice, Chicken"
                {...register("ingredients", {
                  required: "Ingredients required",
                })}
                error={errors.ingredients}
              />
            </div>
            {/* Chef Experience */}
            <div className="space-y-1 text-sm">
              <Label htmlFor="chefExperience">Chef's Experience</Label>
              <Textarea
                id="chefExperience"
                placeholder="Your experience"
                {...register("chefExperience", { required: true })}
                error={errors.chefExperience}
              />
            </div>
            {/* Submit */}
            <CustomButton disabled={isBlocked}>
              {isPending ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                <span className="flex justify-center items-center gap-2">
                  <Utensils size={16} />
                  Create Meal
                </span>
              )}
            </CustomButton>
          </form>
        </motion.div>
      )}
    </>
  );
};

export default ChefCreateMeal;
