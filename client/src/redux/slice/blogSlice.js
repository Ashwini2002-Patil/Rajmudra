import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        selectedBlog: null,
    },
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setSelectedBlog: (state, action) => {
            state.selectedBlog = action.payload;
        },
    },
});

export const { setBlogs, setSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;