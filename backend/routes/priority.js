const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

router.get("/:studentId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      studentId: req.params.studentId,
      isRead: false
    });

    const weight = { Placement: 3, Result: 2, Event: 1 };

    const sorted = notifications.sort((a, b) => {
      const scoreA = weight[a.notificationType] * 1000000000 + new Date(a.createdAt).getTime();
      const scoreB = weight[b.notificationType] * 1000000000 + new Date(b.createdAt).getTime();
      return scoreB - scoreA;
    });

    res.json(sorted.slice(0, 10));
  } catch (err) {
    res.status(500).json({ error: "Priority fetch failed", details: err.message });
  }
});

module.exports = router;
