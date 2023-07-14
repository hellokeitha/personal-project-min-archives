import React, { useEffect, useState } from "react";
import "../App.css";
import styled from "styled-components";
import api from "../axios/api";
import { Link } from "react-router-dom";
import { bookmarkPost } from "../redux/modules/boardSlice";
import { useDispatch } from "react-redux";

const Main = ({ isActive }) => {
  const [posts, setPosts] = useState(null);

  // hooks
  const dispatch = useDispatch();

  // 조회 함수
  const fetchData = async () => {
    const { data } = await api.get("/posts");
    console.log("data 잘 들어오니? ->", data);
    setPosts(data);
  };

  // 검색 함수
  const [inputSearch, setInputSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryDropdownHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  // ㄴsearch 버튼을 누르면 검색 필터
  // ㄴ하단 Results For < Searched Item >과 관련 태그가 나오게
  const searchBtnClickHanlder = (e) => {
    setInputSearch(e.target.value);
  };

  // ★삭제 함수★
  const onDeleteButtonClickHandler = async (id) => {
    api.delete(`/posts/${id}`);
  };

  // ★수정 함수 -> 게시글 수정 페이지로 이동할 것★

  // ★북마크 상태변경 함수★
  const switchBookmarkHandler = () => dispatch(bookmarkPost(posts.id));
  // const switchBookmarkHandler = async (i) => {
  //   api.patch(`/posts/${i.id}`, {
  //     bookmark: !i.bookmark,
  //   });
  // };

  // data에 있는 내용 불러오는 함수 설정 -> useEffect!
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
          />
          <select value={selectedCategory} onChange={categoryDropdownHandler}>
            <option value="">Select category</option>
            {/* Category option value */}
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <button onClick={searchBtnClickHanlder}>Search</button>
        </div>
        {/* 검색 버튼 누르면 나오게 설정 필요! -> searchBtnClickHanlder */}
        <h1>
          Results for <StBoldFonts>Searched Item</StBoldFonts> in{" "}
          <StBoldFonts>{selectedCategory}</StBoldFonts>
        </h1>
      </div>
      <div>
        <StDatalist>
          {posts?.map((i) => {
            return (
              <div key={i.id}>
                <div>{i.title}</div>
                <div>{i.contents}</div>
                <div>{i.userName}</div>
                <div>{i.category}</div>
                <div>Bookmark: {i.bookmark.toString()}</div>
                <button onClick={switchBookmarkHandler}>북마크</button>
                <button onClick={() => onDeleteButtonClickHandler(i.id)}>
                  DELETE
                </button>
                <Link to={`/details/${i.id}`}>Details</Link>
              </div>
            );
          })}
        </StDatalist>
      </div>
    </>
  );
};

// ***styled components

// 1. Searched Item 볼드처리
const StBoldFonts = styled.p`
  font-weight: 800;
  color: red;
  display: inline; // 한 줄 안에 display
`;

// 2. 데이터 목록 스타일
export const StDatalist = styled.div`
  display: flex; // 가로 정렬
  padding: 10px;
  margin: 10px;
  /* 함수 안의 태그별 스타일 주는거 알아보기! */
`;

export default Main;
