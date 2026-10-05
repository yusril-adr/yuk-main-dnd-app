import type { TUserMeResponse } from "@/api/main/modules/auth/me/types/user-me-response";
import type { TStoryResponse } from "@/api/main/modules/master/stories/types/story-response";
import type { PermissionEnum } from "@/common/enums/permission";

// A story can be updated / deleted with the permission, or by its creator
export function canManageStory(
  auth: TUserMeResponse | null | undefined,
  story: Pick<TStoryResponse, "created_by"> | null | undefined,
  permission: PermissionEnum.STORIES_UPDATE | PermissionEnum.STORIES_DELETE,
): boolean {
  if (!auth) {
    return false;
  }

  if (auth.permissions.includes(permission)) {
    return true;
  }

  return !!story?.created_by && story.created_by.id === auth.id;
}
