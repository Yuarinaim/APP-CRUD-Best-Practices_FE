import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api",
    // headers: { "content-type": "application/json" },
    prepareHeaders: (headers, { getState, endpoint }) => {
      return headers;
    },
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: [
    "Users",
    "Coupons",
  ],
  endpoints: () => ({}),
});
