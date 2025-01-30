import { z } from "zod";

export default function schema() {
   const password = z.string().min(8).max(20);
   return z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      password,
      confirmPassword: z
         .string()
         .min(8)
         .max(20)
         .refine((value: string) => value === password._input, "passwords must match"),
      termsAndConditions: z.boolean(),
   });
}
