import { Server } from "socket.io";

export default class SocketConnector {
  constructor(httpServer) {
    this.http = httpServer;
    this.io = null;
  }

  init() {
    this.io = new Server(this.http, {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    });

    this.setOn();
  }

  setOn() {
    this.io.on("connection", (socket) => {
      console.log("사용자 연결됨 : ", socket.id);
      this.io.emit("welcome", {
        message: "hihihi",
      });
    });
  }
}
