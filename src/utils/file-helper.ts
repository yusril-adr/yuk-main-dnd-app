const BYTES_PER_MB = 1024 * 1024;

/** Formats a byte limit for display, e.g. 3145728 -> "3 MB". */
export function formatFileSize(bytes: number): string {
  const mb = bytes / BYTES_PER_MB;
  return `${Number.isInteger(mb) ? mb : mb.toFixed(1)} MB`;
}
