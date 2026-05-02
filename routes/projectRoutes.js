const express = require("express");
const router = express.Router();

const { createProject } = require("../controllers/projectController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Admin only route
router.post("/", verifyToken, isAdmin, createProject);

module.exports = router;