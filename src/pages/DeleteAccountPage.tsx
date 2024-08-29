import Button from "@/components/custom/Button";
import Container from "@/components/custom/Container";
import InputErrorMessage from "@/components/custom/InputErrorMessage";
import { LabelInputContainer } from "@/components/custom/InputLabelContainer";
import Loader from "@/components/custom/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { deleteAccountSchema } from "@/schemas/deleteAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function DeleteAccountPage() {
   const navigate = useNavigate();
   const {
      control,
      handleSubmit,
      formState: { errors: formErrors, isSubmitting },
   } = useForm<z.infer<typeof deleteAccountSchema>>({
      resolver: zodResolver(deleteAccountSchema),
      defaultValues: {
         password: "",
      },
   });
   const { deleteUserAccount } = useAuth();

   const submitHandler = async (data: z.infer<typeof deleteAccountSchema>) => {
      const { response, errors } = await deleteUserAccount(data);

      if (response && response.data.success) {
         toast.success(response.data.message);
         navigate("/");
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
            Delete my account
         </h2>
         <form
            className="w-[550px] max-w-full grid"
            onSubmit={handleSubmit(submitHandler)}>
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
            <Button color="error" variant="filled" type="submit" disabled={isSubmitting}>
               Delete &rarr;
            </Button>
            {isSubmitting && <Loader className="mx-auto mt-6" size="small" />}
         </form>
      </Container>
   );
}
