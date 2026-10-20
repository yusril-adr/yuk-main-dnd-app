import { CalendarDays, Kayak, Scale, Swords } from "lucide-react";

// `key` is the label in appTopbar.nav (app-topbar/_messages)
const NAV_ROUTES = [
  { key: "guildmates", href: "/guildmates", icon: Kayak },
  { key: "stories", href: "/stories", icon: Swords },
  { key: "events", href: "/events", icon: CalendarDays },
  { key: "goods", href: "/goods", icon: Scale },
] as const;

export default NAV_ROUTES;
