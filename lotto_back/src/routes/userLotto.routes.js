import express from 'express';
import { UserLottoController } from '../controllers/userLotto.controller.js';
import {checkUUID} from '../middleware/cookieChecker.js'

const router = express.Router();
const userLottoController = new UserLottoController();

router.use(checkUUID);
router.get('/', userLottoController.getAllUserLottos);
router.get('/create', userLottoController.createUserLotto);
router.get('/user/mylist', userLottoController.getUserLottosByUUID);

export default router;