import * as z from "zod";

export const UserEditFormSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),
  username: z.string().optional(),
  displayName: z
    .string("Display name is required")
    .min(1, "Display name is required"),
  avatarFileId: z.string().optional(),
  bio: z.string().max(50, "Max 50 characters").optional(),
  roleIds: z.array(z.string()).min(1, "At least one role is required"),
});

export type TUserEditFormSchema = z.infer<typeof UserEditFormSchema>;
