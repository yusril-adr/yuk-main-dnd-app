/**
 * Maps an empty or whitespace-only form value to `null` so the API clears the
 * field. Use it on edit forms for nullable fields; omitting the key instead
 * would leave the stored value unchanged.
 */
export function emptyToNull(value: string | null | undefined): string | null {
  return value?.trim() ? value : null;
}
