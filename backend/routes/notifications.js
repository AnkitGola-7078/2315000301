const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationsController");

router.post("/", controller.createNotification);
router.post("/bulk", controller.bulkInsert);
router.get("/:studentId", controller.getNotifications);

module.exports = router;
