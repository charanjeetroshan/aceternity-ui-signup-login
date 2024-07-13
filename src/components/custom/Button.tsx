type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
   variant: "filled" | "outlined";
   children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
   const { variant, children, ...rest } = props;

   if (variant === "filled") {
      return (
         <button
            className="w-full py-2 px-12 font-semibold rounded-xl bg-blue-600 border border-transparent text-neutral-200 text-sm hover:bg-blue-700 transition-colors"
            {...rest}
         >
            {children}
         </button>
      );
   }

   if (variant === "outlined") {
      return (
         <button className="w-full py-2 px-12 font-semibold rounded-xl text-neutral-200 border border-blue-600  text-sm hover:border-blue-700 transition-colors">
            {children}
         </button>
      );
   }
}
