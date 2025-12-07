import express from "express";
import { UserController } from "../controllers/user.controller.js";
import {
  setCookieFromBodyUUID,
  checkUUID,
} from "../middleware/cookieChecker.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.post("/init", setCookieFromBodyUUID, (req, res) => {
  res.json({ succcess: true });
});

router.use(checkUUID);
router.post("/", asyncHandler(userController.createUser));
router.post("/updateNickname", asyncHandler(userController.updateNickname));
//router.post("/uuids", asyncHandler(userController.getUsersByMultiUUID));
router.get("/getUser", asyncHandler(userController.getUserByUUID));
router.get("/getMaxScore", asyncHandler(userController.getAllUsersWithMaxScore));
router.get("/:uuid", asyncHandler(userController.getUserByUUID));
router.delete("/:uuid", asyncHandler(userController.deleteUser));

export default router;
