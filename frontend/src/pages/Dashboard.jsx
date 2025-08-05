// File: frontend/src/pages/Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Dashboard.css";
import Rewards from "../components/Rewards";

const Dashboard = () => {
  const { dark, toggleTheme } = useTheme();
  const [intern, setIntern] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    referralCode: "",
    donationsRaised: 0,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const computeRewards = (donations) => {
    const rewards = [];
    if (donations >= 1000) {
      rewards.push("🎖 Certificate of Completion");
      rewards.push("🏅 Top Donator Badge");
      rewards.push("🚀 Internship Extension Opportunity");
    } else if (donations >= 500) {
      rewards.push("🎖 Certificate of Completion");
      rewards.push("🏅 Top Donator Badge");
    } else if (donations > 0) {
      rewards.push("🎖 Certificate of Completion");
    }
    return rewards;
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/intern")
      .then((res) => {
        const data = res.data.data;
        const internData = Array.isArray(data) ? data[0] : data;
        const rewards = computeRewards(internData?.donationsRaised || 0);
        setIntern({ ...internData, rewards });
        setFormData({
          name: internData.name || "",
          referralCode: internData.referralCode || "",
          donationsRaised: internData.donationsRaised || 0,
        });
      })
      .catch((err) => console.error("Intern fetch failed:", err));
  }, []);

  const rewards = useMemo(() => {
    return computeRewards(intern?.donationsRaised || 0);
  }, [intern?.donationsRaised]);

  const profile = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    intern?.name || "Guest"
  )}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "donationsRaised" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/intern/${intern._id}`, {
        name: formData.name,
        referralCode: formData.referralCode,
        donationsRaised: formData.donationsRaised,
      });
      const updatedRewards = computeRewards(formData.donationsRaised);
      setIntern({ ...intern, ...formData, rewards: updatedRewards });
      setMessage("Intern updated successfully!");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Update error:", err);
      setMessage("Failed to update intern.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/intern/${intern._id}`);
      setMessage("Intern deleted.");
      setIntern(null);
      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("Failed to delete intern.");
    }
  };

  return (
    <div className="dashboard-background">
      <div className="container dashboard fade-in">
        <div className="dashboard-header">
          <div className="profile-section">
            <img src={profile} alt="Intern" className="profile-pic" />
            <div>
              <h2 className="intern-name">{intern?.name || "Loading..."}</h2>
              <p className="intern-tagline">Intern - 2025 Batch</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="theme-toggle">
            Switch to {dark ? "Light" : "Dark"} Mode
          </button>
        </div>

        {intern ? (
          <>
            {editMode ? (
              <form className="entry-form" onSubmit={handleSubmit}>
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="referralCode"
                  placeholder="Referral Code"
                  value={formData.referralCode}
                  onChange={handleChange}
                  required
                />
                <input
                  name="donationsRaised"
                  type="number"
                  placeholder="Donations"
                  value={formData.donationsRaised}
                  onChange={handleChange}
                  required
                />
                <button className="btn primary" type="submit">Save</button>
                <button className="btn" type="button" onClick={() => setEditMode(false)}>Cancel</button>
              </form>
            ) : (
              <>
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <h3>Referral Code</h3>
                    <p className="referral-code">{intern.referralCode}</p>
                  </div>
                  <div className="dashboard-card">
                    <h3>Total Donations</h3>
                    <p>₹{intern.donationsRaised}</p>
                  </div>
                </div>

                <div className="dashboard-card">
                  <h3>Unlocked Rewards</h3>
                  <div className="rewards-grid">
                    {[...new Set(intern.rewards)].map((reward, i) => (
                      <div key={i} className="reward-card">{reward}</div>
                    ))}
                  </div>
                </div>

                <Rewards />

                <div className="dashboard-actions">
                  <button onClick={() => setEditMode(true)} style={{margin:"1.5rem"}}className="btn edit">Edit Profile</button>

                  <button onClick={handleDelete} className="btn delete">Delete Profile</button>
                </div>
              </>
            )}
          </>
        ) : (
          <p className="loading">Loading intern data...</p>
        )}

        {message && <p className="message">{message}</p>}

        <Link to="/leaderboard" className="btn link">View Leaderboard</Link>
        <button
          onClick={() => {
            setIntern(null);
            navigate("/");
          }}
          className="btn logout"
        >
          Logout
        </button>
      </div>
{/* </div> */}

    </div>
  );
};

export default Dashboard;
