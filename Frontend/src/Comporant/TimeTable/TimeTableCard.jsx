import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { AccessTimeOutlined, SchoolOutlined, LanguageOutlined, PersonOutline } from '@mui/icons-material';

const TimeTableCard = ({ subjectName, year, lecture, day, time, classType, Class, medium }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      style={{
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
            marginBottom: 10,
          }}
        >
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            {subjectName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {year}-{classType.toUpperCase()}
          </Typography>
        </Box>
        <Typography style={{ marginTop: 8 }}>
          <PersonOutline style={{ marginRight: 8, color: '#3f51b5' }} /> Lecture: {lecture}
        </Typography>
        <Typography style={{ marginTop: 8 }}>
          <SchoolOutlined style={{ marginRight: 8, color: '#f50057' }} /> Class: {Class}
        </Typography>
        <Typography style={{ marginTop: 8 }}>
          <LanguageOutlined style={{ marginRight: 8, color: '#009688' }} /> Medium: {medium}
        </Typography>
        <Typography style={{ marginTop: 8, color: '#666' }}>
          <AccessTimeOutlined style={{ marginRight: 8, color: '#ff9800' }} /> {day} - {time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimeTableCard;
