import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/custom/Button";
import toast, { LoaderIcon } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types";
import { Navigate } from "react-router-dom";

export function SignupPage() {
   const [registerationSuccess, setRegistrationSuccess] = useState(false);

   const {
      handleSubmit,
      control,
      formState: { isSubmitting, errors: formErrors },
   } = useForm<z.infer<typeof signupSchema>>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         fullName: "",
         email: "",
         username: "",
         password: "",
      },
   });

   const registerUser = async (data: z.infer<typeof signupSchema>) => {
      try {
         const response = await axios.post<APIResponse>(
            "http://localhost:8000/api/v1/users/register",
            data
         );

         if (response.data.success) {
            toast.success("Registration successful!");
            setTimeout(() => {
               setRegistrationSuccess(true);
            }, 1500);
         }
      } catch (error) {
         console.log(error);
         const errors = error as AxiosError<APIResponse>;
         if (errors.response) {
            toast.error(errors.response.data.message);
         }
      }
   };

   if (registerationSuccess) {
      return <Navigate to="/verify-email" replace />;
   }

   return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
         <div className="p-4 md:p-8">
            <h2 className="font-bold text-center text-3xl text-neutral-800 dark:text-neutral-200">
               Sign up to dive into the world of magic
            </h2>
            <form className="my-12" onSubmit={handleSubmit(registerUser)}>
               <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                     <Label htmlFor="fullName">Full Name</Label>
                     <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                           <Input
                              id="fullName"
                              placeholder="Max Mustermann"
                              type="text"
                              {...field}
                           />
                        )}
                     />
                     {formErrors.fullName && (
                        <ErrorMessage>{formErrors.fullName.message}</ErrorMessage>
                     )}
                  </LabelInputContainer>
                  <LabelInputContainer>
                     <Label htmlFor="username">Username</Label>
                     <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                           <Input
                              id="username"
                              placeholder="max55"
                              type="text"
                              {...field}
                           />
                        )}
                     />
                     {formErrors.username && (
                        <ErrorMessage>{formErrors.username.message}</ErrorMessage>
                     )}
                  </LabelInputContainer>
               </div>
               <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>

                  <Controller
                     name="email"
                     control={control}
                     render={({ field }) => (
                        <Input
                           id="email"
                           placeholder="max-mustermann@google.com"
                           type="email"
                           {...field}
                        />
                     )}
                  />
                  {formErrors.email && (
                     <ErrorMessage>{formErrors.email.message}</ErrorMessage>
                  )}
               </LabelInputContainer>
               <LabelInputContainer className="mb-6">
                  <Label htmlFor="password">Password</Label>
                  <Controller
                     name="password"
                     control={control}
                     render={({ field }) => (
                        <Input
                           id="password"
                           placeholder="••••••••"
                           type="password"
                           {...field}
                        />
                     )}
                  />
                  {formErrors.password && (
                     <ErrorMessage>{formErrors.password.message}</ErrorMessage>
                  )}
               </LabelInputContainer>
               <Button variant="filled" type="submit" disabled={isSubmitting}>
                  Sign up &rarr;
               </Button>
               {isSubmitting && <LoaderIcon className="size-7 mx-auto mt-6" />}
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

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
   return <p className="text-sm text-red-600">{children}</p>;
};
