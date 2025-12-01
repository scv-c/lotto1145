import express from "express";
import { UserController } from "../controllers/user.controller.js";
import {
  setCookieFromBodyUUID,
  checkUUID,
} from "../middleware/cookieChecker.js";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.post("/init", setCookieFromBodyUUID, (req, res) => {
  res.json({ succcess: true });
});

router.use(checkUUID);
router.post("/", userController.createUser);
router.post("/uuids", userController.getUsersByMultiUUID);
router.get("/getMaxScore", userController.getAllUsersWithMaxScore);
router.get("/:uuid", userController.getUserByUUID);
router.delete("/:uuid", userController.deleteUser);

export default router;
