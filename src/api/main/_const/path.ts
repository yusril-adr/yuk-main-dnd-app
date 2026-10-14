const MAIN_API_PATH = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    ME: "/api/v1/auth/me",
    ME_EXPERIENCE_POINTS: "/api/v1/auth/me/experience-points",
    ME_POINTS: "/api/v1/auth/me/points",
    SWITCH_ROLE: "/api/v1/auth/switch-role",
    PROFILE: "/api/v1/auth/profile",
    PASSWORD: "/api/v1/auth/password",
  },
  STORY: {
    DEFAULT: "/api/v1/stories",
    // Detail and members accept the story id (UUID) or its slug
    DETAIL: (identifier: string) => `/api/v1/stories/${identifier}`,
    MEMBERS: (identifier: string) => `/api/v1/stories/${identifier}/members`,
    // Join and cancel-join take the id only
    JOIN: (id: string) => `/api/v1/stories/${id}/join`,
    CANCEL_JOIN: (id: string) => `/api/v1/stories/${id}/cancel-join`,
  },
  USER: {
    // Public guildmates list; search matches username or display name
    DEFAULT: "/api/v1/users",
    TOP_DM_EXPERIENCE: "/api/v1/users/top-dm-experience",
    TOP_PLAYER_EXPERIENCE: "/api/v1/users/top-player-experience",
    // Detail and story lists accept the username or the user id
    DETAIL: (identifier: string) =>
      `/api/v1/users/${encodeURIComponent(identifier)}`,
    CREATED_STORIES: (identifier: string) =>
      `/api/v1/users/${encodeURIComponent(identifier)}/created-stories`,
    JOINED_STORIES: (identifier: string) =>
      `/api/v1/users/${encodeURIComponent(identifier)}/joined-stories`,
  },
  BOARD: {
    STORY: {
      // Player board: stories the logged-in user is a member of
      DEFAULT: "/api/v1/board/stories",
      // Detail and members 404 unless the caller is a member
      DETAIL: (id: string) => `/api/v1/board/stories/${id}`,
      MEMBERS: (id: string) => `/api/v1/board/stories/${id}/members`,
    },
  },
  FILE: {
    UPLOAD: "/api/v1/files/upload",
  },
  MASTER: {
    IAM: {
      USER: {
        DEFAULT: "/api/v1/master/iam/users",
        OPTIONS: "/api/v1/master/iam/users/options",
        DETAIL: (id: string) => `/api/v1/master/iam/users/${id}`,
        EXPERIENCE_POINTS: (id: string) =>
          `/api/v1/master/iam/users/${id}/experience-points`,
        POINTS: (id: string) => `/api/v1/master/iam/users/${id}/points`,
      },
      ROLE: {
        DEFAULT: "/api/v1/master/iam/roles",
        OPTIONS: "/api/v1/master/iam/roles/options",
        DETAIL: (id: string) => `/api/v1/master/iam/roles/${id}`,
      },
      PERMISSION: {
        DEFAULT: "/api/v1/master/iam/permissions",
        OPTIONS: "/api/v1/master/iam/permissions/options",
      },
    },
    STORY: {
      DEFAULT: "/api/v1/master/stories",
      DETAIL: (id: string) => `/api/v1/master/stories/${id}`,
      ARCHIVE: (id: string) => `/api/v1/master/stories/${id}/archive`,
      PUBLISH: (id: string) => `/api/v1/master/stories/${id}/publish`,
      UNARCHIVE: (id: string) => `/api/v1/master/stories/${id}/unarchive`,
      CANCEL: (id: string) => `/api/v1/master/stories/${id}/cancel`,
      COMPLETE: (id: string) => `/api/v1/master/stories/${id}/complete`,
      MEMBERS: (id: string) => `/api/v1/master/stories/${id}/members`,
      AVAILABLE_USERS: (id: string) =>
        `/api/v1/master/stories/${id}/available-users`,
    },
  },
};

export default MAIN_API_PATH;
