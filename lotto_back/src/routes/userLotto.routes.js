import express from 'express';
import { UserLottoController } from '../controllers/userLotto.controller.js';

const router = express.Router();
const userLottoController = new UserLottoController();

router.post('/', userLottoController.createUserLotto);
router.get('/', userLottoController.getAllUserLottos);
router.get('/user/:uuid', userLottoController.getUserLottosByUUID);

export default router;