import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/upload`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // 🔹 Upload an image file to Cloudinary (multipart/form-data)
    uploadImage: builder.mutation({
      query: ({ file, folder }) => {
        const formData = new FormData()
        formData.append("image", file)
        if (folder) formData.append("folder", folder)
        return { url: "/", method: "POST", body: formData }
      },
    }),
  }),
})

export const { useUploadImageMutation } = uploadApi
