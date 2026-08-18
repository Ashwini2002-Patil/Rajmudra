import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const oemInquiryApi = createApi({
    reducerPath: "oemInquiryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/oem-inquiry`,
        credentials: "include",
    }),
    tagTypes: ["OEMInquiry"],

    endpoints: (builder) => ({

        // 🔹 Submit OEM / Private Label Inquiry (POST /)
        submitOEMInquiry: builder.mutation({
            query: (inquiryData) => ({
                url: "/",
                method: "POST",
                body: inquiryData,
            }),
            invalidatesTags: ["OEMInquiry"],
        }),

        // 🔹 Get All OEM Inquiries (GET /)
        getAllOEMInquiries: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["OEMInquiry"],
        }),

        // 🔹 Delete OEM Inquiry (DELETE /:id)
        deleteOEMInquiry: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["OEMInquiry"],
        }),

    }),
});

export const {
    useSubmitOEMInquiryMutation,
    useGetAllOEMInquiriesQuery,
    useDeleteOEMInquiryMutation,
} = oemInquiryApi;