import * as z from "zod";

export const SettingsProfileFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().max(50, "Username must be at most 50 characters"),
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(100, "Display name must be at most 100 characters"),
  bio: z.string().max(50, "Bio must be at most 50 characters"),
  avatarFileId: z.string(),
});

export type TSettingsProfileFormSchema = z.infer<
  typeof SettingsProfileFormSchema
>;
