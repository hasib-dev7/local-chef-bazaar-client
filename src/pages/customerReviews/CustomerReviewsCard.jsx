import { FaStar } from "react-icons/fa6";
const CustomerReviewsCard = () => {
  return (
    <>
      <div className="">
        <div></div>
      </div>
      {/*  */}
      <div className="bg-white p-7 rounded-xl shadow mt-5 flex flex-col lg:flex-row justify-between space-y-3">
        <div className="flex flex-col items-center lg:flex-row gap-3">
          <div className="avatar">
            <div className="w-20 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
          <div>
            <h2 className="text-lg text-secondary font-semibold">
              Nazia Haque
            </h2>
            <div className="flex gap-2 my-3">
              <FaStar className="text-2xl text-orange-400" />
              <FaStar className="text-2xl text-orange-400" />
              <FaStar className="text-2xl text-orange-400" />
              <FaStar className="text-2xl text-orange-400" />
              <FaStar className="text-2xl text-orange-400" />
            </div>
            <p className="text-[#7e6f67]">
              Best butter chicken I've ever had! Will definitely order again.
            </p>
          </div>
        </div>
        <p className="text-[#7e6f67]">date:01/12/25</p>
      </div>
    </>
  );
};

export default CustomerReviewsCard;
