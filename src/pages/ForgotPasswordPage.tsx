import Button from "@/components/custom/Button";
import Container from "@/components/custom/Container";
import InputErrorMessage from "@/components/custom/InputErrorMessage";
import { LabelInputContainer } from "@/components/custom/InputLabelContainer";
import Loader from "@/components/custom/Loader";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function ForgotPasswordPage() {
   const navigate = useNavigate();
   const {
      handleSubmit,
      control,
      formState: { errors: formErrors, isSubmitting },
   } = useForm<z.infer<typeof forgotPasswordSchema>>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
         email: "",
      },
   });

   const { forgotPassword } = useAuth();

   const submitHandler = async (data: z.infer<typeof forgotPasswordSchema>) => {
      const { response, errors } = await forgotPassword(data);

      if (response?.data.success) {
         toast.success(response.data.message);
         navigate("/reset-password");
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
            Reset your password
         </h2>
         <div className="w-[550px] max-w-full">
            <form onSubmit={handleSubmit(submitHandler)}>
               <LabelInputContainer className="mb-2">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                     name="email"
                     control={control}
                     render={({ field }) => (
                        <Input
                           id="email"
                           placeholder="max-mustermann@test.com"
                           type="email"
                           {...field}
                        />
                     )}
                  />
                  {formErrors.email && (
                     <InputErrorMessage>{formErrors.email.message}</InputErrorMessage>
                  )}
               </LabelInputContainer>
               <p className="mb-6 text-neutral-500 text-sm">
                  Hint: Type in your email address. We will send you a verification code
                  to confirm your identity.
               </p>
               <Button variant="filled" type="submit" disabled={isSubmitting}>
                  Confirm &rarr;
               </Button>
               {isSubmitting && <Loader className="mx-auto mt-6" size="small" />}
            </form>
         </div>
      </Container>
   );
}

export default ForgotPasswordPage;
