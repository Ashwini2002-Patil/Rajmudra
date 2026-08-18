import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        admin: null,
        isAuthenticated: false,
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
            state.isAuthenticated = true;
        },
        clearAdmin: (state) => {
            state.admin = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAdmin, clearAdmin } = authSlice.actions;
export default authSlice.reducer;