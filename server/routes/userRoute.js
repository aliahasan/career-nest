import express from "express";
import {
  login,
  logout,
  register,
  updateUser,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update/:id").put(verifyUser, updateUser);
export default router;
