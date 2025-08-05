import React from "react";
import "./Reward.css";

const Rewards = () => {
  return (
    <div className="rewards-section">
      <h3>Available Rewards</h3>
      <div className="rewards-grid">
        <div className="reward-card" title="Awarded on internship completion">
          <div className="reward-icon trophy"></div>
          Certificate of Completion
        </div>
        <div className="reward-card" title="Given to the highest donor">
          <div className="reward-icon medal"></div>
          Top Donator Badge
        </div>
        <div className="reward-card" title="Your name will be shared on social platforms">
          <div className="reward-icon megaphone"></div>
          Shoutout on Social Media
        </div>
        <div className="reward-card" title="Exclusive merchandise just for you">
          <div className="reward-icon giftbox"></div>
          Exclusive Swag
        </div>
        <div className="reward-card" title="Chance to extend your internship">
          <div className="reward-icon rocket"></div>
          Internship Extension Opportunity
        </div>
      </div>
    </div>
  );
};

export default Rewards;
