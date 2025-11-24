import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes.js";
import { errorHandler } from "../utils/errorHandler.js";

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get("/", (req, res) => {
  res.json({
    message: "Express Server API",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
    },
  });
});

// API 라우트 등록
app.use("/api/users", userRoutes);

// 404 처리
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "요청하신 리소스를 찾을 수 없습니다.",
  });
});

// 에러 핸들러 (마지막에 위치)
app.use(errorHandler);

export default app;
