import { createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

const initialState = [
  {
    id: "",
    userName: "name 1",
    title: "제목 1",
    contents: "내용 1",
    category: "카테고리 1",
    bookmark: true,
    isDeleted: false,
  },
  {
    id: "",
    userName: "name 2",
    title: "제목 2",
    contents: "내용 2",
    category: "카테고리 2",
    bookmark: true,
    isDeleted: false,
  },
  {
    id: "",
    userName: "name 3",
    title: "제목 3",
    contents: "내용 3",
    category: "카테고리 3",
    bookmark: true,
    isDeleted: false,
  },
];

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },

    deletePost: (state, action) => {
      // api.delete(`/posts/${id}`);
      return state.filter((i) => i.id !== action.payload);
    },
    bookmarkPost: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, bookmark: !item.bookmark };
        } else {
          return item;
        }
      });
    },
  },
});

export const { addPost, deletePost, bookmarkPost } = boardSlice.actions;
export default boardSlice.reducer;
