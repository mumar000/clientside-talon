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
      async onQueryStarted(
        { categoryId, pictureUrl },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getSavePictures",
            undefined,
            (draft) => {
              if (!draft.pictures) {
                draft.pictures = [];
              }

              let existingCategoryEntry = draft.pictures.find(
                (entry) => entry.categoryId === categoryId
              );

              if (existingCategoryEntry) {
                if (!existingCategoryEntry.pictureUrl.includes(pictureUrl)) {
                  existingCategoryEntry.pictureUrl.push(pictureUrl);
                }
              } else {
                draft.pictures.push({
                  categoryId,
                  pictureUrl: [pictureUrl],
                });
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error("Optimistic savePicture failed, reverting UI:", error);
        }
      },
    }),

    unsavePicture: builder.mutation({
      query: (data) => ({
        url: `/api/users/unsave-picture`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Picture"],
      async onQueryStarted(
        { categoryId, pictureUrl },
        { dispatch, queryFulfilled }
      ) {
        // Optimistically update the 'getSavePictures' query's cached data
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getSavePictures",
            undefined, // The argument to 'getSavePictures' (it takes no arguments, so 'undefined')
            (draft) => {
              if (!draft.pictures) {
                return; // Nothing to unsave if pictures array doesn't exist
              }

              let existingCategoryEntry = draft.pictures.find(
                (entry) => entry.categoryId === categoryId
              );

              if (existingCategoryEntry) {
                // Filter out the pictureUrl from the specific category's array
                existingCategoryEntry.pictureUrl =
                  existingCategoryEntry.pictureUrl.filter(
                    (url) => url !== pictureUrl
                  );

                // Optional: If this category's pictureUrl array becomes empty,
                // you might want to remove the category entry itself from `draft.pictures`
                if (existingCategoryEntry.pictureUrl.length === 0) {
                  draft.pictures = draft.pictures.filter(
                    (entry) => entry.categoryId !== categoryId
                  );
                }
              }
            }
          )
        );

        try {
          await queryFulfilled; // Wait for the actual API call to finish
          // If successful, no need to do anything, the UI is already updated.
        } catch (error) {
          patchResult.undo(); // If the API call fails, revert the optimistic change
          console.error(
            "Optimistic unsavePicture failed, reverting UI:",
            error
          );
          // You might trigger a toast error from the component's catch block.
        }
      },
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
