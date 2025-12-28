/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import heroImage from "../../assets/banner.jfif";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
const Banner = () => {
  const navigate=useNavigate()
  const handleMealsPage=()=>{
    navigate("/meals")
  }
  return (
    <>
      <div
        className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] bg-cover bg-center "
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 lg:px-32 text-white space-y-6 ">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-snug"
          >
            Fresh & Homemade Meals <br /> Delivered to Your Door
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl max-w-xl"
          >
            Explore delicious meals from local chefs, order online, and enjoy
            the taste of home-cooked food.
          </motion.p>

          {/* CTA Button */}
          <motion.div
           onClick={handleMealsPage}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center gap-2 bg-primary hover:bg-green-600 transition-colors text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
          >
            <ShoppingCart size={20} />
            Order Now
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Banner;
