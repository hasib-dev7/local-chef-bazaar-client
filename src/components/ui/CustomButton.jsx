/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import React from "react";
const CustomButton = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.99 }}
      whileHover={{ scale: 1.01, transition: { yoyo: Infinity } }}
      className={cn(
        "w-full text-sm font-medium py-3 rounded-lg text-white bg-primary ",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

CustomButton.displayName = "Button";
export default CustomButton;
