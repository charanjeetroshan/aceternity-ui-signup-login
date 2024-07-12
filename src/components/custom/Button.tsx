type ButtonProps = {
   variant: "filled" | "outlined";
   children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
   const { variant, children } = props;

   if (variant === "filled") {
      return (
         <button className="w-40 h-10 font-semibold rounded-xl bg-blue-600 border border-transparent text-neutral-200 text-sm hover:bg-blue-700 transition-colors">
            {children}
         </button>
      );
   }

   if (variant === "outlined") {
      return (
         <button className="w-40 h-10 font-semibold rounded-xl text-neutral-200 border border-blue-600  text-sm hover:border-blue-700 transition-colors">
            {children}
         </button>
      );
   }
}
