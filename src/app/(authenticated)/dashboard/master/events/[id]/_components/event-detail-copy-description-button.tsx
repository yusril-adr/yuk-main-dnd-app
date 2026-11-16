"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/app/_components/ui/button";
import { useT } from "@/app/_hooks/use-t";
import type { TEventDetailCopyDescriptionButtonProps } from "@/app/(authenticated)/dashboard/master/events/[id]/_types/event-detail-copy-description-button-props";
import { MASTER_EVENT_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/events/[id]/_messages";

// Copies the stored description as-is (Markdown or HTML)
export default function EventDetailCopyDescriptionButton({
  description,
}: TEventDetailCopyDescriptionButtonProps) {
  const { t } = useT(MASTER_EVENT_DETAIL_MESSAGES);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      toast.success(t("description.copySuccess"));
    } catch {
      toast.error(t("description.copyError"));
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={t("description.copyAria")}
      title={t("description.copyTitle")}
      onClick={onCopy}
    >
      <Copy />
    </Button>
  );
}
