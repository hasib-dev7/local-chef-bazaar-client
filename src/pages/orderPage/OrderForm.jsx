/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router";
import Container from "../../components/container/Container";
import { MoveLeft } from "lucide-react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/shared/spinner/LoadingSpinner";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import ErrorPages from "../error/ErrorPages.jsx";

const OrderForm = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");
  const [userAddressError, setUserAddressError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: meals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals/${id}`
      );
      return result.data;
    },
  });

  // confirm order
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/orders", payload),
    onSuccess: () => {
      // invalidateQueries
      queryClient.invalidateQueries(["orders"]);
      //
      mutationReset();
    },
  });
  const totalPrice = meals.price * quantity;
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

  // confirm order button
  const handleConfirmOrder = async () => {
    // user address validation
    if (!userAddress.trim()) {
      setUserAddressError("Delivery address is required");
      return;
    }
    setUserAddressError("");

    const paymentInfo = {
      foodId: meals._id,
      foodName: meals.foodName,
      chefName: meals.chefName,
      image: meals.image,
      price: meals.price,
      chef_email: meals.chef_email,
      totalPrice: totalPrice,
      quantity: quantity,
      chefId: meals.chefID,
      paymentStatus: "pending",
      customer: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        address: userAddress,
      },
      orderStatus: "pending",
    };

    Swal.fire({
      title: `Confirm Your Order`,
      text: `Your total price is ৳${totalPrice}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(paymentInfo); // save order to DB

          // ✅ Success Toast / SweetAlert
          Swal.fire({
            title: "Order Placed Successfully!",
            text: `You ordered ${paymentInfo.quantity} x ${paymentInfo.foodName}`,
            icon: "success",
            confirmButtonText: "OK",
          });
          // navigate my order dashboard page
          navigate("/dashboard/dashboard/user-orders");
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.response?.data?.error || "Failed to place order",
            icon: "error",
          });
        }
      }
    });
  };

  // order data save to db
  // await mutateAsync(paymentInfo);
  // window.location.href = data.url;
  // console.log(data);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPages></ErrorPages>;
  return (
    <>
     <title>Local Chef Bazaar - Order Page</title>
      <Container>
        <section className="py-5 md:py-8 lg:py-12">
          <Link to={`/meal-details/${id}`} className="flex items-center gap-2">
            <MoveLeft size={20} color="#000000" />
            <span className="text-lg text-black/80 hover:text-black transition-all">
              Back to Meals
            </span>
          </Link>
          {/* order form */}
          <div className="w-full lg:w-10/12 mx-auto flex flex-col justify-center items-start lg:flex-row gap-5 lg:gap-0 m-5 lg:mt-10">
            {/* left side  */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="order-2 lg:order-1 w-full lg:w-6/12 mx-auto bg-white/80  backdrop-blur-2xl shadow-md p-8 border border-white/40 rounded-md space-y-4 "
            >
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                Confirm Your Order
              </h1>
              {/* fode name */}
              <div class="space-y-2">
                <p className="text-sm font-medium text-secondary">Meal Name</p>
                <p className="mt-1 h-10 px-3 py-2 rounded-lg bg-[#f3f1ed] border border-[#f3f1ed] text-secondary">
                  {meals.foodName}
                </p>
              </div>
              {/* price */}
              <div class="space-y-2">
                <p className="text-sm font-medium text-secondary">
                  Price per Item
                </p>
                <p className="mt-1 h-10 px-3 py-2 rounded-lg bg-[#f3f1ed] border border-[#f3f1ed] text-secondary">
                  ৳ {meals.price}
                </p>
              </div>
              {/* quatity */}
              <div class="space-y-2">
                {/* Quantity */}
                <span className="text-sm font-medium text-secondary">
                  Quantity
                </span>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn btn-outline btn-md"
                  >
                    −
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="btn btn-outline btn-md"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* chefID */}
              <div class="space-y-2">
                <p className="text-sm font-medium text-secondary">Chef ID</p>
                <p className="mt-1 h-10 px-3 py-2 rounded-lg bg-[#f3f1ed] border border-[#f3f1ed] text-secondary">
                  {meals.chefID}
                </p>
              </div>
              {/* your email*/}
              <div class="space-y-2">
                <p className="text-sm font-medium text-secondary">Your Email</p>
                <p className="mt-1 h-10 px-3 py-2 rounded-lg bg-[#f3f1ed] border border-[#f3f1ed] text-secondary">
                  {user?.email}
                </p>
              </div>
              {/* Delivery Address */}
              <div class="space-y-2">
                <p className="text-sm font-medium text-secondary">
                  Delivery Address
                </p>
                <textarea
                  required
                  value={userAddress}
                  onChange={(e) => {
                    setUserAddress(e.target.value);
                    setUserAddressError("");
                  }}
                  rows={2}
                  placeholder="Enter delivery address"
                  className="w-full  px-3 py-2 rounded-lg bg-[#f3f1ed] border border-[#f3f1ed] text-gray-700"
                ></textarea>

                {userAddressError && (
                  <p className="text-red-500 text-sm">{userAddressError}</p>
                )}
              </div>
            </motion.div>
            {/* right */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="order-1 lg:order-2 w-full lg:w-4/12 mx-auto bg-white/80  backdrop-blur-2xl shadow-md p-8 border border-white/40 rounded-md"
            >
              <div className="">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="flex justify-between text-sm mb-2">
                  <span>Price</span>
                  <span>৳{meals.price}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Quantity</span>
                  <span>×{quantity}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-500">৳{totalPrice}</span>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  // onClick={handleConfirmOrder}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
                >
                  Confirm Order
                </button>

                <p className="text-center text-sm text-gray-500 mt-3">
                  Order Status: <span className="text-orange-500">Pending</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default OrderForm;
