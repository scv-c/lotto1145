import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

/**
 * User Routes
 * Base path: /api/users
 */

// 전체 유저 조회
router.get('/', userController.getAllUsers);

// 특정 유저 조회
router.get('/:id', userController.getUserById);

// 유저 생성
router.post('/', userController.createUser);

// 유저 업데이트
router.put('/:id', userController.updateUser);

// 유저 삭제
router.delete('/:id', userController.deleteUser);

export default router;