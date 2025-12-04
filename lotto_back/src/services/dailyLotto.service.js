import { dbConnector } from "../config/dbConnector.js";
import { DailyLotto } from "../entities/DailyLotto.entity.js";
import { NotFoundError, ValidationError } from "../utils/error.util.js";
import { LottoUtil } from "../utils/Lotto.util.js";

export class DailyLottoService {
  constructor() {
    this.repository = null;
  }

  getRepository() {
    if (!this.repository) {
      const dataSource = dbConnector.getDataSource();
      this.repository = dataSource.getRepository(DailyLotto);
    }
    return this.repository;
  }

  validateLottoNumbers(numbers) {
    if (numbers.length !== 7) {
      throw new ValidationError("Exactly 7 numbers are required");
    }

    for (const num of numbers) {
      if (typeof num !== "number" || num < 1 || num > 45) {
        throw new ValidationError("Each number must be between 1 and 45");
      }
    }
  }

  async createDailyLotto() {
    const numbers = LottoUtil.getNewLottoNumbers();
    const Seq = LottoUtil.getCurrentSeq();

    const repo = this.getRepository();
    const lotto = repo.create({
      Seq,
      No1: numbers[0],
      No2: numbers[1],
      No3: numbers[2],
      No4: numbers[3],
      No5: numbers[4],
      No6: numbers[5],
      No7: numbers[6],
    });

    return await repo.save(lotto);
  }

  async getDailyLottoBySeq(seq) {
    const repo = this.getRepository();
    const lotto = await repo.findOne({ where: { seq } });

    if (!lotto) {
      throw new NotFoundError("Daily lotto not found");
    }

    return lotto;
  }

  async getAllDailyLottos() {
    const repo = this.getRepository();
    return await repo.find({ order: { No: "DESC" } });
  }
}
