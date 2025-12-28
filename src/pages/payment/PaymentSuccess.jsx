import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <>
     <title>Local Chef Bazaar - PaymentSuccess</title>
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>
          <Link
            to="/dashboard/dashboard/user-orders"
            className="inline-block bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
          >
            Go to My Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
