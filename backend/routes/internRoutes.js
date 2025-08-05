const express = require("express");
const router = express.Router();
const Intern = require("../models/Intern");

// GET: Fetch interns
router.get("/", async (req, res) => {
  try {
    const { name, referralCode } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (referralCode) query.referralCode = referralCode.toUpperCase();

    const interns = await Intern.find(query).sort({ donationsRaised: -1 });

    if (!interns.length) {
      return res.status(404).json({ success: false, message: "No intern(s) found" });
    }

    res.status(200).json({ success: true, data: interns });
  } catch (err) {
    console.error("Error fetching interns:", err.message);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

// POST: Add a new intern
router.post("/", async (req, res) => {
  try {
    const { name, referralCode, donationsRaised, rewards } = req.body;

    const newIntern = new Intern({
      name,
      referralCode,
      donationsRaised: donationsRaised || 0,
      rewards: rewards || []
    });

    const savedIntern = await newIntern.save();
    res.status(201).json({ success: true, data: savedIntern });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Referral code already exists" });
    }

    console.error("Error saving intern:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT: Update intern by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedIntern = await Intern.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedIntern) {
      return res.status(404).json({ success: false, message: "Intern not found" });
    }

    res.status(200).json({ success: true, data: updatedIntern });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("Error updating intern:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE: Delete intern by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedIntern = await Intern.findByIdAndDelete(req.params.id);

    if (!deletedIntern) {
      return res.status(404).json({ success: false, message: "Intern not found" });
    }

    res.status(200).json({ success: true, message: "Intern deleted successfully" });
  } catch (err) {
    console.error("Error deleting intern:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
