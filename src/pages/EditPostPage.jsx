import React, { useEffect, useState } from "react";
import api from "../axios/api";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../axios/hooks/useInput";
import { useDispatch } from "react-redux";
import { deleteData } from "../redux/modules/boardSlice";

const EditPostPage = () => {
  // 상태로 foundData 관리
  const [foundData, setFoundData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useInput: using custom hook
  const [title, onChangeTitleHandler] = useInput();
  const [contents, onChangeContentsHandler] = useInput();

  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchPosts = async () => {
    const { data } = await api.get("/posts");
    console.log(data);
  };

  // ★수정 함수★
  const onUpdateButtonClickHandler = async () => {
    api.patch(`/posts/${id}`, {
      id: "",
      title,
      contents,
      category,
      bookmark: false,
      isDeleted: false,
    });
    fetchPosts(); // 함수를 실행함과 동시에 전체 데이터 get 로드해오기 위해
    setFoundData(); // 수정해줄 상태값 여기서 세팅
    navigate("/");
  };

  // 업로드 된 파일 이름 보여주기
  // const [selectedFile, setSelectedFile] = useState("업로드 된 파일 이름");

  const categoryButtonHandler = (e) => {
    setSelectedCategory([...selectedCategory, e.target.value]);
    setCategory([...selectedCategory, e.target.value]);
    // 카테고리 중복 선택 가능(태그처럼)
  };

  const onDeleteButtonClickHandler = (id) => {
    dispatch(deleteData(id));
    navigate("/");
  };

  useEffect(() => {
    if (title.length >= 20) {
      alert("제목은 20자 이내로 작성해주세요.");
    }
  }, [title]);

  useEffect(() => {
    if (contents.length >= 100) {
      alert("내용은 100자 이내로 작성해주세요.");
    }
  }, [contents]);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("/posts");
      const foundItem = data.find((item) => item.id === parseInt(id));
      if (foundItem) {
        setFoundData(foundItem); // foundData 상태에 값을 설정
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!foundData) {
    return <div>Loading...</div>; // 데이터를 아직 불러오지 않았을 때 로딩 상태를 표시
  }

  return (
    <>
      <h1>EditPostPage</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          onUpdateButtonClickHandler();
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
        <p>Selected Category: {foundData.category} </p>
        <p>New Selected Category: {selectedCategory}</p>
        <div>
          Data Title:
          <input
            placeholder={foundData.title}
            type="text"
            value={title}
            onChange={onChangeTitleHandler}
          ></input>
        </div>
        <div>
          Contents Summary:
          <input
            placeholder={foundData.contents}
            type="text"
            value={contents}
            onChange={onChangeContentsHandler}
          />
        </div>
        {/* 파일 업로드 기능 추가 */}
        {/* <p>Selected File: {selectedFile}</p> */}
        {/* <button>upload file</button> */}
        <button onClick={() => onDeleteButtonClickHandler(id)}>Delete</button>
        <button type="submit">SAVE</button>
      </form>
    </>
  );
};

export default EditPostPage;
