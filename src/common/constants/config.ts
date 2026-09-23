const CONFIG = {
  MAIN_API_BASE_URL: process.env.NEXT_PUBLIC_MAIN_API_BASE_URL,
  REQUESTOR_API_BASE_URL: process.env.NEXT_PUBLIC_REQUESTOR_API_BASE_URL,

  IS_USING_THEME_TOGGLER:
    process.env.NEXT_PUBLIC_NEXT_IS_USING_THEME_TOGGLER === "true",

  COOKIE: {
    ACCESS_TOKEN_KEY: "access_token",
  },

  QUERY_KEY: {
    REQUESTOR_API: {
      ALL: () => ["main"],
      AUTH: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "auth"],
        ME: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.AUTH.ALL(), "me"],
      },
      USER: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "user"],
      },
      REQUEST: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "request"],
      },
      AUDIT_LOG: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "audit-log"],
      },
      PERMISSION: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "permission"],
      },
    },
  },
};

export default CONFIG;
