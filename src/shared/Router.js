import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "../pages/Join";
import Main from "../pages/Main";
import Write from "../pages/Write";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Details from "../pages/Details";
import Layout from "./Layout";

import { useSelector } from "react-redux";
import EditPostPage from "../pages/EditPostPage";

const Router = () => {
  // Store에 있는 board, counter, user 모듈 state 조회하기
  const board = useSelector((state) => state.board);
  const counter = useSelector((state) => state.counter);
  const user = useSelector((state) => state.user);
  // 모듈 연결 확인 완료!
  console.log("board->", board);
  console.log("counter->", counter);
  console.log("user-> 모듈 연결 확인 완료!", user);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/write" element={<Write />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/editpost/:id" element={<EditPostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
