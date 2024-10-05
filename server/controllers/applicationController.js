import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import { uploadResume } from "../utils/uploader.js";

export const applyJob = async (req, res) => {
  try {
    const { name, email } = req.body;
    let { resume } = req.body;
    const userId = req.user.userId;
    const jobId = req.params.id;

    if (!userId || !jobId) {
      return res.status(400).json({
        message: "Job ID and User ID are required.",
        success: false,
      });
    }

    // Check if the user has already applied to the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied to this job.",
        success: false,
      });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "No job found.",
        success: false,
      });
    }

    // here i uploaded the resume
    if (req.files && req.files.file && req.files.file[0]) {
      const { resumeUrl } = await uploadResume(req.files.file[0]);
      resume = resumeUrl;
    }

    // Create a new application
    const newApplication = await Application.create({
      name,
      email,
      job: jobId,
      applicant: userId,
      resume: resume || null,
    });

    // Add the application to the job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// get all the applicants for admin
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "No job found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Applicants retrieved successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// update the status of the application
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }
    // find the application by applications id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }
    // update the status of the application
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "status updated successfully.",
      application,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
