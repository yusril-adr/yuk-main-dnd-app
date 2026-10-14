import CONFIG from "@/common/constants/config";

// The deployed API can hang, so server-side metadata/sitemap calls give up fast
export const MAIN_SERVER_FETCH_TIMEOUT_MS = 3000;

type TMainServerGetOptions = {
  params?: Record<string, string | number | undefined>;
  // Seconds to cache in the Next data cache
  revalidate?: number;
  timeoutMs?: number;
};

// Server-only GET without the browser axios interceptors (cookies, toasts,
// logout). Returns null on any failure, timeout or non-2xx response
export async function mainServerGet<T>(
  path: string,
  {
    params,
    revalidate = 3600,
    timeoutMs = MAIN_SERVER_FETCH_TIMEOUT_MS,
  }: TMainServerGetOptions = {},
): Promise<T | null> {
  if (!CONFIG.MAIN_API_BASE_URL) return null;
  try {
    const url = new URL(path, CONFIG.MAIN_API_BASE_URL);
    for (const [key, value] of Object.entries(params ?? {})) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
      next: { revalidate },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
