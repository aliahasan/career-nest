import express from "express";
import {
  login,
  logout,
  register,
  updateUser,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/authentication.js";
const router = express.Router();
// router.post("/register", register);
// router.post("/login", login);
// router.put("/profile/update", updateUser);

router.route("/register").post(register);
router.route("/login").get(login);
router.route("/logout").post(logout);
router.route("/profile/update/:id").put(verifyUser, updateUser);

export default router;
