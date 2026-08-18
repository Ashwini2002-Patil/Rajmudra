import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/products`,
        credentials: "include",
    }),
    tagTypes: ["Product"],

    endpoints: (builder) => ({

        // 🔹 Create Product (POST /)
        createProduct: builder.mutation({
            query: (productData) => ({
                url: "/",
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),

        // 🔹 Get All Products (GET /?category=)
        getAllProducts: builder.query({
            query: (category) => ({
                url: category ? `/?category=${category}` : "/",
                method: "GET",
            }),
            providesTags: ["Product"],
        }),

        // 🔹 Get Product By ID (GET /:id)
        getProductById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
        }),

        // 🔹 Update Product (PUT /:id)
        updateProduct: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),

        // 🔹 Delete Product (DELETE /:id)
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),

    }),
});

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;