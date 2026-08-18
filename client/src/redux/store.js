import { configureStore } from "@reduxjs/toolkit";

// API slices (RTK Query)
import { authApi } from "./api/authApi";
import { blogApi } from "./api/blogApi";
import { certificationApi } from "./api/certificationApi";
import { contactApi } from "./api/contactApi";
import { exportInquiryApi } from "./api/exportApi";
import { galleryApi } from "./api/galleryApi";
import { oemInquiryApi } from "./api/oemApi";
import { processStepApi } from "./api/processStepApi";
import { productApi } from "./api/productApi";
import { sampleRequestApi } from "./api/sampleApi";
import { showcaseProductApi } from "./api/showcaseProductApi";
import { uploadApi } from "./api/uploadApi";

// Regular slices (local UI state)
import authReducer from "./slice/authSlice";
import blogReducer from "./slice/blogSlice";
import certificationReducer from "./slice/certificationSlice";
import contactReducer from "./slice/contactSlice";
import exportInquiryReducer from "./slice/exportSlice";
import galleryReducer from "./slice/gallerySlice";
import oemInquiryReducer from "./slice/oemSlice";
import productReducer from "./slice/productSlice";
import sampleRequestReducer from "./slice/sampleSlice";

export const store = configureStore({
    reducer: {
        // RTK Query API reducers
        [authApi.reducerPath]: authApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [certificationApi.reducerPath]: certificationApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [exportInquiryApi.reducerPath]: exportInquiryApi.reducer,
        [galleryApi.reducerPath]: galleryApi.reducer,
        [oemInquiryApi.reducerPath]: oemInquiryApi.reducer,
        [processStepApi.reducerPath]: processStepApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [sampleRequestApi.reducerPath]: sampleRequestApi.reducer,
        [showcaseProductApi.reducerPath]: showcaseProductApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,

        // Regular slice reducers
        auth: authReducer,
        blog: blogReducer,
        certification: certificationReducer,
        contact: contactReducer,
        exportInquiry: exportInquiryReducer,
        gallery: galleryReducer,
        oemInquiry: oemInquiryReducer,
        product: productReducer,
        sampleRequest: sampleRequestReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            blogApi.middleware,
            certificationApi.middleware,
            contactApi.middleware,
            exportInquiryApi.middleware,
            galleryApi.middleware,
            oemInquiryApi.middleware,
            processStepApi.middleware,
            productApi.middleware,
            sampleRequestApi.middleware,
            showcaseProductApi.middleware,
            uploadApi.middleware
        ),
});