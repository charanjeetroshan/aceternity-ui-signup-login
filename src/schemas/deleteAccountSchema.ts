import { z } from "zod";

export const deleteAccountSchema = z.object({
   password: z
      .string({ message: "Password is a required field." })
      .min(6, { message: "Password must be at least 6 characters." }),
});
