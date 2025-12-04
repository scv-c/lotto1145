import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

export const databaseConfig = {
  type: process.env.DB_TYPE || "sqlite",
  database: process.env.DB_DATABASE || "./database.sqlite",

  // PostgreSQL 설정 (추후 사용)
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  synchronize: isDevelopment && !isProduction, // 개발 환경에서만 true
  logging: isDevelopment ? true : ['error'],
  entities: ["./src/entities/*.entity.js"],

  ...(isProduction && {
    extra : {
      max:10,
      min:2,
      idleTimeoutMillis: 30000, //유휴 연결 타임아웃
    }
  })
};
