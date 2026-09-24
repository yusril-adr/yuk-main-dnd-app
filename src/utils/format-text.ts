function normalizeWords(value: string): string[] {
  return value
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

export function toTitleCase(value: string): string {
  return normalizeWords(value)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function toSentenceCase(value: string): string {
  const normalizedValue = normalizeWords(value).join(" ");

  return normalizedValue.replace(/^\w/, (character) =>
    character.toUpperCase(),
  );
}
