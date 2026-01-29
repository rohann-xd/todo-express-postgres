// routes/index.routes.js
const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const todoRoutes = require("./todos.routes");
const sendResponse = require("../utils/responseHandler");

// Health check route
router.get("/", (req, res) => {
  return sendResponse(res, 200, true, "System Works");
});

// As per request, adding another health check route
router.get("/health", (req, res) => {
  return sendResponse(res, 200, true, "System Works");
});

// Register auth routes
router.use("/auth", authRoutes);

// Register todos routes
router.use("/todos", todoRoutes);

// 404 Routes
router.use((req, res) => {
  return sendResponse(res, 404, false, "Route not found");
});

module.exports = router;
