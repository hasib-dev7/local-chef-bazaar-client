import { ChefHat, Clock5, Pencil, Star, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useState } from "react";
import UpdateModal from "../../dashboard/modal/UpdateModal";
const MyMealCard = ({ myMeal, refetch }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { image, foodName, deliveryTime, price, _id, chefName } = myMeal;
  // ingredients array
  const ingredientsArray = myMeal.ingredients?.[0]?.split("\n");

  const visibleIngredients = ingredientsArray?.slice(0, 3);
  const remainingCount =
    ingredientsArray?.length > 3 ? ingredientsArray.length - 3 : 0;
  const axiosSecure = useAxiosSecure();
  //  item delete
  const handleItemDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-meals/${id}`).then((res) => {
          if (res.data.deletedCount) {
            // refetch the data in the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Meal has been deleted successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <div className="w-full bg-white   cursor-pointe rounded-2xl">
        {/* Image wrapper */}
        <div className="w-full h-60 md:h-64 lg:h-72 overflow-hidden rounded-t-2xl relative">
          <img
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-108"
            src={image}
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
            <Clock5 size={16} color="#7e6f67" />
            <span className="text-[#7e6f67] text-sm">{deliveryTime}</span>
          </p>
          {/*  */}
          <div className="flex flex-wrap gap-1 mt-3">
            {visibleIngredients?.map((item, index) => (
              <div
                key={index}
                className="bg-[#37ae63] text-sm text-white border rounded-xl px-2 py-1"
              >
                {item}
              </div>
            ))}

            {remainingCount > 0 && (
              <button className="bg-[#37ae63] text-sm text-white border rounded-xl px-2 py-1">
                +{remainingCount} more
              </button>
            )}
          </div>

          <div className="divider"></div>
          <div className="flex justify-between items-center pb-5">
            <p className="text-primary text-xl font-bold">৳ {price}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="p-3 rounded-xl bg-[#f0ede6]"
              >
                <Pencil size={20} color="#000000" />
              </button>
              {/* update modal  */}

              <UpdateModal
                isOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                updateMeal={myMeal}
              ></UpdateModal>
              <button
                onClick={() => handleItemDelete(_id)}
                className="p-3 rounded-xl bg-red-500"
              >
                <Trash2 size={20} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMealCard;
