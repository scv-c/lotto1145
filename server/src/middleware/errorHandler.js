import { ResponseUtil } from "../utils/response.util.js";
import { AppError } from "../utils/error.util.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  }

  if (err instanceof AppError) {
    return res
      .status(statusCode)
      .json(ResponseUtil.error(message, statusCode, err.errors || null));
  }

  // TypeORM 에러 처리
  if (err.name === "QueryFailedError") {
    statusCode = 400;
    message = "Database query failed";
  }

  res.status(statusCode).json(ResponseUtil.error(message, statusCode));
};

/**
 * 비동기 라우트 핸들러를 래핑하여 에러를 자동으로 next()로 전달
 * @param {Function} fn - 비동기 컨트롤러 함수
 * @returns {Function} Express 미들웨어 함수
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    const handlerName = fn.name || "anonymous_hanlder";
    req.logger.info(`[START] ${handlerName} 호출`);

    Promise.resolve(fn(req, res, next))
      .then((res) => {
        req.logger.info(`[FINISH] ${handlerName} 완료`);
        return res;
      })
      .catch((e) => {
        req.logger.error(`[ERROR] ${handlerName}: ${e.message}`);
        return next(e);
      });
  };
};
