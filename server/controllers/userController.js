import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getDataUri from "../utils/data-uri.js";
import cloudinary from "../utils/cloudinary.js";
import { uploadImage, uploadResume } from "../utils/uploader.js";

// create a new user
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Provide all required information",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        message: "user already exists with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let photo;
    if (req.files) {
      const image = req.files.image[0];
      const fileUri = getDataUri(image);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      photo = cloudResponse.secure_url;
    }
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      photoURL: photo,
    });
    return res.status(201).json({
      message: "user created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!password) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
        success: false,
      });
    }
    // Validate request body
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
        success: false,
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    // Check if the role matches
    if (role !== user.role) {
      return res.status(403).json({
        message: "Unauthorized access",
        success: false,
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const loggedInUser = user.toObject();
    delete loggedInUser.password;
    // Set the token as an HTTP-only cookie and return user info
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        success: true,
        user: { ...loggedInUser, lastLogin: new Date().toISOString() },
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    // Clear the authentication token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Adjust 'sameSite' for production
      maxAge: 0,
    });

    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// update user

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateData = req.body;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    let updatedProfile = currentUser.profile || {};

    // image upload
    if (req.files && req.files.image && req.files.image[0]) {
      updateData.photoURL = await uploadImage(req.files.image[0]);
    }
    // resume upload
    if (req.files && req.files.file && req.files.file[0]) {
      const { resumeUrl, resumeName } = await uploadResume(req.files.file[0]);
      updatedProfile.resume = resumeUrl;
      updatedProfile.resumeName = resumeName;
    }

    // if (req.files) {
    //   // image update
    //   if (req.files.image && req.files.image[0]) {
    //     const photoUri = getDataUri(req.files.image[0]);
    //     const cloudResponse = await cloudinary.uploader.upload(
    //       photoUri.content
    //     );
    //     updateData.photoURL = cloudResponse.secure_url;
    //   }
    //   // resume update
    //   if (req.files.file && req.files.file[0]) {
    //     const fileUri = getDataUri(req.files.file[0]);
    //     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    //     updatedProfile.resume = cloudResponse.secure_url;
    //     updatedProfile.resumeName = req.files.file[0].originalname;
    //   }
    // }

    if (updateData?.bio != null) {
      updatedProfile.bio = updateData.bio.trim();
    }

    if (updateData?.skills) {
      updatedProfile.skills = updateData.skills.map((skill) => skill.trim());
    }

    updateData.profile = {
      ...updatedProfile,
      ...updateData.profile,
    };

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: false,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "profile updated successfully",
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error("server error", error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// Google authentication
