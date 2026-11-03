import { cn } from "cn";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";
import type { TPublicAvatarProps } from "@/app/(public)/_types/public-avatar-props";

export default function PublicAvatar({
  name,
  avatarUrl,
  className,
}: TPublicAvatarProps) {
  return (
    <Avatar className={cn("size-12", className)}>
      <AvatarImage
        src={avatarUrl || makeDefaultAvatarUrl(name)}
        alt={name}
        loading="lazy"
      />
      <AvatarFallback>{getInitials(name || "?")}</AvatarFallback>
    </Avatar>
  );
}
