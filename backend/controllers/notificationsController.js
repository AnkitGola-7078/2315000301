const Notification = require("../models/Notification");

// Create single notification
exports.createNotification = async (req, res) => {
  try {
    const { studentId, notificationType, message } = req.body;
    const notification = new Notification({ studentId, notificationType, message });
    await notification.save();
    res.json({ status: "created", notification });
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification", details: err.message });
  }
};

// Bulk insert
exports.bulkInsert = async (req, res) => {
  try {
    const notifications = await Notification.insertMany(req.body);
    res.json({ status: "bulk created", notifications });
  } catch (err) {
    res.status(500).json({ error: "Bulk insert failed", details: err.message });
  }
};

// Fetch by studentId
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications", details: err.message });
  }
};
