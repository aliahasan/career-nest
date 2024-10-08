import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompanyById,
} from "../controllers/companyController.js";
import { verifyUser } from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/register").post(verifyUser, singleUpload, createCompany);
router.route("/get-companies/:id").get(verifyUser, getCompanies);
router.route("/get-company/:id").get(getCompanyById);
router.route("/update-company/:id").put(verifyUser, updateCompanyById);
export default router;
