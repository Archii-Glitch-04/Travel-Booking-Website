require("dotenv").config(); // ✅ Load environment variables first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const trainRoutes = require("./routes/trainRoutes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// ✅ Routes
app.use("/", trainRoutes);

// ✅ MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
