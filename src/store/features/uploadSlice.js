import { apiSlice } from "./apiSlice";

const UPLOAD_URL = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_URI
  : import.meta.env.VITE_DEPLOYED_URI;

export const uploadAPiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadBulk: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/api/upload/upload-pictures`,
        method: "POST",
        body: data,
      }),
    }),
    getCategorySlug: builder.query({
      query: (slug) => `${UPLOAD_URL}/api/upload/getCategory/${slug}`,
    }),
    getPictures: builder.query({
      query: () => `${UPLOAD_URL}/api/upload/getPictures`,
    }),
    getPicByCategory: builder.query({
      query: (category) => `${UPLOAD_URL}/api/upload/pictures/${category}`,
    }),
  }),
});

export const {
  useUploadBulkMutation,
  useGetPicturesQuery,
  useGetPicByCategoryQuery,
  useGetCategorySlugQuery,
} = uploadAPiSlice;
