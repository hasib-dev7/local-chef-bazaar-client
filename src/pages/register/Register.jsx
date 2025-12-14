/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //
  const handleRegister = async (data) => {
    const { email, password, image, name } = data;

    console.log(email, password, name);

    // }
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
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="mt-10 w-xl mx-w-md bg-white/80  backdrop-blur-2xl shadow-xl p-8 border border-white/40"
      >
        <h1 className="text-secondary text-4xl font-bold mb-5">Welcome Back</h1>
        <p className="text-accent">Login with ZapShift</p>
        <div>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className=" my-5 space-y-4"
          >
           
           
            {/* submite button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.99 }}
              whileHover={{ scale: 1.01, transition: { yoyo: Infinity } }}
              className="w-full text-xl font-medium py-3 text-secondary bg-primary rounded-lg"
            >
              Register
            </motion.button>
          </form>

          {/*  */}
          <p className="text-center text-black mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline font-semibold text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Register;
