const MAIN_API_PATH = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    ME: "/api/v1/auth/me",
    SWITCH_ROLE: "/api/v1/auth/switch-role",
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
  },
};

export default MAIN_API_PATH;
