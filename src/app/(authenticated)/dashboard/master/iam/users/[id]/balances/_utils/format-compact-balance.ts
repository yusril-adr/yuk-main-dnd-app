const UNITS = [
  { threshold: 1_000_000_000, suffix: "b" },
  { threshold: 1_000_000, suffix: "m" },
  { threshold: 1_000, suffix: "k" },
] as const;

export function formatCompactBalance(value: number): string {
  if (!Number.isFinite(value)) return "-";
  if (Math.abs(value) < 1000) return value.toLocaleString();

  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  let unitIndex = UNITS.findIndex((unit) => abs >= unit.threshold);
  let rounded = Math.round((abs / UNITS[unitIndex].threshold) * 10) / 10;
  if (rounded >= 1000 && unitIndex > 0) {
    unitIndex -= 1;
    rounded = Math.round((abs / UNITS[unitIndex].threshold) * 10) / 10;
  }
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${sign}${text}${UNITS[unitIndex].suffix}`;
}
