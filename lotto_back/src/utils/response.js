/**
 * 성공 응답 생성
 */
export const successResponse = (
  res,
  data,
  message = "성공",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * 생성 성공 응답 (201)
 */
export const createdResponse = (res, data, message = "생성 완료") => {
  return successResponse(res, data, message, 201);
};

/**
 * 에러 응답 생성
 */
export const errorResponse = (
  res,
  message = "에러가 발생했습니다",
  statusCode = 500,
  error = null
) => {
  const response = {
    success: false,
    message,
  };

  // 개발 환경에서만 상세 에러 정보 포함
  if (process.env.NODE_ENV === "development" && error) {
    response.error = error.message;
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

/**
 * 404 응답
 */
export const notFoundResponse = (
  res,
  message = "리소스를 찾을 수 없습니다"
) => {
  return errorResponse(res, message, 404);
};

/**
 * 400 잘못된 요청 응답
 */
export const badRequestResponse = (res, message = "잘못된 요청입니다") => {
  return errorResponse(res, message, 400);
};
