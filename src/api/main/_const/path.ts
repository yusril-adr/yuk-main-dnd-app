const MAIN_API_PATH = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    ME: "/api/v1/auth/me",
    SWITCH_ROLE: "/api/v1/auth/switch-role",
    PROFILE: "/api/v1/auth/profile",
    PASSWORD: "/api/v1/auth/password",
  },
  FILE: {
    UPLOAD: "/api/v1/files/upload",
  },
  MASTER: {
    IAM: {
      USER: {
        DEFAULT: "/api/v1/master/iam/users",
        DETAIL: (id: string) => `/api/v1/master/iam/users/${id}`,
      },
      ROLE: {
        DEFAULT: "/api/v1/master/iam/roles",
        DETAIL: (id: string) => `/api/v1/master/iam/roles/${id}`,
      },
      PERMISSION: {
        DEFAULT: "/api/v1/master/iam/permissions",
        FULL: "/api/v1/master/iam/permissions/full",
      },
    },
    STORY: {
      DEFAULT: "/api/v1/master/stories",
      DETAIL: (id: string) => `/api/v1/master/stories/${id}`,
      ARCHIVE: (id: string) => `/api/v1/master/stories/${id}/archive`,
      PUBLISH: (id: string) => `/api/v1/master/stories/${id}/publish`,
      UNARCHIVE: (id: string) => `/api/v1/master/stories/${id}/unarchive`,
      MEMBERS: (id: string) => `/api/v1/master/stories/${id}/members`,
      AVAILABLE_USERS: (id: string) =>
        `/api/v1/master/stories/${id}/available-users`,
    },
  },
};

export default MAIN_API_PATH;
