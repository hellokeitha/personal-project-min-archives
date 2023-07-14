import { configureStore } from "@reduxjs/toolkit";
import counter from "../modules/counterSlice";
import user from "../modules/userSlice";
import board from "../modules/boardSlice";

const store = configureStore({
  reducer: { counter: counter, user: user, board: board },
});

export default store;
