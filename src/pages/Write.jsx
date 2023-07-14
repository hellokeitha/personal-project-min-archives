import React, { useEffect, useRef, useState } from "react";
import api from "../axios/api";
import { useNavigate } from "react-router-dom";
import useInput from "../axios/hooks/useInput";

const Write = () => {
  const navigate = useNavigate();

  const titleRef = useRef("");
  const contentRef = useRef("");

  // useInput: using custom hook
  const [title, onChangeTitleHandler] = useInput();
  const [contents, onChangeContentsHandler] = useInput();

  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 업로드 된 파일 이름 보여주기
  // const [selectedFile, setSelectedFile] = useState("업로드 된 파일 이름");

  const categoryButtonHandler = (e) => {
    setSelectedCategory([...selectedCategory, e.target.value]);
    setCategory([...selectedCategory, e.target.value]);
    // 카테고리 중복 선택 가능(태그처럼)
  };

  const fetchPosts = async () => {
    const { data } = await api.get("/posts");
    console.log(data);
  };

  // 새롭게 생성하는 게시글 관리 state
  // const [inputValue, setInputValue] = useState({
  //   id: v4(),
  //   title: "",
  //   userName: "",
  //   contents: "",
  //   category: "",
  //   bookmark: false,
  //   isDeleted: false,
  // });

  useEffect(() => {
    fetchPosts();
  }, []);

  // ★추가 함수★
  // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 DB에 저장
  const onSubmitHandler = async () => {
    // api.post("/posts", inputValue);
    api.post("/posts", {
      id: "",
      title,
      contents,
      category,
      bookmark: false,
      isDeleted: false,
    });
    fetchPosts();
    navigate("/");
  };

  // 화면이 렌더링 될 때 title에 우선 포커스
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (title.length >= 20) {
      contentRef.current.focus();
      alert("제목은 20자 이내로 작성해주세요.");
    }
  }, [title]);

  useEffect(() => {
    if (contents.length >= 100) {
      alert("내용은 100자 이내로 작성해주세요.");
    }
  }, [contents]);

  return (
    <>
      <h1>Write</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          onSubmitHandler();
        }}
      >
        Category:
        <select
          name="category_options"
          value={category}
          onChange={categoryButtonHandler}
        >
          <option value="">Select the category</option>
          <option value="category1">category 1</option>
          <option value="category2">category 2</option>
          <option value="category 3">category 3</option>
        </select>
        <p>Selected Category: {selectedCategory}</p>
        <div>
          Data Title:
          <input
            type="text"
            value={title}
            onChange={onChangeTitleHandler}
            // onChange={(e) => {
            //   setTitle(e.target.value);
            //   // setInputValue({
            //   //   title: e.target.value,
            //   // });
            // }}
            ref={titleRef}
          />
        </div>
        <div>
          Contents Summary:
          <input
            type="text"
            value={contents}
            onChange={onChangeContentsHandler}
            ref={contentRef}
          />
        </div>
        {/* 파일 업로드 기능 추가 */}
        {/* <p>Selected File: {selectedFile}</p> */}
        {/* <button>upload file</button> */}
        <button type="submit">SAVE</button>
      </form>
    </>
  );
};

export default Write;
