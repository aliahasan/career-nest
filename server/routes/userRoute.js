import express from "express";
import {
  login,
  logout,
  register,
  updateUser,
  googleAuth,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
// this is for google user
router.route("/google-login").post(googleAuth);
router.route("/logout").post(logout);
router.route("/profile/update").put(verifyUser, singleUpload, updateUser);

export default router;
