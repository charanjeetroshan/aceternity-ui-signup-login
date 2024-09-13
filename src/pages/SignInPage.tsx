import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/custom/Button";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@/components/custom/Container";
import InputErrorMessage from "@/components/custom/InputErrorMessage";
import { LabelInputContainer } from "@/components/custom/InputLabelContainer";
import GradientSeparator from "@/components/custom/GradientSeparator";
import { emailValidationRegExp, signInSchema } from "@/schemas/signInSchema";
import { useAuth } from "@/hooks/useAuth";
import { useSetRecoilState } from "recoil";
import { userState } from "@/contexts/UserState";
import Loader from "@/components/custom/Loader";
import { Link } from "react-router-dom";

export default function SignInPage() {
   const setUser = useSetRecoilState(userState);
   const { signInUser, getCurrentUser } = useAuth();
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

   const submitHandler = async (data: z.infer<typeof signInSchema>) => {
      const email = data.credentials.includes("@") ? data.credentials : undefined;
      const username = !emailValidationRegExp.test(data.credentials)
         ? data.credentials
         : undefined;

      const { response, errors } = await signInUser({
         email,
         username,
         password: data.password,
      });

      if (response && response.data.success) {
         toast.success(response.data.message);

         const { response: currentUserResponse } = await getCurrentUser();

         if (currentUserResponse && currentUserResponse.data.success) {
            setUser(currentUserResponse.data.data?.user);
         }
      }

      if (errors && errors.response) {
         toast.error(errors.response.data.message);
      } else if (errors) {
         toast.error(errors.message);
      }
   };

   return (
      <Container>
         <h2 className="font-bold text-center text-2xl sm:text-3xl text-neutral-800 dark:text-neutral-200 my-12">
            Log in to dive into the world of magic
         </h2>
         <form className="w-[550px] max-w-full" onSubmit={handleSubmit(submitHandler)}>
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

            <LabelInputContainer>
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
            <div className="mb-6">
               <span className="text-sm text-neutral-500">
                  Forgot your password? Click{" "}
               </span>
               <Link
                  className="text-sm text-blue-600 hover:underline hover:text-blue-700"
                  to="/forgot-password">
                  here
               </Link>
               <span className="text-sm text-neutral-500"> to reset it.</span>
            </div>
            <Button variant="filled" type="submit" disabled={isSubmitting}>
               Login &rarr;
            </Button>
            {isSubmitting && <Loader className="mx-auto mt-6" size="small" />}
         </form>
         <GradientSeparator />
      </Container>
   );
}
