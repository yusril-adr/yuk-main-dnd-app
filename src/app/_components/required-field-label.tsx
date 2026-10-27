import { FieldLabel } from "@/app/_components/ui/field";
import type { TRequiredFieldLabelProps } from "@/app/_types/required-field-label-props";

// Drop-in FieldLabel that shows a red "*" when `required` is set
export default function RequiredFieldLabel({
  required = false,
  children,
  ...props
}: TRequiredFieldLabelProps) {
  return (
    <FieldLabel {...props}>
      {children}
      {required && (
        <span aria-hidden="true" className="-ms-1 text-destructive">
          *
        </span>
      )}
    </FieldLabel>
  );
}
