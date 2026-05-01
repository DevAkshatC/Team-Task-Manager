const Task = require("../models/Task");

// GET DASHBOARD STATS
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ assignedTo: userId });

    const total = tasks.length;

    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status !== "done").length;

    const today = new Date();

    const overdue = tasks.filter(
      t => t.deadline && new Date(t.deadline) < today && t.status !== "done"
    ).length;

    res.json({
      total,
      completed,
      pending,
      overdue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};