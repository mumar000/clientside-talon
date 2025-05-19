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
        url: `${USER_URL}api/users/logout`,
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: (id) => `${USER_URL}/api/users/profile/:${id}`,
    }),
    submitInquiry: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/api/users/submitInquiry`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useSubmitInquiryMutation,
} = userApiSlice;
