import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/custom/Button";
import toast, { LoaderIcon } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { APIResponse, User } from "@/types";
import { Navigate } from "react-router-dom";
import Container from "@/components/custom/Container";
import InputErrorMessage from "@/components/custom/InputErrorMessage";
import { LabelInputContainer } from "@/components/custom/InputLabelContainer";

export default function SignupPage() {
   const [registerationSuccess, setRegistrationSuccess] = useState(false);
   const [registeredUser, setRegisteredUser] = useState<User>();

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
            setRegisteredUser(response.data.data?.user);
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
      return <Navigate to={`/verify-email/${registeredUser?.username}`} />;
   }

   return (
      <Container>
         <h2 className="font-bold text-center text-2xl sm:text-3xl text-neutral-800 dark:text-neutral-200 my-12">
            Sign up to dive into the world of magic
         </h2>
         <form className="w-[550px] max-w-full" onSubmit={handleSubmit(registerUser)}>
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
                     <InputErrorMessage>{formErrors.fullName.message}</InputErrorMessage>
                  )}
               </LabelInputContainer>
               <LabelInputContainer>
                  <Label htmlFor="username">Username</Label>
                  <Controller
                     name="username"
                     control={control}
                     render={({ field }) => (
                        <Input id="username" placeholder="max55" type="text" {...field} />
                     )}
                  />
                  {formErrors.username && (
                     <InputErrorMessage>{formErrors.username.message}</InputErrorMessage>
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
                  <InputErrorMessage>{formErrors.email.message}</InputErrorMessage>
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
                  <InputErrorMessage>{formErrors.password.message}</InputErrorMessage>
               )}
            </LabelInputContainer>
            <Button variant="filled" type="submit" disabled={isSubmitting}>
               Sign up &rarr;
            </Button>
            {isSubmitting && <LoaderIcon className="size-7 mx-auto mt-6" />}
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
         </form>
      </Container>
   );
}
