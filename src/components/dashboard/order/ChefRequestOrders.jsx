/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Clock5, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ChefRequestOrders = ({ order }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    refresh,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.patch(`/order-request/${order._id}`, payload),
    onSuccess: () => {
      toast.success("Order status updated ✅");
      // invalidateQueries
      queryClient.invalidateQueries(["order-request"]);
      //
      mutationReset();
    },
    onError: () => {
      toast.error("Failed to update order ❌");
    },
  });
  const orderStatus = order.orderStatus;
  const handleUpdateStatus = async (status) => {
    await mutateAsync({ orderStatus: status });
    refresh();
  };
  const isCancelled = orderStatus === "cancelled";
  const isAccepted = orderStatus === "accepted";
  const isDelivered = orderStatus === "delivered";
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
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    accepted: "bg-blue-100 text-blue-700 border-blue-300",
    delivered: "bg-green-100 text-green-700 border-green-300",
    cancelled: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="my-10 w-full  bg-white/80  backdrop-blur-2xl shadow-xl p-8 border border-white/40 rounded-md"
      >
        <div className="px-5 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-secondary hover:text-primary font-semibold text-lg mt-3 transition-colors line-clamp-1">
              {order.foodName}
            </h2>
          </div>
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full border 
    ${statusStyles[orderStatus] || "bg-gray-100 text-gray-700 border-gray-300"}
  `}
          >
            {orderStatus}
          </span>

          <div className="flex gap-5">
            <p className="text-[#7e6f67] text-sm">
              Price :{" "}
              <span className=" text-orange-500 font-medium">
                ৳ {order.totalPrice}
              </span>
            </p>
            <p className="text-[#7e6f67] text-sm">
              Quantity :
              <span className="text-black font-medium">{order.quantity}</span>
            </p>
          </div>
          <p className="flex items-center gap-2">
            <Clock5 size={16} color="#f1991e" />

            <span className="text-[#7e6f67] text-sm">
              {new Date(order.oderTime).toLocaleString()}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} color="#f1991e" />
            <span className="text-[#7e6f67] text-sm">
              {order.customer.email}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} color="#f1991e" />
            <span className="text-[#7e6f67] text-sm">
              {order.customer.address}
            </span>
          </p>

          <div className="divider"></div>
          <div className="flex justify-between items-center pb-5">
            <button
              onClick={() => handleUpdateStatus("cancelled")}
              disabled={isCancelled || isAccepted || isDelivered}
              className={`btn ${
                isCancelled || isAccepted || isDelivered
                  ? "btn-disabled"
                  : "btn-error"
              }`}
            >
              Cancel
            </button>

            <button
              onClick={() => handleUpdateStatus("accepted")}
              disabled={isCancelled || isAccepted || isDelivered}
              className={`btn ${
                isCancelled || isAccepted || isDelivered
                  ? "btn-disabled"
                  : "btn-primary"
              }`}
            >
              Accept
            </button>

            <button
              onClick={() => handleUpdateStatus("delivered")}
              disabled={!isAccepted || isCancelled || isDelivered}
              className={`btn ${
                !isAccepted || isCancelled || isDelivered
                  ? "btn-disabled"
                  : "btn-success"
              }`}
            >
              Deliver
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChefRequestOrders;
