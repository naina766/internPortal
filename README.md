# 🧑‍💼 Intern Portal – Full Stack MERN Project

This is a basic **Full Stack Intern Portal** built using the **MERN stack** – MongoDB, Express.js, React.js, and Node.js. The portal displays intern information, referral codes, donation statistics, and rewards. An leaderboard is also included using backend data.

---

## 🚀 Live Demo

> [🟢 Add your deployed frontend link here (Vercel, GitHub Pages, etc.)]  
Example: https://naina766.github.io/intern-portal

---

## 📂 Project Structure

```
intern-portal/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components (Dashboard, Leaderboard)
│   │   ├── App.js            # Main App entry
│   │   └── App.css           # Styling
│   ├── package.json
│   └── README.md             # (optional frontend-specific readme)

├── server/                   # Node.js + Express backend
│   ├── app.js                # Express server
│   ├── routes/               # API routes
│   └── data/                 # Dummy static JSON (optional)

├── .gitignore
├── README.md                 # This file
└── package.json              # (optional root if monorepo)
```

---

## 🧩 Features

### Frontend (React):
- ✅ Login/Signup page 
- ✅ Intern Dashboard:
  - Intern Name
  - Referral Code (e.g., `naina2025`)
  - Total Donations Raised
  - Static Rewards/Unlockables section
- ✅ Leaderboard Page :
  - List of interns ranked by donation

### Backend (Express.js):
- ✅ REST API with static/dummy JSON data
  - `GET /api/intern` → Intern data
  - `GET /api/leaderboard` → Leaderboard data

---

## 🔌 API Examples

### GET `/api/intern`
```json
{
  "name": "Naina Varshney",
  "referralCode": "naina2025",
  "donationsRaised": 1250
}
```

### GET `/api/leaderboard`
```json
[
  { "name": "Naina", "referralCode": "naina2025", "donations": 1250 },
  { "name": "Riya", "referralCode": "riya2025", "donations": 1100 },
  { "name": "Aarav", "referralCode": "aarav2025", "donations": 950 }
]
```

---

## 🛠️ Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/naina766/intern-portal.git
cd intern-portal
```

### 2. Start the Backend

```bash
cd server
npm install
node app.js
```

API runs on: `http://localhost:5000`

### 3. Start the Frontend

```bash
cd ../frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 🖼️ Screenshots
<img width="403" height="342" alt="image" src="https://github.com/user-attachments/assets/986c3e32-6cbb-4b85-9cef-66bcfeace8d2" />


### 🔹 Dashboard  
<img width="381" height="384" alt="image" src="https://github.com/user-attachments/assets/5426b318-5495-4546-9921-8fb228bad9f7" />


### 🔹 Leaderboard  

<img width="451" height="433" alt="image" src="https://github.com/user-attachments/assets/9c58d828-7a8a-438b-83f3-ac778c2d34b9" />


---

## 🌐 Deployment (Optional)

### GitHub Pages
1. Add to `frontend/package.json`:
```json
"homepage": "https://naina766.github.io/intern-portal"
```

2. Add scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

3. Deploy:
```bash
npm install gh-pages --save-dev
npm run deploy
```

### Vercel (Recommended for React)
1. Go to [https://vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Deploy!

---

## 👩‍💻 Author

**Naina Varshney**  
GitHub: [https://github.com/naina766](https://github.com/naina766)

---

## 📃 License

This project is for educational and demo purposes only.
