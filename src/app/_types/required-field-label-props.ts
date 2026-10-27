import type { ComponentProps } from "react";

import type { FieldLabel } from "@/app/_components/ui/field";

export type TRequiredFieldLabelProps = ComponentProps<typeof FieldLabel> & {
  // Appends a visual "*". Decorative only: mark the control itself with
  // aria-required so screen readers announce it
  required?: boolean;
};
