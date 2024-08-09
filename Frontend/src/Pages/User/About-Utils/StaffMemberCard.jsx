import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const StaffMemberCard = ({ staff }) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    return (
        <Card
            sx={{ 
                position: 'relative', 
                width: '100%', 
                height: '300px',
                boxShadow: 3,
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'transform 0.3s',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardMedia
                component="img"
                image={staff.photo}
                alt={staff.name}
                sx={{ height: '100%', objectFit: 'cover' }}
            />
            <CardContent
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    transform: hovered ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 0.3s',
                    padding: 2,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" component="div">
                    {staff.name}
                </Typography>
                <Typography variant="body2">
                    {staff.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StaffMemberCard;
