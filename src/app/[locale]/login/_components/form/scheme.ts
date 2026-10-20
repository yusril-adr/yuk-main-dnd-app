import * as z from "zod";

export const LoginFormSchema = z.object({
  identifier: z.string("Username/Email is required"),
  password: z.string("Password is required"),
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
