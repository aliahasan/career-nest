import express from "express";
import { verifyUser } from "../middlewares/authentication.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

// router.route("/apply-job").post(verifyUser, applyJob);
router.route("/apply-job/:id").post(verifyUser, singleUpload, applyJob);
router.route("/get-applied-jobs").get(verifyUser, getAppliedJobs);
router.route("/get-applicants/:id").get(verifyUser, getApplicants);
router.route("/update-status/:id").patch(verifyUser, updateApplicationStatus);
// ... existing code ...
export default router;
