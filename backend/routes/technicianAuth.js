const express = require("express");
const Technician = require("../models/Technician");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const technician = await Technician.findOne({ username, password });

  if (!technician) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    technician: {
      id: technician._id,
      name: technician.name,
      email: technician.email
    }
  });
});

module.exports = router;
