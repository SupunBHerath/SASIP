import React from "react";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ member }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${member.id}`);
  };

  return (
    <div className="teacher" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="rounded-4 items shadow">
        <div className="img">
          <img
          // style={{ height:380}}
            src={member.imageUrl}
            alt={`${member.name}'s cover`}
            onError={(e) => {
              e.target.src = "/path/to/default-image.jpg"; // Fallback image
            }}
          />
          <div className="overlay rounded-4">
            {member.socialMedia.facebook && (
              <a href={member.socialMedia.facebook} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <i className="fab fa-facebook-f icon" aria-label="Facebook"></i>
              </a>
            )}
            {member.socialMedia.youtube && (
              <a href={member.socialMedia.youtube} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <i className="fab fa-youtube icon" aria-label="YouTube"></i>
              </a>
            )}
            {member.socialMedia.website && (
              <a href={member.socialMedia.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <i className="fas fa-globe icon" aria-label="Website"></i>
              </a>
            )}
          </div>
        </div>
        <div className="details">
          <h2 style={{color:'burlywood',fontWeight:900}}>{member.name}</h2>
          <h5 style={{fontWeight:800}}>{member.subject}</h5>
          {/* <p>{member.medium}</p> */}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
