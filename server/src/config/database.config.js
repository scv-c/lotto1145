import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

// 예시: 경로 확인 로그 추가
// ES Module에서 __dirname, __filename 만들기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "db", "database.sqlite"); // 경로 확인용

console.log("========================================");
console.log("🔥 현재 실행 경로(CWD):", process.cwd());
console.log("🔥 DB 파일 예상 경로:", dbPath);
console.log("========================================");

export const databaseConfig = {
  type: process.env.DB_TYPE || "sqlite",
  database: process.env.DB_DATABASE || "./database.sqlite",

  // PostgreSQL 설정 (추후 사용)
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  synchronize: true, // 개발 환경에서만 true
  logging: true,
  entities: ["./src/entities/*.entity.js"],
  migrations: ["./src/migrations/*.js"], // migration 파일 위치 지정

  ...(isProduction && {
    extra: {
      max: 10,
      min: 2,
      idleTimeoutMillis: 30000, //유휴 연결 타임아웃. postgresql 설정
    },
  }),
};
