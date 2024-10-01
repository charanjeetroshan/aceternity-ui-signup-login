import AlertDialog from "@/components/custom/AlertDialog";
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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function DeleteAccountPage() {
   const [isOpen, setIsOpen] = useState(false);
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

   const openDialog = () => setIsOpen(true);
   const closeDialog = () => setIsOpen(false);

   const submitHandler = async (data: z.infer<typeof deleteAccountSchema>) => {
      await deleteUserAccount(data);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === "Enter") {
         e.preventDefault();
         openDialog();
      }
   };

   const handleContinue = () => {
      handleSubmit(submitHandler)();
      closeDialog();
   };

   return (
      <Container>
         <h2 className="font-bold text-center text-2xl sm:text-3xl text-neutral-800 dark:text-neutral-200 my-12">
            Delete my account
         </h2>
         <form className="w-[550px] max-w-full grid" onKeyDown={handleKeyDown}>
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
                        autoFocus
                        {...field}
                     />
                  )}
               />
               {formErrors.password && (
                  <InputErrorMessage>{formErrors.password.message}</InputErrorMessage>
               )}
            </LabelInputContainer>
            <Button
               color="error"
               variant="filled"
               type="button"
               disabled={isSubmitting}
               onClick={openDialog}>
               Delete &rarr;
            </Button>
            {isSubmitting && <Loader className="mx-auto mt-6" size="small" />}
            <AlertDialog
               isOpen={isOpen}
               title="Are you sure to deleting your account?"
               message="This step cannot be undone."
               onClose={closeDialog}
               onContinue={handleContinue}
            />
         </form>
      </Container>
   );
}
