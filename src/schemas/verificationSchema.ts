import { z } from "zod";

export const verificationSchema = z.object({
   verificationCode: z
      .string({ message: "Verification code cannot be other characters than numbers." })
      .length(6, { message: "Verification Code must be of 6 digits." }),
});
