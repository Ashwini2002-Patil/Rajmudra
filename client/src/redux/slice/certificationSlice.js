import { createSlice } from "@reduxjs/toolkit";

const certificationSlice = createSlice({
    name: "certification",
    initialState: {
        certifications: [],
        selectedCertification: null,
    },
    reducers: {
        setCertifications: (state, action) => {
            state.certifications = action.payload;
        },
        setSelectedCertification: (state, action) => {
            state.selectedCertification = action.payload;
        },
    },
});

export const { setCertifications, setSelectedCertification } = certificationSlice.actions;
export default certificationSlice.reducer;