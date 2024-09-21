import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    // Extract the token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthenticated user", success: false });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in verifyUser:", error.message);
    return res
      .status(500)
      .json({ message: "Server error during authentication", success: false });
  }
};
