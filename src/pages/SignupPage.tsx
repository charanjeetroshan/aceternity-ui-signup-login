import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/custom/Button";

export function SignupPage() {
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Form submitted");
   };
   return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
         <div className="p-4 md:p-8">
            <h2 className="font-bold text-center text-3xl text-neutral-800 dark:text-neutral-200">
               Sign up to dive into the world of magic
            </h2>
            <form className="my-12" onSubmit={handleSubmit}>
               <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                     <Label htmlFor="firstname">First name</Label>
                     <Input id="firstname" placeholder="Tyler" type="text" />
                  </LabelInputContainer>
                  <LabelInputContainer>
                     <Label htmlFor="lastname">Last name</Label>
                     <Input id="lastname" placeholder="Durden" type="text" />
                  </LabelInputContainer>
               </div>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
               </LabelInputContainer>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="••••••••" type="password" />
               </LabelInputContainer>
               <LabelInputContainer className="mb-8">
                  <Label htmlFor="twitterpassword">Your twitter password</Label>
                  <Input
                     id="twitterpassword"
                     placeholder="••••••••"
                     type="twitterpassword"
                  />
               </LabelInputContainer>
               <Button variant="filled" type="submit">
                  Sign up &rarr;
               </Button>
               <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
         </div>
      </div>
   );
}

const LabelInputContainer = ({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) => {
   return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
   );
};
