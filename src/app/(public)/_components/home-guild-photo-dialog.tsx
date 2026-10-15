"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog";

import type { THomeGuildPhotoDialogProps } from "@/app/(public)/_types/home-components-props";

// Enlarged, uncropped guild photo with simple prev/next between real photos
export default function HomeGuildPhotoDialog({
  photos,
  openIndex,
  onOpenIndexChange,
}: THomeGuildPhotoDialogProps) {
  const photo = openIndex === null ? null : photos[openIndex];
  const viewable = photos
    .map((item, index) => (item.src ? index : -1))
    .filter((index) => index >= 0);
  const position = openIndex === null ? -1 : viewable.indexOf(openIndex);

  const step = (delta: number) => {
    if (position < 0) return;
    const next = (position + delta + viewable.length) % viewable.length;
    onOpenIndexChange(viewable[next]);
  };

  return (
    <Dialog
      open={!!photo?.src}
      onOpenChange={(open) => {
        if (!open) onOpenIndexChange(null);
      }}
    >
      <DialogContent
        className="w-auto max-w-[94vw] gap-3 p-2 sm:max-w-5xl sm:p-3"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
      >
        {photo?.src && (
          <>
            <DialogTitle className="sr-only">
              {photo.caption ?? "Guild photo"}
            </DialogTitle>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 1024px, 94vw"
              className="h-auto max-h-[78svh] w-auto max-w-full rounded-md object-contain sm:max-h-[85svh]"
            />
            <div className="flex items-center justify-between gap-2 pe-1">
              <DialogDescription className="min-w-0 truncate ps-1">
                {photo.caption ?? photo.alt}
              </DialogDescription>
              {viewable.length > 1 && (
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Previous photo"
                    onClick={() => step(-1)}
                  >
                    <ChevronLeft />
                  </Button>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {position + 1} / {viewable.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label="Next photo"
                    onClick={() => step(1)}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
