import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contacts: [],
        selectedContact: null,
    },
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        setSelectedContact: (state, action) => {
            state.selectedContact = action.payload;
        },
    },
});

export const { setContacts, setSelectedContact } = contactSlice.actions;
export default contactSlice.reducer;