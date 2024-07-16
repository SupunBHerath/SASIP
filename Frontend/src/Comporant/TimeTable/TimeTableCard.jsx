import React from 'react';
import { Card, CardContent, Typography } from '@mui/material'; // Assuming you're using Material-UI

const TimeTableCard = ({ subjectName, year, lecture, day, time }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {subjectName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Year: {year}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Lecture: {lecture}
        </Typography>
        <Typography color="textSecondary">
          Time: {day} - {time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimeTableCard;
