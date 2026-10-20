import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Locale-aware wrappers: links keep the /id prefix on public pages
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
