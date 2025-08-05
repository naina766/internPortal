const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
// Dummy data
// const internData = {
//   name: "Naina Varshney",
//   referralCode: "naina2025",
//   donationsRaised: 5300,
//   rewards: ["Certificate", "T-shirt", "LinkedIn Shoutout"]
// };

// const leaderboard = [
//   { name: "Riya", code: "riya2025", donations: 6000 },
//   { name: "Naina", code: "naina2025", donations: 5300 },
//   { name: "Aman", code: "aman2025", donations: 4700 },
// ];

// app.get("/api/intern", (req, res) => {
//   res.json(internData);
// });

// app.get("/api/leaderboard", (req, res) => {
//   res.json(leaderboard);
// });
const internRoutes = require("./routes/internRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

app.use("/api/intern", internRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
