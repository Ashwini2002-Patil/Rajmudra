import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const showcaseProductApi = createApi({
    reducerPath: "showcaseProductApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/showcase-products`,
        credentials: "include",
    }),
    tagTypes: ["ShowcaseProduct"],

    endpoints: (builder) => ({

        // 🔹 Add Showcase Product (POST /)
        createShowcaseProduct: builder.mutation({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ShowcaseProduct"],
        }),

        // 🔹 Get All Showcase Products (GET /)
        getAllShowcaseProducts: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["ShowcaseProduct"],
        }),

        // 🔹 Delete Showcase Product (DELETE /:id)
        deleteShowcaseProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ShowcaseProduct"],
        }),

    }),
});

export const {
    useCreateShowcaseProductMutation,
    useGetAllShowcaseProductsQuery,
    useDeleteShowcaseProductMutation,
} = showcaseProductApi;
