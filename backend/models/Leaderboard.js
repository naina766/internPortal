const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
  },
  code: {
    type: String,
    required: [true, "Referral code is required"],
    uppercase: true,
    trim: true,
    unique: true,
  },
  donations: {
    type: Number,
    required: [true, "Donation amount is required"],
    min: [0, "Donations cannot be negative"],
  },
  rank: {
  type: Number,
  default: 0
}

}, {
  timestamps: true
});
module.exports = mongoose.model("leaderboard", leaderboardSchema);
