import React from "react";
import { cn } from "../../utils/cn";

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        className={cn(
          "w-full px-4 py-3 text-gray-800 border border-dashed border-orange-300 focus:outline-orange-400 focus:border-dashed rounded-md bg-[#fcfaf8] placeholder-black-90 resize-none",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
