import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sampleRequestApi = createApi({
    reducerPath: "sampleRequestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/sample-request`,
        credentials: "include",
    }),
    tagTypes: ["SampleRequest"],

    endpoints: (builder) => ({

        // 🔹 Submit Sample Request (POST /)
        submitSampleRequest: builder.mutation({
            query: (sampleData) => ({
                url: "/",
                method: "POST",
                body: sampleData,
            }),
            invalidatesTags: ["SampleRequest"],
        }),

        // 🔹 Get All Sample Requests (GET /)
        getAllSampleRequests: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["SampleRequest"],
        }),

        // 🔹 Update Sample Request Status (PUT /:id/status)
        updateSampleRequestStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["SampleRequest"],
        }),

        // 🔹 Delete Sample Request (DELETE /:id)
        deleteSampleRequest: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SampleRequest"],
        }),

    }),
});

export const {
    useSubmitSampleRequestMutation,
    useGetAllSampleRequestsQuery,
    useUpdateSampleRequestStatusMutation,
    useDeleteSampleRequestMutation,
} = sampleRequestApi;