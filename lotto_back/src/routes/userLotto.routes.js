import express from 'express';
import { UserLottoController } from '../controllers/userLotto.controller.js';
import {checkUUID} from '../middleware/cookieChecker.js'
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const userLottoController = new UserLottoController();

router.use(checkUUID);
router.get('/', asyncHandler(userLottoController.getAllUserLottos));
router.get('/create', asyncHandler(userLottoController.createUserLotto));
router.get('/user/mylist', asyncHandler(userLottoController.getUserLottosByUUID));

export default router;