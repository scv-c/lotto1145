import { io } from "socket.io-client";

//동일도메인 변경으로 인해 바꿈.
const socket = io();

// const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
// const socket = io(baseURL, {
//     withCredentials:true,
//     transports: ['websocket']
// });

export default socket;
