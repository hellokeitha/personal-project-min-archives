import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    console.log("inerceptor request success");
    return config;
  },

  // 오류요청을 보내기 전 수행되는 함수
  function (error) {
    console.log("interceptor request error");
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log("interceptor response recieved");
    return response;
  },

  // 요류응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log("interceptor reponse error");
    return Promise.reject(error);
  }
);

export default instance;

// 나중에 배리해보자

// const SERVER_URI = "http://localhost:4001/";

// const getData = async () => {
//   const response = await axios.get(`${SERVER_URI}/data`);
//   return response;
// };

// export { getData };
