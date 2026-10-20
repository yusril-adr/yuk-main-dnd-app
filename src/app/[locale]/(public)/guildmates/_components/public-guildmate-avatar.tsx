import { cn } from "cn";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

export default function PublicGuildmateAvatar({
  name,
  avatarUrl,
  className,
}: {
  name: string;
  avatarUrl: string | null;
  className?: string;
}) {
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
