const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, avatarUrl, bio } = req.body;

      // Create a new user following schema
      const user = await User.create({
        name,
        email,
        password, // (We'll hash later, raw for now)
        avatarUrl: avatarUrl || "",
        bio: bio || "",
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);

      if (error.code === 11000) {
        // 11000 = duplicate key error for unique fields
        return res.status(400).json({ error: "Email already exists" });
      }

      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
