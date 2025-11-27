// Step 1: src/middleware/cookie.middleware.js
import { AppError } from '../utils/error.util.js';

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
      const message = errorMessage || `${cookieName} cookie is required`;
      throw new AppError(message, 401);
    }
    
    next();
  };
};

/**
 * 사용자 UUID 쿠키 필수 검증
 */
export const checkUUID = checkCookie('H_U_I_1', 'specific cookie value is required.');