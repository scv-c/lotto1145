/**
 * 전역 에러 핸들러 미들웨어
 */
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "서버 에러가 발생했습니다";

  const response = {
    success: false,
    message,
  };

  // 개발 환경에서만 스택 트레이스 포함
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

/**
 * 커스텀 에러 클래스
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 비동기 함수 에러 처리 래퍼
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
