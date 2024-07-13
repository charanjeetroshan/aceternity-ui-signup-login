import Button from "@/components/custom/Button";
import Navbar from "@/components/custom/Navbar";
import { TypewriterEffectSmooth as Typewriter } from "@/components/ui/typewriter-effect";
import { words } from "@/lib/constants";
import { Link } from "react-router-dom";

export function HomePage() {
   return (
      <div className="flex flex-col text-center items-center justify-center w-full min-h-screen">
         <Navbar className="font-semibold" />
         <Typewriter words={words} />
         <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10 xl:text-xl">
            An application built for practice by Charanjeet Singh Roshan
         </p>
         <div className="flex flex-col space-x-0 space-y-4 items-center sm:space-x-6 sm:space-y-0 sm:flex-row mt-10">
            <Link to="/sign-up">
               <Button variant="filled">Signup</Button>
            </Link>
            <Link to="/sign-in">
               <Button variant="outlined">Login</Button>
            </Link>
         </div>
      </div>
   );
}
