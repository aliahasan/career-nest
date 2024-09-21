import express from "express";
import { login, register, updateUser } from "../controllers/userController.js";
import { verifyUser } from "../middlewares/authentication.js";
const router = express.Router();
// router.post("/register", register);
// router.post("/login", login);
// router.put("/profile/update", updateUser);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").put(verifyUser, updateUser);

export default router;
