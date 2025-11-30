import { AppError, NotFoundError } from "../utils/error.util.js";
import { LottoUtil } from "../utils/Lotto.util.js";
import { ResponseUtil } from "../utils/response.util.js";
import { DailyLottoService } from "./dailyLotto.service.js";
import { UserService } from "./user.service.js";
import { UserLottoService } from "./userLotto.service.js";

export class WorkerflowService {
  constructor() {
    this.dailyLottoService = new DailyLottoService();
    this.userSevice = new UserService();
    this.userLottoService = new UserLottoService();
  }

  async batchCreateDailyLotto() {
    const dailyLottoInfo = await this.dailyLottoService.createDailyLotto();
    const userLottoLists =
      await this.userLottoService.getAllUserSameSeqLottos();

    if (userLottoLists.length == 0) return;

    const { No: dailyNo, Seq: dailySeq, ...dailyLotto } = dailyLottoInfo;
    const uuids = [];

    //AnsCount(맞친 횟수) 계산
    for (let userLottoList of userLottoLists) {
      let { No, Seq, UUID, AnsCount, ...userLotto } = userLottoList;
      userLottoList.AnsCount = LottoUtil.getAnsCount(dailyLotto, userLotto);
      uuids.push(UUID);
    }

    await this.userLottoService.updateUserLotto(userLottoLists);

    //유저별 최고 수 업데이트
    const userList = await this.userSevice.getUsersByMultiUUID(uuids); // 회차별 참여한 유저정보
    const distinctMaxScoreLottoLists =
      LottoUtil.getDistinctMaxScoreLottoList(userLottoLists); //업데이트할 로또 정보들 중 유저별 가장 큰 AnsCount 회차

    const userUpdateLists = LottoUtil.getUserListsNeedUpdateMaxScore(
      userList,
      distinctMaxScoreLottoLists
    ); // 업데이트에 사용할 로또 정보 추출

    return await this.userSevice.updateUsersMaxScore(userUpdateLists);
  }
}
