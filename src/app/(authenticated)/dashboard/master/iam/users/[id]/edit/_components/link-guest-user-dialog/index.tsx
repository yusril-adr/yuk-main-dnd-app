"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/app/_components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/app/_components/ui/field";
import { Spinner } from "@/app/_components/ui/spinner";
import { useT } from "@/app/_hooks/use-t";
import { useGetUserOptions } from "@/app/(authenticated)/dashboard/master/iam/users/_hooks/use-get-user-options";
import { MASTER_USERS_EDIT_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/edit/_messages";
import type { TLinkGuestUserDialogProps } from "../../_types/link-guest-user-dialog-props";

type TUserItem = { value: string; label: string };

export default function LinkGuestUserDialog({
  guestId,
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: TLinkGuestUserDialogProps) {
  const { t } = useT(MASTER_USERS_EDIT_MESSAGES);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<TUserItem | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const { data: usersData, isLoading: isUsersLoading } = useGetUserOptions(
    search || undefined,
    { enabled: open },
  );

  const userItems = useMemo((): TUserItem[] => {
    const items =
      usersData?.data?.data?.items
        .filter((user) => !user.is_guest && user.id !== guestId)
        .map((user) => ({
          value: user.id,
          label: user.display_name,
        })) ?? [];

    if (selected && !items.some((item) => item.value === selected.value)) {
      return [selected, ...items];
    }
    return items;
  }, [usersData, guestId, selected]);

  const resetState = useCallback(() => {
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = undefined;
    setSearch("");
    setSelected(null);
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        resetState();
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetState],
  );

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearch(value);
    }, 300);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selected) return;
    onConfirm(selected.value);
  }, [onConfirm, selected]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("link.title")}</DialogTitle>
          <DialogDescription>{t("link.description")}</DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field className="grid gap-2">
            <FieldLabel htmlFor="link-guest-user">
              {t("link.userLabel")}
            </FieldLabel>
            <Combobox
              id="link-guest-user"
              items={userItems}
              value={selected}
              onValueChange={(item) => setSelected(item ?? null)}
              onInputValueChange={handleSearchChange}
              itemToStringLabel={(item) => item.label}
              disabled={isPending}
            >
              <ComboboxInput
                placeholder={t("link.userPlaceholder")}
                showClear
                disabled={isPending}
              />
              <ComboboxContent>
                <ComboboxEmpty>
                  {isUsersLoading ? <Spinner /> : t("link.noUsersFound")}
                </ComboboxEmpty>
                <ComboboxList>
                  {(item: TUserItem) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
        </FieldGroup>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            {t("link.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isPending || !selected}
            onClick={handleConfirm}
          >
            {t("link.confirm")}
            {isPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
