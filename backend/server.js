const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Custom Logging Middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logger);


// Routes
app.use("/depots", require("./routes/depots"));
app.use("/vehicles", require("./routes/vehicles"));
app.use("/notify", require("./routes/notify"));
app.use("/notifications", require("./routes/notifications"));
app.use("/scheduler", require("./routes/scheduler"));
app.use("/priority", require("./routes/priority"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB error:", err));

app.listen(3000, () => console.log("Server running on port 3000"));
