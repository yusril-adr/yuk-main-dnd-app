import * as z from "zod";

export const UserCreateFormSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  username: z
    .string()
    .regex(/^\S*$/, "Username must not contain spaces")
    .optional(),
  displayName: z
    .string("Display name is required")
    .min(1, "Display name is required"),
  avatarFileId: z.string().optional(),
  bio: z.string().max(50, "Max 50 characters").optional(),
  roleIds: z.array(z.string()).min(1, "At least one role is required"),
});

export type TUserCreateFormSchema = z.infer<typeof UserCreateFormSchema>;
