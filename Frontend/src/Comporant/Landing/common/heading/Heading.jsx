import React from "react";

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div id="heading" style={{ fontSize: "24px" }}>
        <h3>{subtitle} </h3>
        <h1>{title} </h1>
      </div>
    </>
  );
};

export default Heading;
