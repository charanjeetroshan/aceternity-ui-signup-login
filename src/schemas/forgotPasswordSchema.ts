import { z } from "zod";

export const forgotPasswordSchema = z.object({
   email: z.string().email({ message: "Not a valid email address." }),
});