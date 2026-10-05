import * as z from "zod";

import { StoryTypeEnum } from "@/api/main/modules/master/stories/enums/story-type";
import { StoryLocationTypeEnum } from "@/api/main/modules/master/stories/enums/story-location-type";
import { getRichTextPlainText } from "@/utils/rich-text";
import { STORY_DESCRIPTION_MAX_LENGTH } from "@/app/(authenticated)/dashboard/master/stories/_constants/story-description";

export const StoryCreateFormSchema = z.object({
  // Uploaded banner file id ("" = no banner)
  bannerFileId: z.string(),
  title: z
    .string("Title is required")
    .min(1, "Title is required")
    .max(150, "Title must be at most 150 characters")
    .regex(/[A-Za-z0-9]/, "Title must contain at least one letter or number"),
  // Rich text HTML ("" = empty); the limit applies to the visible text
  description: z
    .string()
    .refine(
      (value) =>
        getRichTextPlainText(value).length <= STORY_DESCRIPTION_MAX_LENGTH,
      `Description must be at most ${STORY_DESCRIPTION_MAX_LENGTH} characters`,
    )
    .optional(),
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
