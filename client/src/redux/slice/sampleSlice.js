import { createSlice } from "@reduxjs/toolkit";

const sampleRequestSlice = createSlice({
    name: "sampleRequest",
    initialState: {
        requests: [],
        selectedRequest: null,
    },
    reducers: {
        setSampleRequests: (state, action) => {
            state.requests = action.payload;
        },
        setSelectedSampleRequest: (state, action) => {
            state.selectedRequest = action.payload;
        },
    },
});

export const { setSampleRequests, setSelectedSampleRequest } = sampleRequestSlice.actions;
export default sampleRequestSlice.reducer;