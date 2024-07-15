import { z } from "zod";

export const signupSchema = z.object({
   fullName: z
      .string({ message: "Full name is a required field." })
      .min(2, { message: "Type at least 2 characters." }),
   username: z
      .string({ message: "Username is a required field." })
      .min(2, { message: "At least 2 characters are mandatory." }),
   email: z
      .string({ message: "Email is a required field" })
      .email({ message: "Not a valid email address." }),
   password: z
      .string({ message: "Password is a required field." })
      .min(6, { message: "Password must be at least 6 characters." }),
});
