import * as z from "zod";

export const RoleFormSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters")
    .regex(/[A-Za-z0-9]/, "Name must contain at least one letter or number"),
  description: z.string().optional(),
  permissionIds: z.array(z.string()),
});

export type TRoleFormSchema = z.infer<typeof RoleFormSchema>;
