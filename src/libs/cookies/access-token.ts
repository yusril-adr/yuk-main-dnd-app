import CONFIG from "@/common/constants/config";

const COOKIE_OPTIONS = "path=/; max-age=604800; SameSite=Lax";

const AccessToken = {
  get(): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${CONFIG.COOKIE.ACCESS_TOKEN_KEY}=([^;]*)`),
    );
    return match ? decodeURIComponent(match[1]) : null;
  },

  set(accessToken: string): void {
    document.cookie = `${CONFIG.COOKIE.ACCESS_TOKEN_KEY}=${encodeURIComponent(accessToken)}; ${COOKIE_OPTIONS}`;
  },

  remove(): void {
    document.cookie = `${CONFIG.COOKIE.ACCESS_TOKEN_KEY}=; path=/; max-age=0`;
  },
};

export default AccessToken;
