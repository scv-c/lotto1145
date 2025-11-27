import { UserLottoService } from '../services/userLotto.service.js';
import { ResponseUtil } from '../utils/response.util.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export class UserLottoController {
  constructor() {
    this.userLottoService = new UserLottoService();
  }

  createUserLotto = asyncHandler(async (req, res) => {
    const { H_U_I_1 } = req.cookies;
    const userLotto = await this.userLottoService.createNewLotto(H_U_I_1);
    res.status(201).json(
      ResponseUtil.success(userLotto, 'User lotto created successfully', 201)
    );
  });

  getUserLottosByUUID = asyncHandler(async (req, res) => {
    const { H_U_I_1 } = req.cookies;
    const lottos = await this.userLottoService.getUserLottosByUUID(H_U_I_1);
    res.status(200).json(
      ResponseUtil.success(lottos, 'User lottos retrieved successfully')
    );
  });

  getAllUserLottos = asyncHandler(async (req, res) => {
    const lottos = await this.userLottoService.getAllUserLottos();
    res.status(200).json(
      ResponseUtil.success(lottos, 'All user lottos retrieved successfully')
    );
  });

}