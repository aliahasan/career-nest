import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register = async () => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

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
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set the token as an HTTP-only cookie and return user info
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Adjust 'sameSite' for production
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiry set to 1 day
      })
      .json({
        user: {
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
        message: "Login successful",
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

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
    console.error("Logout Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you're passing the user ID as a URL parameter
    const { fullName, phoneNumber, password, profile } = req.body;

    // Check if any required fields are missing
    if (!fullName || !phoneNumber || !password) {
      return res.status(400).json({
        message: "Full name, phone number, and password are required",
        success: false,
      });
    }

    // Ensure profile fields exist if provided
    const profileUpdate = {};
    if (profile) {
      if (profile.bio) profileUpdate.bio = profile.bio;
      if (profile.skills && Array.isArray(profile.skills))
        profileUpdate.skills = profile.skills;
      if (profile.resume) profileUpdate.resume = profile.resume;
      if (profile.resumeName) profileUpdate.resumeName = profile.resumeName;
      if (profile.profilePicture)
        profileUpdate.profilePicture = profile.profilePicture;
    }

    // Find the user and update the necessary fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        phoneNumber,
        password,
        profile: profileUpdate,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
