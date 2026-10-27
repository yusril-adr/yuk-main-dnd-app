// Unset or not a number -> fallback (0 is kept: always stale)
const STALE_IN_MS = Number(process.env.NEXT_PUBLIC_REACT_QUERY_STALE_IN_MS);

const CONFIG = {
  MAIN_API_BASE_URL: process.env.NEXT_PUBLIC_MAIN_API_BASE_URL,

  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  MANUAL_URL:
    process.env.NEXT_PUBLIC_MANUAL_URL ||
    "https://yusril-adr.github.io/yuk-main-dnd-manual/",

  IS_USING_THEME_TOGGLER:
    process.env.NEXT_PUBLIC_IS_USING_THEME_TOGGLER === "true",

  COOKIE: {
    ACCESS_TOKEN_KEY: "access_token",
  },

  REACT_QUERY_STALE_IN_MS:
    process.env.NEXT_PUBLIC_REACT_QUERY_STALE_IN_MS &&
    Number.isFinite(STALE_IN_MS)
      ? STALE_IN_MS
      : 1000 * 30, // 30 seconds

  QUERY_KEY: {
    MAIN_API: {
      ALL: () => ["main"],
      AUTH: {
        ALL: () => [...CONFIG.QUERY_KEY.MAIN_API.ALL(), "auth"],
        ME: () => [...CONFIG.QUERY_KEY.MAIN_API.AUTH.ALL(), "me"],
        ME_EXPERIENCE_POINTS: () => [
          ...CONFIG.QUERY_KEY.MAIN_API.AUTH.ME(),
          "experience-points",
        ],
        ME_POINTS: () => [...CONFIG.QUERY_KEY.MAIN_API.AUTH.ME(), "points"],
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
        COMMENT: {
          ALL: () => [
            ...CONFIG.QUERY_KEY.MAIN_API.STORY.ALL(),
            "public-story-comment",
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
  },
};

export default CONFIG;
