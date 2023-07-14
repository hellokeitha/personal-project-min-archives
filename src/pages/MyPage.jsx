import React, { useEffect, useState } from "react";
import api from "../axios/api";
import { Link, useParams } from "react-router-dom";
import { StDatalist } from "./Main";

// login 기능들 구현한 후에 다시

const MyPage = () => {
  const params = useParams();

  const [profile, setProfile] = useState(null);
  const [savedPosts, setSavedPosts] = useState(null);

  const fetchUserData = async () => {
    const { data } = await api.get("/users");
    console.log("user data->", data);
    // 로그인한 user 정보만 가져오기 useParams
    setProfile(data);
  };

  const fetchSavedData = async () => {
    const { data } = await api.get("/posts");
    console.log("saved posts data ->", data);
    setSavedPosts(data);
  };

  // ★북마크 상태변경 함수★
  const switchBookmarkHandler = () => {};

  useEffect(() => {
    fetchUserData();
    fetchSavedData();
  }, []);

  // 데이터를 아직 불러오지 않았을 때 로딩 상태를 표시합니다.
  if (!savedPosts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>MyPage</div>
      <h1>USER NAME</h1>
      <button>Edit Profile</button>
      <ul>
        <li>email</li>
        <li>major</li>
        <li>intro</li>
      </ul>
      <h3>Saved List</h3>
      <StDatalist>
        {savedPosts
          .filter((i) => i.bookmark === true)
          .map((i) => {
            return (
              <div key={i.id}>
                <div>{i.category}</div>
                <div>{i.title}</div>
                <div>{i.contents}</div>
                <div>{i.userName}</div>
                <button onClick={switchBookmarkHandler}>BOOKMARK</button>
                <Link to={`/details/${i.id}`}>Details</Link>
              </div>
            );
          })}
      </StDatalist>
    </>
  );
};

export default MyPage;
