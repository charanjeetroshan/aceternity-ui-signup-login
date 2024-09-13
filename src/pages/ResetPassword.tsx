import Button from "@/components/custom/Button";
import Container from "@/components/custom/Container";
import GradientSeparator from "@/components/custom/GradientSeparator";
import InputErrorMessage from "@/components/custom/InputErrorMessage";
import { LabelInputContainer } from "@/components/custom/InputLabelContainer";
import Loader from "@/components/custom/Loader";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function ResetPassword() {
   const {
      handleSubmit,
      control,
      formState: { errors: formErrors, isSubmitting },
   } = useForm<z.infer<typeof resetPasswordSchema>>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         username: "",
         resetPasswordOTP: "",
         newPassword: "",
         confirmNewPassword: "",
      },
   });
   const navigate = useNavigate();

   const { resetPassword } = useAuth();

   const submitHandler = async (data: z.infer<typeof resetPasswordSchema>) => {
      const { response, errors } = await resetPassword(data);

      if (response?.data.success) {
         toast.success(response.data.message);
         navigate("/sign-in");
      }

      if (errors && errors.response) {
         toast.error(errors.response.data.message);
      } else if (errors) {
         toast.error(errors.message);
      }
   };

   console.log(formErrors);

   return (
      <Container>
         <h2 className="font-bold text-center text-2xl sm:text-3xl text-neutral-800 dark:text-neutral-200 my-12">
            Reset Your Password
         </h2>
         <form className="w-[550px] max-w-full" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
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
                           autoFocus
                           {...field}
                        />
                     )}
                  />
                  {formErrors.username && (
                     <InputErrorMessage>{formErrors.username.message}</InputErrorMessage>
                  )}
               </LabelInputContainer>
               <LabelInputContainer>
                  <Label htmlFor="resetPasswordOTP">Verification Code</Label>
                  <Controller
                     name="resetPasswordOTP"
                     control={control}
                     render={({ field }) => (
                        <Input
                           id="resetPasswordOTP"
                           placeholder="123456"
                           type="number"
                           {...field}
                        />
                     )}
                  />
                  {formErrors.resetPasswordOTP && (
                     <InputErrorMessage>
                        {formErrors.resetPasswordOTP.message}
                     </InputErrorMessage>
                  )}
               </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
               <Label htmlFor="newPassword">New Password</Label>
               <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                     <Input
                        id="newPassword"
                        placeholder="••••••••"
                        type="password"
                        {...field}
                     />
                  )}
               />
               {formErrors.newPassword && (
                  <InputErrorMessage>{formErrors.newPassword.message}</InputErrorMessage>
               )}
            </LabelInputContainer>
            <LabelInputContainer className="mb-6">
               <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
               <Controller
                  name="confirmNewPassword"
                  control={control}
                  render={({ field }) => (
                     <Input
                        id="confirmNewPassword"
                        placeholder="••••••••"
                        type="password"
                        {...field}
                     />
                  )}
               />
               {formErrors.confirmNewPassword && (
                  <InputErrorMessage>
                     {formErrors.confirmNewPassword.message}
                  </InputErrorMessage>
               )}
               {"password" in formErrors && (
                  <InputErrorMessage>
                     {(formErrors.password as { message: string }).message}
                  </InputErrorMessage>
               )}
            </LabelInputContainer>
            <Button variant="filled" type="submit" disabled={isSubmitting}>
               Confirm &rarr;
            </Button>
            {isSubmitting && <Loader className="mx-auto mt-6" size="small" />}
         </form>
         <GradientSeparator />
      </Container>
   );
}

export default ResetPassword;
