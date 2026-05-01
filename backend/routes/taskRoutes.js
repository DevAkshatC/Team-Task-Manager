const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus
} = require("../controllers/taskController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Admin creates task
router.post("/", verifyToken, isAdmin, createTask);

// Get tasks for logged-in user
router.get("/", verifyToken, getTasks);

// Update task status
router.put("/:id", verifyToken, updateTaskStatus);

module.exports = router;