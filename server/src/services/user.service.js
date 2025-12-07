import { dbConnector } from "../config/dbConnector.js";
import { User } from "../entities/User.entity.js";
import {
  NotFoundError,
  ConflictError,
  BadRequestError,
} from "../utils/error.util.js";

export class UserService {
  constructor() {
    this.repository = null;
  }

  getRepository() {
    if (!this.repository) {
      const dataSource = dbConnector.getDataSource();
      this.repository = dataSource.getRepository(User);
    }
    return this.repository;
  }

  async createUser(uuid) {
    const repo = this.getRepository();

    const existingUser = await repo.findOne({ where: { UUID: uuid } });
    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const user = repo.create({ UUID: uuid });
    return await repo.save(user);
  }

  async getUserByUUID(uuid) {
    const repo = this.getRepository();
    const user = await repo.findOne({ where: { UUID: uuid } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  /**
   * 복수개의 UUID 기준 User 조회
   * @param {string[]} uuids
   * @returns object[]
   */
  async getUsersByMultiUUID(uuids) {
    if (!Array.isArray(uuids) || uuids.length === 0) return [];

    const repo = this.getRepository();
    const users = await repo
      .createQueryBuilder()
      .where(`"UUID" IN (:...uuids)`, { uuids })
      .getMany();

    if (users.length == 0) {
      throw new NotFoundError("User not found");
    }

    return users;
  }

  /**
   * UUID기준 유저별 MaxScore값을 업데이트 한다.
   * @param {object[]} updateLottoLists 업데이트할 목록
   * @returns
   */
  async updateUsersMaxScore(updateLottoLists) {
    if (updateLottoLists.length == 0) return;

    const repo = this.getRepository();
    const cases = [];
    const uuids = [];

    for (let updateLottoList of updateLottoLists) {
      const { No, Seq, UUID, AnsCount, ...lottoList } = updateLottoList;
      cases.push(`WHEN UUID = '${UUID}' THEN ${AnsCount}`);
      uuids.push(UUID);
    }

    return await repo
      .createQueryBuilder()
      .update()
      .set({
        MaxScore: () => `CASE ${cases.join(" ")} END`,
      })
      .where(`"UUID" IN (:...uuids)`, { uuids })
      .execute();
  }

  async updateNickname(uuid, nickname) {
    const repo = this.getRepository();

    const result = await repo.update({ UUID: uuid }, { Nickname: nickname });

    if (result.affected === 0) {
      throw new BadRequestError("Fail update. Not Find uuid");
    }

    return result;
  }

  /**
   * MaxScore값이 존재하는 유저만 조회합니다.
   * (+)최대 50명만 노출시키기위해, limit을 줍니다.
   * @returns
   */
  async getAllUserWithMaxScore() {
    const repo = this.getRepository();
    return await repo
      .createQueryBuilder()
      .where(`"MaxScore" IS NOT NULL`)
      .orderBy(`"MaxScore"`, "DESC")
      .limit(50)
      .getMany();
  }

  //getAllUsers(), deleteUser(uuid) 는 안 쓰는것을 권장.
  async getAllUsers() {
    const repo = this.getRepository();
    return await repo.find();
  }

  async deleteUser(uuid) {
    const repo = this.getRepository();
    const user = await this.getUserByUUID(uuid);
    return await repo.remove(user);
  }
}
