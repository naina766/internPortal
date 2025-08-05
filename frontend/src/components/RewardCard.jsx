import React from "react";
import "./Reward.css"; // keep your styles here

const RewardCard = ({ reward }) => {
  return (
    <div className="reward-card">
      {reward}
    </div>
  );
};

export default RewardCard;
