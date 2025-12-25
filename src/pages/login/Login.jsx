/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveUserUpdateData } from "../../utils/users";
const Login = () => {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser, setUser, authLoading, user } = useAuth();
  const location = useLocation();
  // console.log("location", location);
  const navigate = useNavigate();
  //   login
  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const res = await signInUser(email, password);
      const loginUser = {
        email: res.user.email,
        name: res.user.displayName,
        image: res.user.photoURL,
      };
      //  save user role data
      await saveUserUpdateData(loginUser);
      setUser(res.user);
      //
      //
      navigate(location?.state || "/");
      // console.log("register data", res);
    } catch (err) {
      const code = err.code || err?.message || "";

      if (code.includes("user-not-found")) {
        toast.error("No user found with this email.");
      } else if (
        code.includes("wrong-password") ||
        code.includes("invalid-credential")
      ) {
        toast.error("Incorrect password. Please try again.");
      } else if (code.includes("invalid-email")) {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };
  // Sequential error toast
  const showErrorToast = () => {
    const errorMessages = [];
    if (errors.name) errorMessages.push(errors.name.message);
    if (errors.email) errorMessages.push(errors.email.message);
    if (errors.password) errorMessages.push(errors.password.message);

    // Show each toast with a slight delay
    errorMessages.forEach((msg, index) => {
      setTimeout(() => {
        toast.error(msg, { duration: 3000 });
      }, index * 500); // 0.5s gap between each toast
    });
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
      {/* from heading and paragraph */}
      <div className="flex flex-col items-center">
        <h1 className=" text-4xl font-bold mb-5">Sign In</h1>
        <p className="text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(handleLogin, showErrorToast)}
          className=" my-5 space-y-4"
        >
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
              className="w-full pl-4 py-3 border border-black/50 rounded-lg outline-none transition focus:border-primary  text-lg font-medium placeholder-gray-400"
            />
          </div>
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
              })}
              placeholder="Enter Your Password"
              className="w-full pl-4 py-3 border border-black/50 rounded-lg outline-none transition focus:border-primary  text-lg font-medium placeholder-gray-400"
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
          {/* submite button */}
          <motion.button
            whileTap={{ scale: 0.99 }}
            whileHover={{ scale: 1.01, transition: { yoyo: Infinity } }}
            className="w-full text-xl font-medium py-3 text-secondary bg-primary rounded-lg"
          >
            {authLoading ? (
              <TbFidgetSpinner className="animate-spin m-auto text-white" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/*  */}
        {/*  */}
        <p className="text-center text-black mt-6">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="underline font-semibold text-orange-500"
          >
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
