import * as z from "zod";

// Mirrors class-validator @IsStrongPassword() defaults
const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/\d/, "Password must include a number")
  .regex(/[^A-Za-z0-9]/, "Password must include a symbol");

export const SettingsPasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: strongPassword,
    newPasswordConfirmation: z.string().min(1, "Confirm your new password"),
  })
  .refine((value) => value.newPassword === value.newPasswordConfirmation, {
    message: "Passwords do not match",
    path: ["newPasswordConfirmation"],
  });

export type TSettingsPasswordFormSchema = z.infer<
  typeof SettingsPasswordFormSchema
>;
