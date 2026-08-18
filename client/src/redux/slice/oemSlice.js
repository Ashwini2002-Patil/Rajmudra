import { createSlice } from "@reduxjs/toolkit";

const oemInquirySlice = createSlice({
    name: "oemInquiry",
    initialState: {
        inquiries: [],
        selectedInquiry: null,
    },
    reducers: {
        setOEMInquiries: (state, action) => {
            state.inquiries = action.payload;
        },
        setSelectedOEMInquiry: (state, action) => {
            state.selectedInquiry = action.payload;
        },
    },
});

export const { setOEMInquiries, setSelectedOEMInquiry } = oemInquirySlice.actions;
export default oemInquirySlice.reducer;