// Import mongoose
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [{ type: String }],
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    jobType: {
      type: String,
      required: true,
      index: true,
    },
    position: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    jobCategory: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create an index for searching title and description
jobSchema.index({ title: "text", description: "text" });
jobSchema.index({ location: 1, jobType: 1 });

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
