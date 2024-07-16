import React from "react";
import "./about.css";

const AboutVisionandMission = ({ title, desc, icon }) => {
  return (
    <div className="card" data-aos="fade-up">
      <div className="icon text-center">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="card-body p-0">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{desc}</p>
      </div>
    </div>
  );
};

export default AboutVisionandMission;
