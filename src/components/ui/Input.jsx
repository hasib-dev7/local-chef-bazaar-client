import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 text-gray-800 border border-orange-300 focus:outline-orange-400 rounded-md bg-[#fcfaf8] placeholder-black-90",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
