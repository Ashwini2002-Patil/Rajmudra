import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
    reducerPath: "galleryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/gallery`,
        credentials: "include",
    }),
    tagTypes: ["Gallery"],

    endpoints: (builder) => ({

        // 🔹 Add Gallery Item (POST /)
        createGalleryItem: builder.mutation({
            query: (galleryData) => ({
                url: "/",
                method: "POST",
                body: galleryData,
            }),
            invalidatesTags: ["Gallery"],
        }),

        // 🔹 Get All Gallery Items (GET /?category=)
        getAllGalleryItems: builder.query({
            query: (category) => ({
                url: category ? `/?category=${category}` : "/",
                method: "GET",
            }),
            providesTags: ["Gallery"],
        }),

        // 🔹 Delete Gallery Item (DELETE /:id)
        deleteGalleryItem: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Gallery"],
        }),

    }),
});

export const {
    useCreateGalleryItemMutation,
    useGetAllGalleryItemsQuery,
    useDeleteGalleryItemMutation,
} = galleryApi;