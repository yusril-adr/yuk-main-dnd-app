const REQUESTOR_API_PATH = {
  USER: {
    DEFAULT: "/api/v1/users",
    DETAIL: (id: string) => `/api/v1/users/${id}`,
  },

  REQUEST: {
    DEFAULT: "/api/v1/requests",
    DETAIL: (id: string) => `/api/v1/requests/${id}`,
  },

  AUDIT_LOG: {
    DEFAULT: "/api/v1/audit-logs",
  },
};

export default REQUESTOR_API_PATH;
