/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from "../../utils/imageUpload";
import { saveUserUpdateData } from "../../utils/users";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // const password = watch("password");
  const password = useWatch({
    control,
    name: "password",
  });
  const { setUser, createUser, updateUserProfile, authLoading } = useAuth();
  const location = useLocation();
  // console.log("register navigate", location);
  const navigate = useNavigate();
  //
  const handleRegister = async (data) => {
    const { email, password, image, name, address } = data;
    const imageFile = image[0];
    try {
      //  Upload image to imgbb
      const imageURL = await imageUpload(imageFile);

      //  Register user
      const res = await createUser(email, password);
      const signUpUser = res.user;

      //  Update profile in Firebase
      await updateUserProfile({
        displayName: name,
        photoURL: imageURL,
      });

      //  Set local state
      setUser({ ...signUpUser, displayName: name, photoURL: imageURL });
      // save user role data
      saveUserUpdateData({ name, email, image: imageURL, address });
      toast.success("Registered successfully!");
      navigate(location?.state || "/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // show password hide
  const handleToggle = (e) => {
    e.preventDefault();
    setToggle(!toggle);
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
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className="my-10 w-full lg:w-4/12 mx-auto bg-white/80  backdrop-blur-2xl shadow-xl p-8 border border-white/40 rounded-md"
    >
      <title>Local Chef Bazaar - Register</title>
      <div className="flex flex-col items-center ">
        <h1 className=" text-xl font-bold mt-5 ">Create Account</h1>
        <p className="text-gray-600">Join our community of food lovers</p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className=" my-5 space-y-4"
        >
          {/* name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name must be at most 20 characters",
                },
              })}
              placeholder="Enter Your Name"
              className="w-full pl-4 py-3 border border-black/50 rounded-lg outline-none transition focus:border-primary  placeholder-gray-400"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
          {/* emial */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="emial"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter Your Email"
              className="w-full pl-4 py-3 border border-black/50 rounded-lg outline-none transition focus:border-primary   placeholder-gray-400"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
          {/* image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Profile Image
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
              {...register("image")}
            />
            <p className="mt-1  text-xs text-gray-400">
              PNG, JPG or JPEG (max 2MB)
            </p>
          </div>
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
          {/* Address*/}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              {...register("address", {
                required: "Address is required",
              })}
              placeholder=" Address"
              className="w-full pl-4 py-3 border border-black/50 rounded-lg outline-none transition focus:border-primaryplaceholder-gray-400"
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
          {/* password */}
          <div className=" relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={toggle ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain at least one lowercase letter",
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one uppercase letter",
                  hasNumber: (value) =>
                    /\d/.test(value) ||
                    "Password must contain at least one number",
                  hasSpecial: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Password must contain at least one special character",
                },
              })}
              placeholder="Enter Your Password"
              className="w-full pl-4 py-3 border border-black/50 rounded-lg outline-none transition focus:border-primary  placeholder-gray-400"
            />
            {/* toggle button */}
            <button
              onClick={handleToggle}
              className=" absolute btn btn-xs top-12 right-5"
            >
              {toggle ? (
                <Eye size={16} strokeWidth={1.25} />
              ) : (
                <EyeOff size={16} strokeWidth={1.25} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          {/* Confirm  password */}
          <div className=" relative">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={toggle ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password ||
                  "Password and Confirm Password do not match",
              })}
              placeholder="Enter Your  Confirm  Password"
              className="w-full pl-4 py-3 border border-black/50 rounded-lg outline-none transition focus:border-primary  placeholder-gray-400"
            />
            {/* toggle button */}
            <button
              onClick={handleToggle}
              className=" absolute btn btn-xs top-12 right-5"
            >
              {toggle ? (
                <Eye size={16} strokeWidth={1.25} />
              ) : (
                <EyeOff size={16} strokeWidth={1.25} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
          {/* submite button */}
          <motion.button
            whileTap={{ scale: 0.99 }}
            whileHover={{ scale: 1.01, transition: { yoyo: Infinity } }}
            className="w-full text-xl font-medium py-3 text-white bg-primary rounded-lg"
          >
            {authLoading ? (
              <TbFidgetSpinner className="animate-spin m-auto text-white" />
            ) : (
              " Register"
            )}
          </motion.button>
        </form>

        {/*  */}
        <p className="text-center text-black mt-6">
          Already have an account?
          <Link to="/login" className="underline font-semibold text-orange-500">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
