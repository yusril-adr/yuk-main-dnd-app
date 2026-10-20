// Full number in the page locale: 12,345 (en) / 12.345 (id)
export function formatExp(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value ?? 0);
}
