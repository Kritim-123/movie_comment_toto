const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a User using: POST "/api/auth". Doesn't require auth

router.post("/", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user
    .save()
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

module.exports = router;
