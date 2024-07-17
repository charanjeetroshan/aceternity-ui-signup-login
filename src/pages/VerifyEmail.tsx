import toast, { LoaderIcon } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types";
import { useParams } from "react-router-dom";
import { verificationSchema } from "@/schemas/verificationSchema";
import OTPInput from "@/components/custom/OTPInput";
import Container from "@/components/custom/Container";
import InputErrorMessage from "@/components/custom/InputErrorMessage";

export default function VerifyEmail() {
   const { username } = useParams<{ username: string }>();

   const {
      handleSubmit,
      control,
      formState: { isSubmitting, errors: formErrors },
   } = useForm<z.infer<typeof verificationSchema>>({
      resolver: zodResolver(verificationSchema),
      defaultValues: {
         verificationCode: "",
      },
   });

   const verifyUser = async (data: z.infer<typeof verificationSchema>) => {
      try {
         const response = await axios.post<APIResponse>(
            `http://localhost:8000/api/v1/users/verify-email/${username}`,
            data
         );

         if (response.data.success) {
            toast.success("Verification successful!");
         }
      } catch (error) {
         console.log(error);
         const errors = error as AxiosError<APIResponse>;
         if (errors.response) {
            toast.error(errors.response.data.message);
         }
      }
   };

   return (
      <Container>
         <h2 className="font-bold text-center text-3xl text-neutral-800 dark:text-neutral-200 mb-4">
            Verify your email address
         </h2>
         <p className="text-base text-center dark:text-neutral-200 mb-8">
            We have sent you a verification code.
         </p>
         <form onSubmit={handleSubmit(verifyUser)}>
            <Controller
               name="verificationCode"
               control={control}
               render={({ field }) => <OTPInput {...field} />}
            />
            {formErrors.verificationCode && (
               <InputErrorMessage>
                  {formErrors.verificationCode.message}
               </InputErrorMessage>
            )}

            {isSubmitting && <LoaderIcon className="size-7 mx-auto mt-6" />}
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
         </form>
      </Container>
   );
}
