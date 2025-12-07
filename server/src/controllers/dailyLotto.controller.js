import { DailyLottoService } from "../services/dailyLotto.service.js";
import { ResponseUtil } from "../utils/response.util.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export class DailyLottoController {
  constructor() {
    this.dailyLottoService = new DailyLottoService();
  }

  createDailyLotto = async (req, res) => {
    const { seq } = req.body;
    const lotto = await this.dailyLottoService.createDailyLotto(seq);
    res
      .status(201)
      .json(
        ResponseUtil.success(lotto, "Daily lotto created successfully", 201)
      );
  };

  getDailyLottoBySeq = async (req, res) => {
    const { seq } = req.params;
    const lotto = await this.dailyLottoService.getDailyLottoBySeq(seq);
    res
      .status(200)
      .json(ResponseUtil.success(lotto, "Daily lotto retrieved successfully"));
  };

  getAllDailyLottos = async (req, res) => {
    const lottos = await this.dailyLottoService.getAllDailyLottos();
    res
      .status(200)
      .json(
        ResponseUtil.success(lottos, "Daily lottos retrieved successfully")
      );
  };
}
