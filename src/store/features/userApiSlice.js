import { apiSlice } from "./apiSlice";
const USER_URL = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_URI
  : import.meta.env.VITE_DEPLOYED_URI;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/api/users/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/api/users`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => `${USER_URL}/profile`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = userApiSlice;
