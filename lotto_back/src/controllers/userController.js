import * as UserModel from "../models/userModel.js";
import {
  successResponse,
  createdResponse,
  notFoundResponse,
  badRequestResponse,
} from "../utils/response.js";
import { asyncHandler } from "../utils/errorHandler.js";

/**
 * 전체 유저 조회
 * GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = UserModel.findAll();
  successResponse(res, users, "유저 목록 조회 성공");
});

/**
 * 특정 유저 조회
 * GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = UserModel.findById(id);

  if (!user) {
    return notFoundResponse(res, "유저를 찾을 수 없습니다");
  }

  successResponse(res, user, "유저 조회 성공");
});

/**
 * 유저 생성
 * POST /api/users
 */
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, age } = req.body;

  // 간단한 유효성 검사
  if (!name || !email) {
    return badRequestResponse(res, "이름과 이메일은 필수입니다");
  }

  const newUser = UserModel.create({ name, email, age });
  createdResponse(res, newUser, "유저 생성 성공");
});

/**
 * 유저 업데이트
 * PUT /api/users/:id
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedUser = UserModel.update(id, updateData);

  if (!updatedUser) {
    return notFoundResponse(res, "유저를 찾을 수 없습니다");
  }

  successResponse(res, updatedUser, "유저 업데이트 성공");
});

/**
 * 유저 삭제
 * DELETE /api/users/:id
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = UserModel.remove(id);

  if (!deleted) {
    return notFoundResponse(res, "유저를 찾을 수 없습니다");
  }

  successResponse(res, null, "유저 삭제 성공");
});
