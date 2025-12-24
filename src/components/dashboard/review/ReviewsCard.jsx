/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Calendar1, Clock5, Pencil, Star, Trash2 } from "lucide-react";
import { use, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateReviewModal from "../modal/UpdateReviewModal";

const ReviewsCard = ({ review, refetch }) => {
  const [isReviewModal, setIsReviewModal] = useState(false);
  const { mealName, rating, reviews, createdAt, _id } = review;
  const axiosSecure = useAxiosSecure();
  // reviews delete button
  const handleReviewsDelete = async (id) => {
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
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount) {
            // refetch the data in the ui
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Reviews has been deleted successfully.",
              icon: "success",
            });
          }
        });
      }
    });
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
        className="my-10 w-full  bg-white/80  backdrop-blur-2xl shadow-md p-8 border border-white/40 rounded-md"
      >
        {/* .... */}
        <div className="w-full bg-white  cursor-pointe rounded-2xl">
          <div className=" space-y-3">
            {/* food name */}
            <h2 className="text-secondary hover:text-primary font-semibold text-lg mt-3 transition-colors line-clamp-1">
              {mealName}
            </h2>
            {/* date & reating */}
            <div className="flex items-center gap-5">
              <p className="flex items-center gap-2">
                <Calendar1 size={16} color="#7e6f67" />
                <span className="text-[#7e6f67] text-sm">
                  {new Date(createdAt).toDateString()}
                </span>
              </p>
              {/* rating */}
              <div className="flex justify-center items-center gap-1 px-5 py-1 bg-[#bbb2ac] rounded-2xl">
                <span>
                  <Star size={16} color="#ffd500" />
                </span>
                <span className="text-black">{rating}</span>
              </div>
            </div>
            <p className="text-[#7e6f67] text-sm">{reviews}</p>

            <div className="divider"></div>
            <div className="flex justify-between items-center ">
              <button
                onClick={()=>setIsReviewModal(true)}
                className="p-3 rounded-xl bg-[#f0ede6]"
              >
                <Pencil size={20} color="#000000" />
              </button>
              {/* update modal  */}
              <UpdateReviewModal
                isOpen={isReviewModal}
                setIsOpen={setIsReviewModal}
                review={review}
              ></UpdateReviewModal>
              <button
                onClick={() => handleReviewsDelete(_id)}
                className="p-3 rounded-xl bg-red-500"
              >
                <Trash2 size={20} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ReviewsCard;
