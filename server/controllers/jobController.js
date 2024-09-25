import Job from "../models/job.model.js";

//  create a new job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      jobCategory,
      experienceLevel,
      company, // This is the ObjectId of the company
    } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(400).json({
        message: "Unauthorized access",
        success: false,
      });
    }
    const userId = req.user.userId;

    // Create a new job
    const newJob = new Job({
      title,
      description,
      requirements: requirements.split(",").map((item) => item.trim()),
      salary,
      location,
      jobType,
      position,
      jobCategory,
      experienceLevel,
      company, // This is the objectID of the company
      created_by: userId, // The authenticated user's ID
    });
    // Save the new job to the database
    const savedJob = await newJob.save();
    return res.status(201).json({
      message: "Job created successfully",
      job: savedJob,
      success: true,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  get all the jobs -------------------------------
export const getAllJobs = async (req, res) => {
  try {
    const { search, location, jobType, page = 1, limit = 9 } = req.query;

    // Building the query object
    const query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // Filter by location
    if (location) {
      query.location = location;
    }
    // Filter by jobType
    if (jobType) {
      query.jobType = jobType;
    }
    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Find jobs with search, filtering, and pagination
    const jobs = await Job.find(query)
      .skip(skip) // Pagination
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    // Get total count for pagination
    const totalJobs = await Job.estimatedDocumentCount();

    return res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      totalJobs,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  get job by id -------------------------------
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the job by ID and populate related fields
    const job = await Job.findById(id)
      .populate({
        path: "company",
      })
      .populate("created_by", "fullName email"); // Populate fields from the User model

    // Check if the job was found
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    // Return job details
    return res.status(200).json({
      message: "Job details retrieved successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving job details:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// get all jobs of admin -------------------------------
export const getAllJobsOfAdmin = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({
        message: "Unauthorized access",
        success: false,
      });
    }
    const adminId = req.user.userId;
    const jobs = await Job.find({ created_by: adminId });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found for this admin",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
