const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const User = require("../models/User");


// Get all users
router.get(
  "/users",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res) => {

    try {

      const users = await User.find().select("-password");

      res.json(users);

    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }

  }
);

module.exports = router;