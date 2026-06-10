const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// Single insert
router.post("/", async (req, res) => {
  try {
    const { studentId, notificationType, message } = req.body;
    const notification = new Notification({ studentId, notificationType, message });
    await notification.save();
    res.json({ status: "created", notification });
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification", details: err.message });
  }
});

// Bulk insert
router.post("/bulk", async (req, res) => {
  try {
    const notifications = await Notification.insertMany(req.body);
    res.json({ status: "bulk created", notifications });
  } catch (err) {
    res.status(500).json({ error: "Bulk insert failed", details: err.message });
  }
});

// Fetch by studentId
router.get("/:studentId", async (req, res) => {
  try {
    const notifications = await Notification.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications", details: err.message });
  }
});

module.exports = router;
