import { User } from "lucide-react";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/api/users/auth`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/api/users`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `/api/users/logout`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (params) => ({
        url: `/api/users/profile/${params.id}`,
        method: "PUT",
        body: {
          name: params.name,
          email: params.email,
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateProfilePic: builder.mutation({
      query: (formData) => ({
        url: `/api/users/profile/picture`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query({
      query: (id) => `/api/users/profile/${id}`,
      providesTags: ["User"],
    }),
    submitInquiry: builder.mutation({
      query: (data) => ({
        url: `/api/users/submitInquiry`,
        method: "POST",
        body: data,
      }),
    }),
    savePicture: builder.mutation({
      query: (data) => ({
        url: `/api/users/save-picture`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Picture"],
    }),
    unsavePicture: builder.mutation({
      query: (data) => ({
        url: `/api/users/unsave-picture`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Picture"],
    }),
    getSavePictures: builder.query({
      query: () => `/api/users/get-savePics`,
      providesTags: ["Picture"],
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
  useUnsavePictureMutation,
  useGetSavePicturesQuery,
} = userApiSlice;
