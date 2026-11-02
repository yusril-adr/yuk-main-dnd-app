"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/_components/ui/input-group";
import { useT } from "@/app/_hooks/use-t";
import { GUILDMATES_MESSAGES } from "@/app/(public)/guildmates/_messages";
import type { TPublicGuildmateSearchProps } from "@/app/(public)/guildmates/_types/public-guildmate-components-props";

export default function PublicGuildmateSearch({
  search,
  onSearchChange,
}: TPublicGuildmateSearchProps) {
  const { t } = useT(GUILDMATES_MESSAGES);
  // Freeze the initial value: changing defaultValue on an uncontrolled
  // Base UI input after mount triggers a FieldControl warning
  const [initialSearch] = useState(search);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      // Same rule as stories: wait for 3 characters, or clear
      if (value && value.length < 3) {
        return;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onSearchChange(value);
      }, 300);
    },
    [onSearchChange],
  );

  return (
    <InputGroup className="h-11 rounded-md bg-card">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={t("search.placeholder")}
        aria-label={t("search.ariaLabel")}
        onChange={(event) => handleSearchChange(event.target.value)}
        defaultValue={initialSearch}
      />
    </InputGroup>
  );
}
