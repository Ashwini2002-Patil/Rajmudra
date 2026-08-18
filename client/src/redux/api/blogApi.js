import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/blogs`,
        credentials: "include",
    }),
    tagTypes: ["Blog"],

    endpoints: (builder) => ({

        // 🔹 Create Blog (POST /)
        createBlog: builder.mutation({
            query: (blogData) => ({
                url: "/",
                method: "POST",
                body: blogData,
            }),
            invalidatesTags: ["Blog"],
        }),

        // 🔹 Get All Published Blogs (GET /)
        getAllBlogs: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["Blog"],
        }),

        // 🔹 Get Blog By Slug (GET /:slug)
        getBlogBySlug: builder.query({
            query: (slug) => ({
                url: `/${slug}`,
                method: "GET",
            }),
        }),

        // 🔹 Update Blog (PUT /:id)
        updateBlog: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Blog"],
        }),

        // 🔹 Delete Blog (DELETE /:id)
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),

    }),
});

export const {
    useCreateBlogMutation,
    useGetAllBlogsQuery,
    useGetBlogBySlugQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;