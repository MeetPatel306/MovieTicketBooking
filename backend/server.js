require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- DB CONNECT ---------------- */
connectDB();

/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Allow localhost
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }

      // Allow ALL Vercel deployments for this project
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      // Allow Render (for internal calls)
      if (origin.includes("onrender.com")) {
        return callback(null, true);
      }

      // Block everything else
      console.log("CORS blocked origin:", origin);
      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.set("trust proxy", true);

/* Request logs */
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

/* ---------------- ROUTES ---------------- */
app.use("/api", authRoutes);
app.use("/api", bookingRoutes);

/* ---------------- HEALTH ---------------- */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Movie Ticket Booking API Running" });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env: process.env.NODE_ENV,
  });
});

app.get("/api/test-db", (req, res) => {
  res.json({
    state: mongoose.connection.readyState,
    dbName: mongoose.connection.name,
  });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: "Validation Error" });
  }

  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "Duplicate record" });
  }

  res.status(500).json({ success: false, message: err.message || "Server error" });
});

/* ---------------- 404 ---------------- */
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

/* graceful shutdown */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = app;