/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ChefHat, Clock5, MapPin, Star } from "lucide-react";
import { Link } from "react-router";

const MealCard = ({ meal }) => {
  const { imageURL, foodName, chefName, deliveryTime, price, _id } = meal;
  return (
    <>
      <div className="w-full bg-white   cursor-pointe rounded-2xl">
        {/* Image wrapper */}
        <div className="w-full h-60 md:h-64 lg:h-72 overflow-hidden rounded-t-2xl relative">
          <img
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-108"
            src={imageURL}
            alt={foodName}
          />
         
          {/* rating */}
          <div className="flex justify-center items-center gap-1 px-3 py-1 bg-[#7e6f67] rounded-2xl absolute top-3 right-3">
            <span>
              <Star size={16} color="#ffd500" />
            </span>
            <span className="text-black">0.5</span>
          </div>
        </div>
        <div className="px-5 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-secondary hover:text-primary font-semibold text-lg mt-3 transition-colors line-clamp-1">
              {foodName}
            </h2>
          </div>
          <p className="flex items-center gap-2">
            <ChefHat size={16} color="#11d46f" />
            <span className="text-[#7e6f67] text-sm">{chefName}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} color="#f1991e" />
            <span className="text-[#7e6f67] text-sm">Location</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock5 size={16} color="#7e6f67" />
            <span className="text-[#7e6f67] text-sm">{deliveryTime}</span>
          </p>
          <div className="divider"></div>
          <div className="flex justify-between items-center pb-5">
            <p className="text-primary text-xl font-bold">৳ {price}</p>
            <Link
              to={`/meal-details/${_id}`}
              className="text-sm font-medium px-6 py-3 rounded-lg text-white bg-primary "
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealCard;
