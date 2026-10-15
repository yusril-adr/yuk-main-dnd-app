"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Item, ItemActions, ItemContent } from "@/app/_components/ui/item";

import HomeGuildPhotoPagination from "@/app/(public)/_components/home-guild-photo-pagination";

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
            <Item
              size="xs"
              className="flex-col items-stretch gap-2 p-0 px-1 sm:flex-row sm:items-center sm:justify-between"
            >
              <ItemContent className="min-w-0">
                <DialogDescription className="text-center sm:truncate sm:text-start">
                  {photo.caption ?? photo.alt}
                </DialogDescription>
              </ItemContent>
              {viewable.length > 1 && (
                <ItemActions className="justify-center">
                  <HomeGuildPhotoPagination
                    page={position + 1}
                    pageCount={viewable.length}
                    onPageChange={(page) =>
                      onOpenIndexChange(viewable[page - 1])
                    }
                  />
                </ItemActions>
              )}
            </Item>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
