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
const ChefCreateMeal = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //
  const onSubmit = async (data) => {
    const {
      foodName,
      chefName,
      price,
      deliveryTime,
      email,
      chefID,
      image,
      ingredients,
      chefExperience,
    } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUpload(imageFile);
      console.log(
        foodName,
        chefName,
        price,
        deliveryTime,
        email,
        chefID,
        imageURL,
        ingredients,
        chefExperience
      );
    } catch (error) {
      console.log(error);
    }
  };
  //   animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="my-10 w-full lg:w-7/12 mx-auto bg-white/80  backdrop-blur-2xl shadow-xl p-8 border border-white/40 rounded-md"
      >
        {/* from heading and paragraph */}
        <div className="flex flex-col items-center">
          <h1 className=" text-4xl font-bold mb-5">Create New Meal</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className=" my-5 space-y-4">
            {/* columm 1 */}
            <div className="grid col-end-1 lg:grid-cols-2 gap-4">
              {/* Food Name */}
              <div className="space-y-1 text-sm w-full">
                <Label htmlFor="foodName">Food Name</Label>
                <Input
                  id="foodName"
                  type="text"
                  placeholder="Enter food name"
                  {...register("foodName", {
                    required: "Food name is required",
                    maxLength: {
                      value: 20,
                      message: "Food Name cannot be too long",
                    },
                  })}
                  error={errors.foodName}
                />
              </div>
              {/* Chef Name */}
              <div className="space-y-1 text-sm w-full">
                <Label htmlFor="chefName">Chef Name</Label>
                <Input
                  id="chefName"
                  type="text"
                  value={user?.displayName}
                  {...register("chefName")}
                />
              </div>
            </div>
            {/* columm 2 */}
            <div className="grid col-end-1 lg:grid-cols-2 gap-4">
              {/* price */}
              <div className="space-y-1 text-sm w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter Price"
                  {...register("price", {
                    required: "Price name is required",
                  })}
                  error={errors.price}
                />
              </div>
              {/* Estimated Delivery Time */}
              <div className="space-y-1 text-sm w-full">
                <Label htmlFor="deliveryTime">Estimated Delivery Time</Label>
                <Input
                  id="deliveryTime"
                  type="text"
                  placeholder="e.g., 45 minutes"
                  {...register("deliveryTime", {
                    required: "Delivery Time is required",
                  })}
                  error={errors.deliveryTime}
                />
              </div>
            </div>
            {/* columm 3 */}
            <div className="grid col-end-1 lg:grid-cols-2 gap-4">
              {/* Chef ID */}
              <div className="space-y-1 text-sm w-full">
                <Label htmlFor="chefID">Chef ID</Label>
                <Input id="chefID" type="text" {...register("chefID")} />
              </div>
              {/* Email */}
              <div className="space-y-1 text-sm w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email}
                  {...register("email")}
                />
              </div>
            </div>
            {/* image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Food Image
              </label>
              <input
                name="image"
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-orange-50 file:text-primary
      hover:file:bg-orange-100
      bg-gray-100 border border-dashed border-orange-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
      py-2"
                {...register("image", {
                  required: " Food image is required",
                })}
              />
              <p className="mt-1  text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
            {/*Ingredients */}
            <div className="space-y-1 text-sm w-full">
              <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
              <Textarea
                id="ingredients"
                type="text"
                placeholder="e.g., Rice, Chicken, Spices, Yogurt"
                {...register("ingredients", {
                  required: "Ingredients is required",
                  maxLength: {
                    value: 150,
                    message: "Ingredients cannot be too long",
                  },
                })}
                error={errors.ingredients}
              ></Textarea>
            </div>
            {/*Chef's Experience */}
            <div className="space-y-1 text-sm w-full">
              <Label htmlFor="chefExperience">Chef's Experience</Label>
              <Textarea
                id="chefExperience"
                type="text"
                placeholder="e.g., Rice, Chicken, Spices, Yogurt"
                {...register("chefExperience", {
                  required: "Chef's experience is required",
                  maxLength: {
                    value: 30,
                    message: "Chef's experience cannot be too long",
                  },
                })}
                error={errors.chefExperience}
              ></Textarea>
            </div>
            {/* submite button */}
            <CustomButton>
              <span>
                <Utensils size={16} />
              </span>
              Create Meal
            </CustomButton>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default ChefCreateMeal;
