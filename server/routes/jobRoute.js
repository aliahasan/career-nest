import express from "express";
import {
  createJob,
  getAllJobs,
  getAllJobsOfAdmin,
  getJobById,
} from "../controllers/jobController.js";
import { verifyUser } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/create-job").post(verifyUser, createJob);
router.route("/get-jobs").get(getAllJobs);
router.route("/get-job/:id").get(getJobById);
router.route("/get-recruiter-jobs").get(verifyUser, getAllJobsOfAdmin);

export default router;
