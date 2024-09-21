import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorized access", success: false });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error during authentication", success: false });
  }
};
