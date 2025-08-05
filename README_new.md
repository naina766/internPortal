# 🧑‍💼 Intern Portal

A full-stack Intern Portal for managing intern details, tracking referrals, donations, rewards, and leaderboard standings.

## 🚀 Features

- 🌐 Login / Landing Page (UI only)
- 📊 Dashboard with:
  - Intern Name, Referral Code, Donations
  - Rewards earned
- 🏆 Leaderboard with search, pagination, edit/delete
- 🎨 Light/Dark Theme Toggle
- 🧠 Responsive Design
- 🔐 Backend APIs (Node.js + Express)
- 🧾 MongoDB Integration (optional for real data)

## 📁 Project Structure

```bash
intern-portal/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Leaderboard.jsx
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── README.md
Tech Stack
Frontend: React, CSS (custom styling)

Backend: Node.js, Express.js

Database: MongoDB (optional / dummy for now)

Others: Axios, React Router, Light/Dark Mode