import React from 'react';

const Heading = ({ title, icon: Icon, iconSize = 30 }) => {
  return (
    <div
      id="heading"
      style={{ fontSize: "24px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      data-aos="fade-up"
    >
      {/* {Icon && <Icon style={{ marginRight: '8px', fontSize: "60px" }} data-aos="zoom-in" />} */}
      <div>
        <h1 data-aos="fade-right">{title}</h1>
      </div>
    </div>
  );
};

export default Heading;
