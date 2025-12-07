import { LottoUtil } from "../utils/Lotto.util.js";
import { DailyLottoService } from "./dailyLotto.service.js";
import { UserService } from "./user.service.js";
import { UserLottoService } from "./userLotto.service.js";
import { myEventEmitter } from "../utils/eventEmitter.util.js";
import { AppError } from "../utils/error.util.js";
import logger from "../utils/logger.util.js";
import dayjs from "dayjs";
import { v1 } from "uuid";

export class WorkerflowService {
  constructor() {
    this.dailyLottoService = new DailyLottoService();
    this.userSevice = new UserService();
    this.userLottoService = new UserLottoService();
  }

  async batchCreateDailyLotto() {
    const transactionID = v1();
    logger.info(
      `[SERVICE] [ID ${transactionID}] [START] batchCreateDailyLotto 시작`
    );
    try {
      const dailyLottoInfo = await this.dailyLottoService.createDailyLotto();
      logger.info(
        `[SERVICE] [ID ${transactionID}] [INFO] createDailyLotto 성공`
      );

      myEventEmitter.emit("ioEmit", {
        event: "updateNewSeq",
        data: dailyLottoInfo,
      });
      logger.info(`[SERVICE] [ID ${transactionID}] [INFO] Event Emit성공`);

      const userLottoLists =
        await this.userLottoService.getAllUserSameSeqLottos();
      logger.info(
        `[SERVICE] [ID ${transactionID}] [INFO] getAllUserSameSeqLottos 성공`
      );

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
      logger.info(
        `[SERVICE] [ID ${transactionID}] [INFO] updateUserLotto 성공`
      );
      
      myEventEmitter.emit("ioEmit", {
        event: "curSeqHighScoreUser",
        data: LottoUtil.getHighScoreUserInCurrentSeq(userLottoLists),
      });

      //유저별 최고 수 업데이트
      const userList = await this.userSevice.getUsersByMultiUUID(uuids); // 회차별 참여한 유저정보
      const distinctMaxScoreLottoLists =
        LottoUtil.getDistinctMaxScoreLottoList(userLottoLists); //업데이트할 로또 정보들 중 유저별 가장 큰 AnsCount 회차

      const userUpdateLists = LottoUtil.getUserListsNeedUpdateMaxScore(
        userList,
        distinctMaxScoreLottoLists
      ); // 업데이트에 사용할 로또 정보 추출

      await this.userSevice.updateUsersMaxScore(userUpdateLists);
      logger.info(
        `[SERVICE] [ID ${transactionID}] [INFO] updateUserMaxScore 성공`
      );

      //새로 생성한 DailyLotto정보 회신

      logger.info(
        `[SERVICE] [ID ${transactionID}] [FINISH] batchCreateDailyLotto 종료`
      );

      return dailyLottoInfo;
    } catch (error) {
      logger.error(`[SERVICE] [ERROR] batchCreateDailyLotto 에러 발생`);
      throw new AppError(
        `${dayjs().format("YYYY-MM-DD HH:mm:ss")} BATCH Error발생`,
        error.statusCode
      );
    }
  }
}
