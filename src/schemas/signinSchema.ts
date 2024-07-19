import { z } from "zod";

export const emailValidationRegExp = new RegExp(
   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);

export const signInSchema = z.object({
   credentials: z
      .string()
      .min(2, { message: "Username is required" })
      .refine(
         (value) => (value.includes("@") ? emailValidationRegExp.test(value) : true),
         { message: "Not a valid email address." }
      ),
   password: z
      .string({ message: "Password is a required field." })
      .min(6, { message: "Password must be at least 6 characters." }),
});
