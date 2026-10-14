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
      USER: {
        ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "public-user"],
        TOP_DM: () => [...CONFIG.QUERY_KEY.MAIN_API.USER.ALL(), "top-dm"],
        TOP_PLAYER: () => [
          ...CONFIG.QUERY_KEY.MAIN_API.USER.ALL(),
          "top-player",
        ],
        DETAIL: () => [...CONFIG.QUERY_KEY.MAIN_API.USER.ALL(), "detail"],
        CREATED_STORIES: () => [
          ...CONFIG.QUERY_KEY.MAIN_API.USER.ALL(),
          "created-stories",
        ],
        JOINED_STORIES: () => [
          ...CONFIG.QUERY_KEY.MAIN_API.USER.ALL(),
          "joined-stories",
        ],
      },
      STORY: {
        ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "public-story"],
        MEMBER: {
          ALL: () => [
            ...CONFIG.QUERY_KEY.MAIN_API.STORY.ALL(),
            "public-story-member",
          ],
        },
      },
      BOARD: {
        STORY: {
          ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "board-story"],
          MEMBER: {
            ALL: () => [
              ...CONFIG.QUERY_KEY.MAIN_API.BOARD.STORY.ALL(),
              "board-story-member",
            ],
          },
        },
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
