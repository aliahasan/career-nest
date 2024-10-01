import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser && this.isNew;
      },
      validate: {
        validator: function (password) {
          return this.isGoogleUser || (password && password.length > 0);
        },
        message: "password is required",
      },
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    photoURL: {
      type: String,
      default: "",
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
