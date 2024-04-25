import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Inputprops extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = forwardRef<HTMLInputElement, Inputprops>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          "flex w-full p-4 my-3 bg-neutral-700 rounded-md border border-transparent px-3 py-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-netral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export default Input;
