import express from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:uuid', userController.getUserByUUID);
router.delete('/:uuid', userController.deleteUser);

export default router;