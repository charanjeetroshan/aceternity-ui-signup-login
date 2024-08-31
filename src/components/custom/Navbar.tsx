import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, MenuItem, HoveredLink } from "../ui/navbar-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSetRecoilState } from "recoil";
import { userState } from "@/contexts/UserState";
import toast from "react-hot-toast";

export default function Navbar({ className }: { className?: string }) {
   const [active, setActive] = useState<string | null>(null);
   const { signOutUser } = useAuth();
   const setUser = useSetRecoilState(userState);

   const handleClick = async () => {
      const { response, errors } = await signOutUser();

      if (response && response.data.success) {
         toast.success(response.data.message);
         setUser(undefined);
      }

      if (errors && errors.response) {
         toast.error(errors.response.data.message);
      } else if (errors) {
         toast.error(errors.message);
      }
   };

   return (
      <div className={cn("fixed inset-x-0 w-full mx-auto z-50", className)}>
         <Menu setActive={setActive}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between px-4 w-[1150px] max-w-full">
               <Link to="/" className="text-2xl text-neutral-200 tracking-widest">
                  ChatWithUs
               </Link>
               <div className="flex justify-center gap-10">
                  <HoveredLink
                     to="/"
                     className="hover:dark:text-neutral-200 hover:opacity-[0.9]"
                     setActive={setActive}>
                     Home
                  </HoveredLink>

                  <MenuItem setActive={setActive} active={active} item="Credentials">
                     <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink to="/sign-up">Sign up</HoveredLink>
                        <HoveredLink to="/sign-in">Sign in</HoveredLink>
                     </div>
                  </MenuItem>

                  <MenuItem setActive={setActive} active={active} item="Pricing">
                     <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink to="/user-profile">My profile</HoveredLink>
                        <HoveredLink to="/delete-account">Delete my account</HoveredLink>
                        <HoveredLink to="#" onClick={handleClick}>
                           Logout
                        </HoveredLink>
                     </div>
                  </MenuItem>
               </div>
            </div>
         </Menu>
      </div>
   );
}
