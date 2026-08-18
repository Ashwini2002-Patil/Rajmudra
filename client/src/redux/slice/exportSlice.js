import { createSlice } from "@reduxjs/toolkit";

const exportInquirySlice = createSlice({
    name: "exportInquiry",
    initialState: {
        inquiries: [],
        selectedInquiry: null,
    },
    reducers: {
        setExportInquiries: (state, action) => {
            state.inquiries = action.payload;
        },
        setSelectedExportInquiry: (state, action) => {
            state.selectedInquiry = action.payload;
        },
    },
});

export const { setExportInquiries, setSelectedExportInquiry } = exportInquirySlice.actions;
export default exportInquirySlice.reducer;