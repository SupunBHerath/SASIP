import React from "react";

const TeamCard = ({member}) => {
  return (
    <div className="items shadow">
      <div className="img">
        <img
          src={member.cover}
          alt={`${member.name}'s cover`}
          onError={(e) => {
            e.target.src = "/path/to/default-image.jpg"; // Fallback image
          }}
        />
        <div className="overlay">
          <i className="fab fa-facebook-f icon" aria-label="Facebook"></i>
          <i className="fab fa-twitter icon" aria-label="Twitter"></i>
          <i className="fab fa-instagram icon" aria-label="Instagram"></i>
          <i className="fab fa-tiktok icon" aria-label="TikTok"></i>
        </div>
      </div>
      <div className="details">
        <h2>{member.name}</h2>
        <p>{member.work}</p>
      </div>
    </div>
  );
};

export default TeamCard;
