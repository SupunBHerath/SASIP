import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { AccessTimeOutlined, SchoolOutlined, LanguageOutlined, PersonOutline } from '@mui/icons-material';
import { Color } from '../CSS/Css';
import { useMediaQuery } from '@mui/material';

const TimeTableCard = ({ subjectName, year, lecture, day, time, classType, Class, medium, note }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:750px)'); 

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      style={{
        backgroundColor: '#F5FFFb',
        width: 530,
        margin: '20px',
        padding: '10px',
        borderRadius: 8,
        boxShadow: isHovered
          ? '0 8px 16px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)'
          : '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        border: '1px solid black',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: isSmallScreen ? '1.2rem' : '1.55rem',
              color: Color.PrimaryColor,
            }}
          >
            {subjectName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: isSmallScreen ? '0.8rem' : '1.10rem', fontWeight: 'bold' }}>
            {year}-{classType.toUpperCase()}
          </Typography>
        </Box>
        <Typography style={{
          marginTop: 8, fontWeight: 'bold',
          fontSize: isSmallScreen ? '0.9rem' : '1.10rem',
          marginBottom: 12,
        }}>
          <PersonOutline style={{ marginRight: 8, color: '#3f51b5' }} />Lecture &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp; {lecture}
        </Typography>
        <Typography style={{
          marginTop: 8, fontWeight: 'bold',
          fontSize: isSmallScreen ? '0.9rem' : '1.10rem',
          marginBottom: 12,
        }}>
          <SchoolOutlined style={{ marginRight: 8, color: '#f50057' }} /> Class &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp; {Class}
        </Typography>
        <Typography style={{
          marginTop: 8, fontWeight: 'bold',
          fontSize: isSmallScreen ? '0.9rem' : '1.10rem',
          marginBottom: 12,
        }}>
          <LanguageOutlined style={{ marginRight: 8, color: '#009688' }} /> Medium &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp; {medium}
        </Typography>
        <Typography style={{
          marginTop: 8, color: '#666', fontWeight: 'bold',
          fontSize: isSmallScreen ? '0.8rem' : '1.10rem',
          marginBottom: 12,
        }}>
          <AccessTimeOutlined style={{ marginRight: 8, color: '#ff9800' }} /> {day} - {time}
        </Typography>
        <hr />
        <Typography style={{
          marginTop: 4, color: 'red', fontWeight: 'bold',
          fontSize: isSmallScreen ? '0.9rem' : '1.0rem',
          textAlign: 'center',
        }}>
          {note}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimeTableCard;
