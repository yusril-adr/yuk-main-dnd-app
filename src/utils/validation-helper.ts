import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function applyValidationErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  errors: {
    property: string;
    messages: string[];
  }[],
) {
  errors.forEach((error) => {
    setError(error.property as Path<T>, {
      type: "server",
      message: error.messages[0],
    });
  });
}

// String length the way the API's class-validator @MaxLength counts it
// (validator.js isLength): an emoji made of a surrogate pair counts 1 and a
// variation selector (U+FE0E / U+FE0F) after a character counts 0. Use it for
// client limits that must match an API @MaxLength exactly
export function getApiStringLength(value: string): number {
  const presentationSequences =
    value.match(/[^\uFE0F\uFE0E][\uFE0F\uFE0E]/g)?.length ?? 0;
  const surrogatePairs =
    value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)?.length ?? 0;
  return value.length - presentationSequences - surrogatePairs;
}
