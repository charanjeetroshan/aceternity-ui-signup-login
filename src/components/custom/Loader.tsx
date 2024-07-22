import { IconType } from "react-icons";
import { LuLoader2 } from "react-icons/lu";

type LoaderProps = {
   size?: "small" | "medium" | "large";
   className?: string;
} & React.ComponentPropsWithoutRef<IconType>;

export default function Loader(props: LoaderProps) {
   const { size, className, ...rest } = props;

   let sizeClassNames = "";

   switch (size) {
      case "small":
         sizeClassNames = "size-8";
         break;

      case "medium":
         sizeClassNames = "size-14";
         break;

      case "large":
         sizeClassNames = "size-16";
         break;

      default:
         sizeClassNames = "size-12";
         break;
   }

   return (
      <div className="grid place-items-center">
         <LuLoader2
            className={`animate-spin [animation-duration:_1.5s] ${sizeClassNames} ${className}`}
            {...rest}
         />
      </div>
   );
}
