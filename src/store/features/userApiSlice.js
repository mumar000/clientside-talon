import { User } from "lucide-react";
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
    updateProfile: builder.mutation({
      query: (params) => ({
        url: `${USER_URL}/api/users/profile/${params.id}`,
        method: "PUT",
        body: {
          name: params.name,
          email: params.email,
        },
      }),
    }),
    updateProfilePic: builder.mutation({
      query: (formData) => ({
        url: `${USER_URL}/api/users/profile/picture`,
        method: "POST",
        body: formData,
      }),
    }),
    getProfile: builder.query({
      query: (id) => `${USER_URL}/api/users/profile/${id}`,
    }),
    submitInquiry: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/api/users/submitInquiry`,
        method: "POST",
        body: data,
      }),
    }),
    savePicture: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/api/users/save-picture`,
        method: "POST",
        body: data,
      }),
    }),
    getSavePictures: builder.query({
      query: () => `${USER_URL}/api/users/get-savePics`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpdateProfilePicMutation,
  useGetProfileQuery,
  useSubmitInquiryMutation,
  useSavePictureMutation,
  useGetSavePicturesQuery,
} = userApiSlice;
