import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 3000;
import userRoute from "./routes/userRoute.js";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our universe!" });
});

app.use("/api/v1/user", userRoute);

// MongoDB connection
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});
