import { createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

const initialState = [];

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      return action.payload;
    },

    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((i) => i.id !== action.payload);
    },
    // ***is not working yet
    bookmarkPost: (state, action) => {
      return state.map((i) => {
        if (i.id === action.payload) {
          return { ...i, bookmark: !i.bookmark };
        } else {
          return i;
        }
      });
    },
    updatePost: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

// Thunk function to fetch data using Axios
export const loadData = () => async (dispatch) => {
  try {
    const response = await api.get("/posts");
    dispatch(fetchData(response.data));
  } catch (error) {
    // Handle error
  }
};

// Thunk function to create data using Axios
export const createData = (data) => async (dispatch) => {
  try {
    const response = await api.post("/posts", data);
    dispatch(addPost(response.data));
  } catch (error) {
    // Handle error
  }
};

// Thunk function to update data using Axios
export const updateData = (id, data) => async (dispatch) => {
  try {
    const response = await api.put(`/posts/${id}`, data);
    dispatch(updatePost(response.data));
  } catch (error) {
    // Handle error
  }
};

// Thunk function to delete data using Axios
export const deleteData = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);
    dispatch(deletePost({ id }));
  } catch (error) {
    // Handle error
  }
};

// Thuck function to switch bookmark status- data using Axios
// ***is not working yet
export const switchBookmark = (id, data) => async (dispatch) => {
  try {
    const response = await api.patch(`/posts/${id}`, data);
    dispatch(bookmarkPost(response.data));
  } catch (error) {
    // handle error
  }
};

export const { fetchData, addPost, deletePost, bookmarkPost, updatePost } =
  boardSlice.actions;
export default boardSlice.reducer;
