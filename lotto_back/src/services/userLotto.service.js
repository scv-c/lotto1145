import { dbConnector } from "../config/dbConnector.js";
import { UserLotto } from "../entities/UserLotto.entity.js";
import { UserService } from "./user.service.js";
import { ValidationError } from "../utils/error.util.js";
import { LottoUtil } from "../utils/Lotto.util.js";

export class UserLottoService {
  constructor() {
    this.repository = null;
    this.userService = new UserService();
  }

  getRepository() {
    if (!this.repository) {
      const dataSource = dbConnector.getDataSource();
      this.repository = dataSource.getRepository(UserLotto);
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

  async createUserLotto(uuid) {
    // 사용자 존재 확인
    await this.userService.getUserByUUID(uuid);

    const numbers = LottoUtil.getNewLottoNumbers();
    const timestamp = LottoUtil.getCurrentSeq();
    this.validateLottoNumbers(numbers);

    const repo = this.getRepository();
    const userLotto = repo.create({
      UUID: uuid,
      Seq: timestamp,
      No1: numbers[0],
      No2: numbers[1],
      No3: numbers[2],
      No4: numbers[3],
      No5: numbers[4],
      No6: numbers[5],
      No7: numbers[6],
    });

    return await repo.save(userLotto);
  }

  /**
   * 특정 유저의 Lotto정보 전체 조회
   * @param {string} uuid 
   * @returns array
   */
  async getUserLottosByUUID(uuid) {
    await this.userService.getUserByUUID(uuid);

    const repo = this.getRepository();

    return await repo.find({
      where: { UUID: uuid },
      order: { No: "DESC" },
    });
  }

  async getAllUserLottos() {
    const repo = this.getRepository();
    return await repo.find({ order: { No: "DESC" } });
  }

  /**
   * 현재기준 회차(Seq)에 일치하는 것들만 조회하여 응답한다.
   * 5분전 ~ 현재시간-1분;
   * @returns {object[]} DB조회결과
   */
  async getAllUserSameSeqLottos() {
    const repo = this.getRepository();

    const from = LottoUtil.getBefore5mSeq();
    const end = LottoUtil.getCurrentSeq();

    return await repo
      .createQueryBuilder("e")
      .where("e.Seq >= :from", { from })
      .andWhere("e.Seq < :end", { end })
      .getMany();
  }

  async createNewLotto(uuid) {
    try {
      await this.userService.getUserByUUID(uuid);
    } catch (error) {
      await this.userService.createUser(uuid);
    }

    return await this.createUserLotto(uuid);
  }

  async updateUserLotto(newUserLottoLists) {
    const repo = this.getRepository();
    const cases = [];
    const Noes = [];

    for (const newUserLottoList of newUserLottoLists) {
      const { No, AnsCount } = newUserLottoList;
      cases.push(`WHEN No = ${No} THEN ${AnsCount}`);
      Noes.push(No);
    }

    return await repo
      .createQueryBuilder()
      .update()
      .set({
        AnsCount: () => `CASE ${cases.join(" ")} END`,
      })
      .where(`No IN (${Noes.join(",")})`)
      .execute();
  }
}
