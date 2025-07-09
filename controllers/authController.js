const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Hashing error" });

    User.createUser(username, email, hash, (err, result) => {
      if (err) return res.status(500).json({ message: "User exists or DB error" });
      res.status(201).json({ message: "User registered" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({
        message: "Login successful",
        token,
        username: user.username // ✅ Include username here
      });
    });
  });
};


module.exports = { register, login };
