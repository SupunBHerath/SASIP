import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Font } from '../CSS/Css';

const TimeTableCard = ({ image, title, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card 
      onClick={onClick} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      style={{ 
        position: 'relative',
        cursor: 'pointer', 
        width: 345, 
        height: 400,
        transition: 'transform 0.2s ease-in-out',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0px 8px 16px rgba(0, 0, 0, 0.2)' : 'none',
        borderRadius: '8px',
        overflow: 'hidden',
      }} 
      className='shadow-lg'
    >
        <CardContent className='bg-success'>
        <Typography 
          variant="h6" 
          component="div" 
          className='text-bg-success text-center w-100' 
          style={{ fontFamily: Font.PrimaryFont }}
        >
          {title}
        </Typography>
      </CardContent>
        <CardMedia
        component="img"
        alt={title}
        style={{ 
          objectFit: 'cover',
          transition: 'transform 0.2s ease-in-out',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          borderRadius: isHovered ? '8px' : '0'
        }}
        image={image}
      />
      {isHovered && (
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px',
            borderRadius: '8px',
            color: '#fff',
          }}
        >
          <Typography variant="subtitle1" style={{ fontFamily: Font.PrimaryFont }}>
            Click to view time table
          </Typography>
        </div>
      )}
    
    </Card>
  );
};

export default TimeTableCard;
