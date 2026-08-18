import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const certificationApi = createApi({
    reducerPath: "certificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/certifications`,
        credentials: "include",
    }),
    tagTypes: ["Certification"],

    endpoints: (builder) => ({

        // 🔹 Add Certification (POST /)
        createCertification: builder.mutation({
            query: (certificationData) => ({
                url: "/",
                method: "POST",
                body: certificationData,
            }),
            invalidatesTags: ["Certification"],
        }),

        // 🔹 Get All Certifications (GET /)
        getAllCertifications: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["Certification"],
        }),

        // 🔹 Update Certification (PUT /:id)
        updateCertification: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Certification"],
        }),

        // 🔹 Delete Certification (DELETE /:id)
        deleteCertification: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Certification"],
        }),

    }),
});

export const {
    useCreateCertificationMutation,
    useGetAllCertificationsQuery,
    useUpdateCertificationMutation,
    useDeleteCertificationMutation,
} = certificationApi;