import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exportInquiryApi = createApi({
    reducerPath: "exportInquiryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/export-inquiry`,
        credentials: "include",
    }),
    tagTypes: ["ExportInquiry"],

    endpoints: (builder) => ({

        // 🔹 Submit Export Inquiry (POST /)
        submitExportInquiry: builder.mutation({
            query: (inquiryData) => ({
                url: "/",
                method: "POST",
                body: inquiryData,
            }),
            invalidatesTags: ["ExportInquiry"],
        }),

        // 🔹 Get All Export Inquiries (GET /)
        getAllExportInquiries: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["ExportInquiry"],
        }),

        // 🔹 Delete Export Inquiry (DELETE /:id)
        deleteExportInquiry: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ExportInquiry"],
        }),

    }),
});

export const {
    useSubmitExportInquiryMutation,
    useGetAllExportInquiriesQuery,
    useDeleteExportInquiryMutation,
} = exportInquiryApi;