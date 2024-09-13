import { z } from "zod";

export const resetPasswordSchema = z
   .object({
      username: z
         .string({ message: "Username is a required field." })
         .min(2, { message: "At least 2 characters are mandatory." }),
      resetPasswordOTP: z
         .string({
            message: "Verification code cannot be other characters than numbers.",
         })
         .length(6, { message: "Verification Code must be of exactly 6 digits." }),
      newPassword: z
         .string({ message: "Password is a required field." })
         .min(6, { message: "Password must be at least 6 characters." }),
      confirmNewPassword: z
         .string({ message: "Password is a required field." })
         .min(6, { message: "Password must be at least 6 characters." }),
   })
   .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "The password fields do not match.",
      path: ["password"],
   });
