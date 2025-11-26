import express from 'express';
import { DailyLottoController } from '../controllers/dailyLotto.controller.js';

const router = express.Router();
const dailyLottoController = new DailyLottoController();

router.post('/', dailyLottoController.createDailyLotto);
router.get('/', dailyLottoController.getAllDailyLottos);
router.get('/:seq', dailyLottoController.getDailyLottoBySeq);

export default router;