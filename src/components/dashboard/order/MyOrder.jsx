/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ChefHat, Clock5, CreditCard, MapPin } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const MyOrder = ({ order }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const paymentStatus = order.paymentStatus;
  const orderStatus = order.orderStatus;
  const showPayButton =
    orderStatus === "accepted" && paymentStatus === "pending";
  // payment
  const handlePayment = async (order) => {
    // console.log("payment", order);
    const paymentInfo = {
      foodId: order._id,
      foodName: order.foodName,
      chefName: order.chefName,
      image: order.image,
      price: order.price,
      chef_email: order.chef_email,
      quantity: order.quantity,
      chefId: order.chefID,
      customer: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
      // paymentStatus: order.paymentStatus,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    // console.log(res.data.url)
    window.location.assign(res.data.url);
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
        {/* ............. */}

        <div className="px-5 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-secondary hover:text-primary font-semibold text-lg mt-3 transition-colors line-clamp-1">
              {order.foodName}
            </h2>
            <p>
              <span
                className={`font-semibold btn btn-outline ${
                  paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {paymentStatus}
              </span>
            </p>
          </div>
          <div className="flex gap-6">
            <p className="flex items-center gap-2">
              <ChefHat size={16} color="#11d46f" />
              <span className="text-[#7e6f67] text-sm">
                chef {order.chefName}
              </span>
            </p>
            <p className="text-[#7e6f67] text-sm">ID : {order.chefId}</p>
          </div>
          <div className="flex gap-5">
            <p className="text-[#7e6f67] text-sm">
              Price :
              <span className=" text-orange-500 font-medium">
                ৳ {order.price}
              </span>
            </p>
            <p className="text-[#7e6f67] text-sm">
              Oty :
              <span className="text-black font-medium">{order.quantity}</span>
            </p>
            <p className="text-[#7e6f67] text-sm">
              total price :{" "}
              <span className=" text-orange-500 font-medium">
                ৳ {order.totalPrice}
              </span>
            </p>
          </div>
          <p className="flex items-center gap-2">
            <Clock5 size={16} color="#7e6f67" />

            <span className="text-[#7e6f67] text-sm">
              {new Date(order.oderTime).toLocaleString()}
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
            {/* ..... */}
            <p>
              {/* Payment Status:{" "} */}
              <span
                className={`font-semibold btn btn-outline ${
                  paymentStatus === "paid"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {paymentStatus}
              </span>
            </p>

            {/* Status Messages */}
            {orderStatus === "pending" && (
              <p className="btn btn-outline text-sm text-yellow-600 font-medium">
                Waiting for chef
              </p>
            )}

            {orderStatus === "accepted" && paymentStatus === "pending" && (
              <p className="btn btn-outline text-sm text-blue-600 font-medium">
                Accepted, pay pending
              </p>
            )}

            {orderStatus === "delivered" && (
              <p className="btn btn-outline text-sm text-green-600 font-medium">
                Delivered
              </p>
            )}

            {orderStatus === "cancelled" && (
              <p className="btn btn-outline text-sm text-red-600 font-medium">
                Cancelled
              </p>
            )}

            {/* Pay Button (UI only) */}
            {showPayButton && (
              <button
                onClick={() => handlePayment(order)}
                className="  btn btn-outline flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                Pay Now
              </button>
            )}
            {/* ...... */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MyOrder;
