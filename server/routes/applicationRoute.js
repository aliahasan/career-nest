import express from "express";
import { verifyUser } from "../middlewares/authentication.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
const router = express.Router();

router.route("/apply-job/:id").post(verifyUser, applyJob);
router.route("/get-applied-jobs").get(verifyUser, getAppliedJobs);
router.route("/get-applicants/:id").get(verifyUser, getApplicants);
router.route("/update-status/:id").patch(verifyUser, updateApplicationStatus);
// ... existing code ...
export default router;
