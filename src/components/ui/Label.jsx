import { cn } from "../../utils/cn";

const Label = ({ htmlFor, className, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-gray-700 font-medium mb-2", className)}
    >
      {children}
    </label>
  );
};

export default Label;
