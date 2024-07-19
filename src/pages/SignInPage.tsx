import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/custom/Button";
import toast, { LoaderIcon } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types";
import { useNavigate } from "react-router-dom";
import Container from "@/components/custom/Container";
import InputErrorMessage from "@/components/custom/InputErrorMessage";
import { LabelInputContainer } from "@/components/custom/InputLabelContainer";
import GradientSeparator from "@/components/custom/GradientSeparator";
import { emailValidationRegExp, signInSchema } from "@/schemas/signinSchema";

export default function SignInPage() {
   const navigate = useNavigate();

   const {
      handleSubmit,
      control,
      formState: { isSubmitting, errors: formErrors },
   } = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
         credentials: "",
         password: "",
      },
   });

   const signInUser = async (data: z.infer<typeof signInSchema>) => {
      const email = data.credentials.includes("@") ? data.credentials : undefined;
      const username = !emailValidationRegExp.test(data.credentials)
         ? data.credentials
         : undefined;

      try {
         const response = await axios.post<APIResponse>(
            "http://localhost:8000/api/v1/users/login",
            {
               email,
               username,
               password: data.password,
            }
         );

         if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
               navigate("/user-profile");
            }, 1500);
         }
      } catch (error) {
         console.error(error);
         const errors = error as AxiosError<APIResponse>;
         if (errors.response) {
            toast.error(errors.response.data.message);
         } else {
            toast.error(errors.message);
         }
      }
   };

   return (
      <Container>
         <h2 className="font-bold text-center text-2xl sm:text-3xl text-neutral-800 dark:text-neutral-200 my-12">
            Log in to dive into the world of magic
         </h2>
         <form className="w-[550px] max-w-full" onSubmit={handleSubmit(signInUser)}>
            <LabelInputContainer className="mb-6">
               <Label htmlFor="credentials">Email / Username</Label>
               <Controller
                  name="credentials"
                  control={control}
                  render={({ field }) => (
                     <Input
                        id="credentials"
                        placeholder="Max Mustermann"
                        type="text"
                        {...field}
                     />
                  )}
               />
               {formErrors.credentials && (
                  <InputErrorMessage>{formErrors.credentials.message}</InputErrorMessage>
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
               Login &rarr;
            </Button>
            {isSubmitting && <LoaderIcon className="size-7 mx-auto mt-6" />}
         </form>
         <GradientSeparator />
      </Container>
   );
}
