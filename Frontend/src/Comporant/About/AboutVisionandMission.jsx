import React from "react";
import "./about.css";

const AboutVisionandMission = ({ title, desc }) => {
  return (
    <div className="card" data-aos="fade-up" >
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default AboutVisionandMission;
