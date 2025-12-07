import express from "express";
import userRoutes from "./routes/user.routes.js";
import dailyLottoRoutes from "./routes/dailyLotto.routes.js";
import userLottoRoutes from "./routes/userLotto.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ResponseUtil } from "./utils/response.util.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { requestLogger } from "./middleware/loggerMiddleware.js";

const app = express();

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

// 라우트
app.get("/api/health", (req, res) => {
  res.json(
    ResponseUtil.success({
      message: "Welcome to Lotto API",
      version: "1.0.0",
    })
  );
});

app.use("/api/users", userRoutes);
app.use("/api/user-lotto", userLottoRoutes);
app.use("/api/daily-lotto", dailyLottoRoutes);

// 폴더 구조가 /github/lotto1145_back/app.js 라면, ../lotto1145_front/dist 로 가야 합니다.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDistPath = path.join(__dirname, "../fe_dist");

app.use(express.static(frontendDistPath));

// ---------------------------------------------------------
// 2. React 라우팅 지원 (SPA)
// API 요청이 아닌 모든 요청(*)에 대해 index.html을 응답합니다.
// ---------------------------------------------------------
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json(ResponseUtil.error("Route not found", 404));
});

// 에러 핸들러
app.use(errorHandler);

export default app;
