const CONFIG = {
  MAIN_API_BASE_URL: process.env.NEXT_PUBLIC_MAIN_API_BASE_URL,
  REQUESTOR_API_BASE_URL: process.env.NEXT_PUBLIC_REQUESTOR_API_BASE_URL,

  IS_USING_THEME_TOGGLER:
    process.env.NEXT_PUBLIC_NEXT_IS_USING_THEME_TOGGLER === "true",

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
      MASTER: {
        IAM: {
          USER: {
            ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "user"],
          },
          ROLE: {
            ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "role"],
          },
          PERMISSION: {
            ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "permission"],
          },
        },
        STORY: {
          ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "story"],
        },
      },
    },
    REQUESTOR_API: {
      ALL: () => ["requestor"],
      USER: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "user"],
      },
      REQUEST: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "request"],
      },
      AUDIT_LOG: {
        ALL: () => [...CONFIG.QUERY_KEY.REQUESTOR_API.ALL(), "audit-log"],
      },
    },
  },
};

export default CONFIG;
