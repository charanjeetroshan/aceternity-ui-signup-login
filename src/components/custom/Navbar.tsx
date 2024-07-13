import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, MenuItem, HoveredLink } from "../ui/navbar-menu";

export default function Navbar({ className }: { className?: string }) {
   const [active, setActive] = useState<string | null>(null);
   return (
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}>
         <Menu setActive={setActive}>
            <div className="flex justify-center gap-8">
               <HoveredLink
                  href="#"
                  className="dark:hover:text-neutral-200 hover:opacity-[0.9]"
               >
                  Home
               </HoveredLink>

               <MenuItem setActive={setActive} active={active} item="Blogs">
                  <div className="flex flex-col space-y-4 text-sm">
                     <HoveredLink href="#">Web Development</HoveredLink>
                     <HoveredLink href="#">Interface Design</HoveredLink>
                  </div>
               </MenuItem>

               <MenuItem setActive={setActive} active={active} item="Pricing">
                  <div className="flex flex-col space-y-4 text-sm">
                     <HoveredLink href="#">Hobby</HoveredLink>
                     <HoveredLink href="#">Individual</HoveredLink>
                     <HoveredLink href="#">Team</HoveredLink>
                     <HoveredLink href="#">Enterprise</HoveredLink>
                  </div>
               </MenuItem>
            </div>
         </Menu>
      </div>
   );
}
