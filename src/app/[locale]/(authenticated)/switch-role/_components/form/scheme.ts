import * as z from "zod";

export const SwitchFormSchema = z.object({
  role: z.string().min(1, "Role is required"),
});

export type TSwitchFormSchema = z.infer<typeof SwitchFormSchema>;
