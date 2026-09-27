const User = require("../models/User");

// 🔹 Signup
const signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === email.toLowerCase()
            ? "Email already registered"
            : "Username already taken",
      });
    }

    const user = new User({ name, email, username, password });
    await user.save();

    res.status(201).json({
      message: "Signup successful!",
      user: { name: user.name, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Signup failed:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

// 🔹 Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login successful!",
      user: { name: user.name, email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { signup, login };