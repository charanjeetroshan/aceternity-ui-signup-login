import Button from "@/components/custom/Button";
import Navbar from "@/components/custom/Navbar";
import { TypewriterEffectSmooth as Typewriter } from "@/components/ui/typewriter-effect";
import { words } from "@/lib/constants";

export function HomePage() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <Navbar className="font-semibold" />
         <Typewriter words={words} />
         <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10 xl:text-xl">
            An application built for practice by Charanjeet Singh Roshan
         </p>
         <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
            <Button variant="filled">Signup</Button>

            <Button variant="outlined">Login</Button>
         </div>
      </div>
   );
}
