import { forwardRef } from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
   variant: "filled" | "outlined";
   color?: "primary" | "error";
   children: React.ReactNode;
};

export default forwardRef(function Button(
   props: ButtonProps,
   ref: React.LegacyRef<HTMLButtonElement> | undefined
) {
   const { variant, children, className, color = "primary", ...rest } = props;

   const baseClasses = `py-2 px-12 font-semibold rounded-md text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${className}`;

   if (variant === "filled") {
      return (
         <button
            ref={ref}
            className={`${baseClasses} bg-blue-600 border border-transparent text-neutral-200 hover:bg-blue-700 ${
               color === "error" && "bg-red-700 hover:bg-red-800"
            }`}
            {...rest}>
            {children}
         </button>
      );
   }

   if (variant === "outlined") {
      return (
         <button
            ref={ref}
            className={`${baseClasses} text-neutral-200 border border-blue-600 hover:border-blue-700 ${
               color === "error" && "bg-red-700 hover:bg-red-800"
            }`}
            {...rest}>
            {children}
         </button>
      );
   }
});
