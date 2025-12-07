import express from 'express';
import { DailyLottoController } from '../controllers/dailyLotto.controller.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const dailyLottoController = new DailyLottoController();

router.post('/', asyncHandler(dailyLottoController.createDailyLotto));
router.get('/', asyncHandler(dailyLottoController.getAllDailyLottos));
router.get('/:seq', asyncHandler(dailyLottoController.getDailyLottoBySeq));

export default router;