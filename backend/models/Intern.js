const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Intern name is required"],
    trim: true,
    minlength: 2
  },
  referralCode: {
    type: String,
    required: [true, "Referral code is required"],
    unique: true,
  },
  donationsRaised: {
    type: Number,
    required: true,
    min: [0, "Donations cannot be negative"],
    default: 0
  },
  rewards: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Intern", internSchema);
