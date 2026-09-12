const CONFIG = {
  MAIN_API_BASE_URL: process.env.NEXT_PUBLIC_MAIN_API_BASE_URL,

  COOKIE: {
    ACCESS_TOKEN_KEY: "access_token",
  },

  QUERY_KEY: {
    MAIN_API: {
      ALL: () => ["main"],
      AUTH: {
        ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "auth"],
        ME: () => [...CONFIG.QUERY_KEY.MAIN_API.AUTH.ALL(), "me"],
      },
      USER: {
        ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "user"],
      },
      REQUEST: {
        ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "request"],
      },
      AUDIT_LOG: {
        ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "audit-log"],
      },
    },
  },
};

export default CONFIG;
