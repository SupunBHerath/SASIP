import React, { useState } from "react";

const Head = () => {
  const headStyle = {
    position: 'relative',
    padding: '10px', 
    
  };

  const socialStyle = {
    position: 'absolute',
    top: '30px',  // Adjusted for better alignment
    right: '33px', // Adjusted for better alignment
    display: 'flex',
    gap: '30px',
  };

  const iconStyle = {
    fontSize: '1.5rem',
    color: '#ffffff', // White color for icons
    transition: 'color 0.3s, transform 0.3s',
    cursor: 'pointer', // Added pointer cursor to indicate clickable icons
  };

  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleMouseOver = (icon) => setHoveredIcon(icon);
  const handleMouseOut = () => setHoveredIcon(null);

  return (
    <section style={headStyle} >
      <br /><br />
      <div style={{ height: '100%' }}>
        <div style={socialStyle}>
          <i
            className='fab fa-facebook-f icon'
            style={{
              ...iconStyle,
              ...(hoveredIcon === 'facebook' ? { color: '#007bff', transform: 'scale(1.1)' } : {}),
            }}
            onMouseOver={() => handleMouseOver('facebook')}
            onMouseOut={handleMouseOut}
          ></i>
          <i
            className='fab fa-twitter icon'
            style={{
              ...iconStyle,
              ...(hoveredIcon === 'twitter' ? { color: '#007bff', transform: 'scale(1.1)' } : {}),
            }}
            onMouseOver={() => handleMouseOver('twitter')}
            onMouseOut={handleMouseOut}
          ></i>
          <i
            className='fab fa-youtube icon'
            style={{
              ...iconStyle,
              ...(hoveredIcon === 'youtube' ? { color: '#007bff', transform: 'scale(1.1)' } : {}),
            }}
            onMouseOver={() => handleMouseOver('youtube')}
            onMouseOut={handleMouseOut}
          ></i>
        </div>
      </div>
    </section>
  );
};

export default Head;
