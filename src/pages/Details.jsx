import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNumber } from "../redux/modules/counterSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../axios/api";

const Details = () => {
  // 상태로 foundData 관리
  const [foundData, setFoundData] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("/posts");
      const foundItem = data.find((item) => item.id === parseInt(id));
      if (foundItem) {
        setFoundData(foundItem); // foundData 상태에 값을 설정합니다.
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, [id, navigate]);

  // 비동기함수; 데이터를 아직 불러오지 않았을 때 로딩 상태를 표시합니다.
  if (!foundData) {
    return <div>Loading...</div>;
  }

  // 커피 카운터
  // ㄴconst [number, setNumber] = useState(0);

  // ㄴ여기서 store에 접근하여, counter의 값을 읽어와야겠다면?
  // ㄴseSelector
  // const counter = useSelector((state) => {
  //   return state.counter;
  // });

  // ㄴ"dispatch가 store에서 action을 던진다!" 라는 개념을 기억!
  // const dispatch = useDispatch();

  return (
    <>
      <h1>Details</h1>
      <div>Category: {foundData.category}</div>
      <div>Title: {foundData.title} </div>
      <div>Content Summary: {foundData.contents} </div>
      <div>Preview: </div>
      <br />
      {/* 파일 미리보기 메인으로 보여주기 pdf preview 기능 */}
      {/*<div>선물받은 커피: {counter.number}</div>
       <div>
        <p>커피를 몇잔 선물할까요?</p>
        <h3>{number}</h3>
        <input
          placeholder="커피를 몇잔 선물할까요?"
          type="number"
          value={number}
          onChange={(e) => setNumber(+e.target.number)}
        />{" "}
        <button
          onClick={() => {
            dispatch(addNumber(number));
          }}
        >
          선물하기
        </button>
      </div> */}
      <Link to={`/editpost/${foundData.id}`}>
        <button>Edit</button>
      </Link>
    </>
  );
};
export default Details;
