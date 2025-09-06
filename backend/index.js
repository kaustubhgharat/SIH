const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ User schema
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running with MongoDB 🚀");
});

// ✅ Save role API
app.post("/save-role", async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!role || !userId) {
      return res.status(400).json({ error: "Role and userId required" });
    }

    // Check if user exists
    let user = await User.findOne({ userId });

    if (user) {
      // Update role
      user.role = role;
      await user.save();
    } else {
      // Create new user
      user = await User.create({ userId, role });
    }

    res.json({ success: true, role: user.role });
  } catch (err) {
    console.error("❌ Error in /save-role:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get role API (optional)
app.get("/get-role/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
