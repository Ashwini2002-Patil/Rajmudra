import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        items: [],
        selectedItem: null,
    },
    reducers: {
        setGalleryItems: (state, action) => {
            state.items = action.payload;
        },
        setSelectedGalleryItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
});

export const { setGalleryItems, setSelectedGalleryItem } = gallerySlice.actions;
export default gallerySlice.reducer;