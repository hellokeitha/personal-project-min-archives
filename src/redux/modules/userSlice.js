import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

const initialState = [
  {
    id: shortid.generate(),
    email: "test@gmail.com",
    pw: "1234",
    userName: "홍길동",
    research: "2023 무슨논문: 블라블라",
    isLogin: false,
  },
];

// 리듀서는 state와 action이 필요!
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return state.map((user) => {
        if (
          user.email === action.payload.email &&
          user.pw === action.payload.pw
        ) {
          return { ...user, isLogin: !user.isLogin };
        } else {
          return user;
        }
      });
    },
    join: (state, action) => {
      const newUser = {
        id: shortid.generate(),
        email: action.payload.email,
        pw: action.payload.pw,
        userName: action.payload.name,
        research: action.payload.research,
        isLogin: false,
      };

      state.push(newUser);
    },
    logout: (state, action) => {
      // 여기서 해야하는 동작??? : isLogin을 false
      // map!!!
      //   action.payload
      return state.map((user) => {
        return { ...user, isLogin: false };
      });
    },
  },
});

export const { login, join, logout } = userSlice.actions;
export default userSlice.reducer;

//createSlice API 뼈대

// const counterSlice = createSlice({
// 	name: '', // 이 모듈의 이름
// 	initialState : {}, // 이 모듈의 초기상태 값
// 	reducers : {}, // 이 모듈의 Reducer 로직
// })
