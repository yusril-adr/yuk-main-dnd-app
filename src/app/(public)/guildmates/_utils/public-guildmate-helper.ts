const numberFormatter = new Intl.NumberFormat("en-US");

export function formatExp(value: number) {
  return numberFormatter.format(value ?? 0);
}
