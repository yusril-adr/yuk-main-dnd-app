import * as z from "zod";

import { StoryStatusEnum } from "@/api/main/modules/master/stories/enums/story-status";
import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";

export const StoryCreateFormSchema = z.object({
  title: z
    .string("Title is required")
    .min(1, "Title is required")
    .max(150, "Title must be at most 150 characters")
    .regex(/[A-Za-z0-9]/, "Title must contain at least one letter or number"),
  description: z.string().optional(),
  status: z.enum(StoryStatusEnum, "Status is required"),
  type: z.enum(StoryTypeEnum, "Type is required"),
  gameSystem: z
    .string()
    .max(100, "Game system must be at most 100 characters")
    .optional(),
  // Kept as the raw input string; converted to a number on submit ("" = not set)
  maxMembers: z
    .string()
    .regex(/^([1-9]\d*)?$/, "Max members must be a whole number of at least 1"),
  // datetime-local input value ("" = not set)
  startAt: z.string(),
  locationType: z.enum(StoryLocationTypeEnum, "Location type is required"),
  locationDetail: z
    .string("Location detail is required")
    .min(1, "Location detail is required"),
});

export type TStoryCreateFormSchema = z.infer<typeof StoryCreateFormSchema>;
