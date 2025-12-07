import { Server } from "socket.io";
import { AppError } from "./error.util.js";
import { myEventEmitter } from "./eventEmitter.util.js";

class SocketConnector {
  constructor() {
    this.http = null;
    this.io = null;
    this.myEventEmitter = myEventEmitter;
  }

  init(httpServer) {
    if (this.io) {
      console.log("Socket.io가 이미 초기화 되었습니다.");
      return;
    }

    this.http = httpServer;
    this.io = new Server(this.http, {
      origin: "https://lotto1145-front.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    });

    this.setOn();
  }

  setOn() {
    this.io.on("connection", (socket) => {
      console.log("사용자 연결됨 : ", socket.id);
    });

    this.myEventEmitter.on("ioEmit", ({ event, data }) => {
      console.log(`데이터 확인 ${event}, ${JSON.stringify(data)}`);
      this.ioEmit(event, data);
    });
  }

  ioEmit(ev, data) {
    if (!this.io) {
      throw new AppError("Socket.io가 아직 초기화되지 않았습니다.");
    }
    return this.io.emit(ev, data);
  }
}

export default new SocketConnector();
