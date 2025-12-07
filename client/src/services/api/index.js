import axios from "axios";

const api = axios.create({
  //baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  baseURL: "", //동일 도메인 변경이기에 바꿈.
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

console.log("환켱변수:", import.meta.env.VITE_API_BASE_URL);

// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
