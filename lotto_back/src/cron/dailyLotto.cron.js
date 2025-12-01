import cron from "node-cron";
import { WorkerflowService } from "../services/workerflow.service.js";
import socketConnector from "../utils/socket.util.js";
export class DailyLottoCron {
  constructor() {
    console.log(`DailyLottoCron 실행`);
    this.workerflowService = new WorkerflowService();
  }

  init() {
    cron.schedule("* * * * *", async () => {
      console.log(
        `${Date().toString()} 5분간격 자동 업데이트 실행! // 임시 매분, }`
      );

      await this.workerflowService.batchCreateDailyLotto();
    });
  }
}
