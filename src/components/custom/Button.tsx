type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
   variant: "filled" | "outlined";
   children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
   const { variant, children, className, ...rest } = props;

   const baseClasses = `py-2 px-12 font-semibold rounded-md text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${className}`;

   if (variant === "filled") {
      return (
         <button
            className={`${baseClasses} bg-blue-600 border border-transparent text-neutral-200 hover:bg-blue-700`}
            {...rest}>
            {children}
         </button>
      );
   }

   if (variant === "outlined") {
      return (
         <button
            className={`${baseClasses} text-neutral-200 border border-blue-600 hover:border-blue-700`}
            {...rest}>
            {children}
         </button>
      );
   }
}
