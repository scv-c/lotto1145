import { UserService } from "../services/user.service.js";
import { ResponseUtil } from "../utils/response.util.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  createUser = asyncHandler(async (req, res) => {
    const user = await this.userService.createUser();
    res
      .status(201)
      .json(ResponseUtil.success(user, "User created successfully", 201));
  });

  getUserByUUID = asyncHandler(async (req, res) => {
    const { H_U_I_1 } = req.cookies;
    const user = await this.userService.getUserByUUID(H_U_I_1);
    res
      .status(200)
      .json(ResponseUtil.success(user, "User retrieved successfully"));
  });

  //테스트용 control 삽입
  getUsersByMultiUUID = asyncHandler(async (req, res) => {
    const { uuids } = req.body;
    const users = await this.userService.getUsersByMultiUUID(uuids);
    res.status(200).json(ResponseUtil.success(users,"Users retrieved successfully"));
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await this.userService.getAllUsers();
    res
      .status(200)
      .json(ResponseUtil.success(users, "Users retrieved successfully"));
  });

  deleteUser = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    await this.userService.deleteUser(uuid);
    res
      .status(200)
      .json(ResponseUtil.success(null, "User deleted successfully"));
  });
}
