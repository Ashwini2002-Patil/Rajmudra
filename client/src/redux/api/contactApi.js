import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/contact`,
        credentials: "include",
    }),
    tagTypes: ["Contact"],

    endpoints: (builder) => ({

        // 🔹 Submit Contact Form (POST /)
        submitContact: builder.mutation({
            query: (contactData) => ({
                url: "/",
                method: "POST",
                body: contactData,
            }),
            invalidatesTags: ["Contact"],
        }),

        // 🔹 Get All Contact Messages (GET /)
        getAllContacts: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["Contact"],
        }),

        // 🔹 Delete Contact Message (DELETE /:id)
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Contact"],
        }),

    }),
});

export const {
    useSubmitContactMutation,
    useGetAllContactsQuery,
    useDeleteContactMutation,
} = contactApi;