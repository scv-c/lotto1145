import { randomUUID } from 'crypto';

/**
 * 쿠키가 없을 경우 자동으로 생성하는 미들웨어
 * @param {string} cookieName - 확인할 쿠키 이름
 * @param {Object} options - 쿠키 옵션
 */
export const ensureCookie = (cookieName = 'H_U_I_1', options = {}) => {
  const defaultOptions = {
    httpOnly: true,
    ...options
  };

  return (req, res, next) => {
    // 쿠키가 없는 경우
    if (!req.cookies || !req.cookies[cookieName]) {
      const cookieValue = randomUUID();
      res.cookie(cookieName, cookieValue, defaultOptions);
      
      // 요청 객체에도 추가 (후속 미들웨어에서 사용 가능)
      req.cookies = req.cookies || {};
      req.cookies[cookieName] = cookieValue;
      
      console.log(`🍪 New cookie created: ${cookieName}=${cookieValue}`);
    }
    
    next();
  };
};