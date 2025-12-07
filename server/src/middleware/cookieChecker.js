// Step 1: src/middleware/cookie.middleware.js
import { AppError } from "../utils/error.util.js";

/**
 * 특정 쿠키가 존재하는지 검증하는 미들웨어
 * 쿠키가 없으면 401 에러 반환
 * @param {string} cookieName - 검증할 쿠키 이름
 * @param {string} errorMessage - 에러 메시지 (선택)
 */
export const checkCookie = (cookieName, errorMessage) => {
  return (req, res, next) => {
    const cookieValue = req.cookies?.[cookieName];

    if (!cookieValue) {
      console.log("아 왜없냐?", JSON.stringify(req));

      const message = errorMessage || `${cookieName} cookie is required`;
      throw new AppError(message, 401);
    }

    next();
  };
};

/**
 * Body내에 있는 Cookie값을 셋팅함.
 * @param {string} bodyName - 바디에 있는 데이터
 * @param {Object} options - 쿠키옵션 (선택)
 */
export const setCookieFromBody = (bodyName, options = {}) => {
  return (req, res, next) => {
    const bodyValue = req.body?.[bodyName];
    const cookieValue = req.cookies?.[bodyName];

    if (!cookieValue) {
      if (!bodyValue) {
        throw new AppError("쿠키에 추가할 body값이 없습니다.", 400);
      }

      console.log(`Cookie값 추가 | ${bodyName} | ${bodyValue}`);
      res.cookie(bodyName, bodyValue, {
        httpOnly: true,
        secure: true, // HTTPS에서만 동작 (Vercel/Railway는 HTTPS라 필수)
        sameSite: "none",
      });
    }

    next();
  };
};

/**
 * 사용자 UUID 쿠키 필수 검증
 */
export const checkUUID = checkCookie(
  "H_U_I_1",
  "specific cookie value is required."
);
export const setCookieFromBodyUUID = setCookieFromBody("H_U_I_1", {});
