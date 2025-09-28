// Endpoints de configuración para la API

export const usersEP = {
  getall: "/users/all",
  getById: "/users/",
  // getMe: "/users/me",
  post: "/users/create",
  put: "/users/update/",
  delete: "/users/delete/",
  login: "/auth/login",
  logout: "/auth/logout",
};

export const couponsEP = {
  getall: "/coupons/all",
  getById: "/coupons/getone/",
  post: "/coupons/create",
  put: "/coupons/update/",
  delete: "/coupons/delete/",
  getByStatus: "/coupons/status/",
  getByDateRange: "/coupons/date-range",
  redeem: "/coupons/redeem"
};
