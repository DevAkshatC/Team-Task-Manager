const Task = require("../models/Task");

// CREATE TASK (Admin only)
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, deadline } = req.body;

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      deadline
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL TASKS (for logged-in user)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user.id } // user ke tasks
      ]
    }).populate("projectId assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};