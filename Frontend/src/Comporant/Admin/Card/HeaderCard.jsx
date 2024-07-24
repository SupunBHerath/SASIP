import "./Card.css";
import React, { useState } from "react";
import { Color } from "../../CSS/Css.jsx";
const HeaderCard = (prop) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#ffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    height: '150px',
    transition: 'transform 0.3s ease-in-out',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  return (
    <div  style={cardStyle} 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div className='HeaderCard__left' style={{width:'auto' , height:'90px' }}>
        <img src={prop.icon} alt="" />
      </div>
      <div className='HeaderCard__right  w-100 mt-2  '>
        <h2 style={{color:Color.PrimaryColor , fontWeight:'bold' }}>{prop.title}</h2>
        <h3 style={{ color: Color.SecondaryColor }}>{prop.count}</h3>
      </div>
    </div>
  );
};

export default HeaderCard;
