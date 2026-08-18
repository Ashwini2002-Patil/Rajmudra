import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const processStepApi = createApi({
    reducerPath: "processStepApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/process-steps`,
        credentials: "include",
    }),
    tagTypes: ["ProcessStep"],

    endpoints: (builder) => ({

        // 🔹 Add Process Step (POST /)
        createProcessStep: builder.mutation({
            query: (data) => ({
                url: "/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ProcessStep"],
        }),

        // 🔹 Get All Process Steps (GET /)
        getAllProcessSteps: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["ProcessStep"],
        }),

        // 🔹 Delete Process Step (DELETE /:id)
        deleteProcessStep: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ProcessStep"],
        }),

    }),
});

export const {
    useCreateProcessStepMutation,
    useGetAllProcessStepsQuery,
    useDeleteProcessStepMutation,
} = processStepApi;
