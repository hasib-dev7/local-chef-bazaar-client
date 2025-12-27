import { Coffee, Heart, Truck } from "lucide-react";

const ExtraSection = () => {
  const features = [
    {
      icon: <Truck size={30} color="#22c55e" />,
      title: "Fast Delivery",
      description:
        "Get your meals delivered to your doorstep quickly and safely.",
    },
    {
      icon: <Coffee size={30} color="#22c55e" />,
      title: "Fresh & Homemade",
      description: "All meals are freshly cooked by local chefs with love.",
    },
    {
      icon: <Heart size={30} color="#22c55e" />,
      title: "Customer Satisfaction",
      description: "We prioritize your happiness and taste experience.",
    },
  ];
  return (
    <>
      <div className="w-full lg:w-6/12 mx-auto text-center py-5">
        <h1 className="text-3xl md:text-4xl font-display font-heading-font font-bold text-secondary mb-4">
        Why Choose <span class="text-primary">LocalChefBazaar </span>?
        </h1>
        <p className="text-[#7e6f67] mb-5">
          Discover why our platform is the best choice for fresh, homemade
          meals. We connect local chefs with customers who value quality, taste,
          and convenience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExtraSection;
