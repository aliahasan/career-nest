import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getDataUri from "../utils/data-uri.js";
import cloudinary from "../utils/cloudinary.js";

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
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      photoURL: cloudResponse.secure_url,
      isGoogleUser: false,
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
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const userId = req.user.userId;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    const updatedUser = {
      fullName: fullName || user.fullName,
      email: email || user.email,
      phoneNumber: phoneNumber || user.phoneNumber,
      profile: {
        ...user.profile,
        bio: bio !== undefined ? bio : user.profile.bio,
        skills: skills
          ? skills.split(",").map((skill) => skill.trim())
          : user.profile.skills,
      },
    };
    if (file) {
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        // update resume filed
        updatedUser.profile.resume = cloudResponse.secure_url;
        updatedUser.profile.resumeName = file.originalname;
      } catch (uploadError) {
        console.error("resume upload failed", uploadError);
      }
    } else {
      // if there is no file , keep the previous file  info
      updatedUser.profile.resume = user.profile.resume || null;
      updatedUser.profile.resumeName = user.profile.resumeName || null;
    }
    user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
      runValidators: true,
      upsert: true, // create new field if there is no filed
    });

    if (!user) {
      return res.status(404).json({
        message: "user can not be updated",
        success: false,
      });
    }

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated successfully",
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error("update error", error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// Google authentication
export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, photoURL, phoneNumber, role, isGoogleUser } =
      req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }
    let user = await User.findOne({ email });

    if (user && !isGoogleUser) {
      return res.status(403).json({
        message: "you can't login with this email",
        success: false,
      });
    }

    if (!user) {
      // Create new user if not found
      user = new User({
        fullName,
        email,
        photoURL,
        phoneNumber,
        role: role || "student",
        isGoogleUser: true,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      message: "Google authentication successful",
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        photoURL: user.photoURL,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
