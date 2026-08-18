import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/auth`,
        credentials: "include", // cookie-based JWT sathi आवश्यक (httpOnly cookie)
    }),
    tagTypes: ["Admin"],

    endpoints: (builder) => ({

        // 🔹 Register Admin (POST /register)
        registerAdmin: builder.mutation({
            query: (adminData) => ({
                url: "/register",
                method: "POST",
                body: adminData,
            }),
            invalidatesTags: ["Admin"],
        }),

        // 🔹 Login Step 1 — verify password, send OTP (POST /login)
        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),

        // 🔹 Login Step 2 — verify OTP, get session cookie (POST /login/verify-otp)
        verifyLoginOtp: builder.mutation({
            query: ({ email, otp }) => ({
                url: "/login/verify-otp",
                method: "POST",
                body: { email, otp },
            }),
            invalidatesTags: ["Admin"],
        }),

        // 🔹 Logout Admin (POST /logout)
        logoutAdmin: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            invalidatesTags: ["Admin"],
        }),

        // 🔹 Get Logged-in Admin Profile (GET /me)
        getMe: builder.query({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
            providesTags: ["Admin"],
        }),

    }),
});

export const {
    useRegisterAdminMutation,
    useLoginAdminMutation,
    useVerifyLoginOtpMutation,
    useLogoutAdminMutation,
    useGetMeQuery,
} = authApi;
