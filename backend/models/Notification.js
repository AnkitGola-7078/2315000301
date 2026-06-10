const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, index: true },
  notificationType: { type: String, enum: ["Event", "Result", "Placement"], required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

notificationSchema.index({ studentId: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
