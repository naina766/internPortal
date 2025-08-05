// File: routes/leaderboard.js
const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

// GET: Fetch leaderboard with search & pagination
router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;
    const query = {
      name: { $regex: search, $options: "i" } // case-insensitive name search
    };

    const total = await Leaderboard.countDocuments(query);
    const data = await Leaderboard.find(query)
      .sort({ donations: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ success: true, data, total });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST: Add new leaderboard entry
router.post("/", async (req, res) => {
  try {
    const { name, code, donations } = req.body;

    const newEntry = new Leaderboard({ name, code, donations });
    const saved = await newEntry.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Referral code must be unique" });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT: Update leaderboard entry
router.put("/:id", async (req, res) => {
  try {
    const updated = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE: Delete leaderboard entry
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.status(200).json({ success: true, message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
