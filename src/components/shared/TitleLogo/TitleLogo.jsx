
import { ChefHat } from "lucide-react";
import { Link } from "react-router";

const TitleLogo = () => {
  return (
    <>
      <div>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold font-display">
            LocalChef<span className="text-primary">Bazaar</span>
          </span>
        </Link>
      </div>
    </>
  );
};

export default TitleLogo;
