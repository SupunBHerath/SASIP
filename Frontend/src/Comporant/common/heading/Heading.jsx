// Heading.js
import React from "react";
import { Color } from "../../CSS/Css"; 

const Heading = ({ subtitle, title }) => {
  return (
    <div id="heading">
      <h3 style={{ color: Color.SecondaryColor, fontSize: '20px' } }>{subtitle}</h3>
      <h1 className="main-title" >{title}</h1>
    </div>
  );
};

export default Heading;
