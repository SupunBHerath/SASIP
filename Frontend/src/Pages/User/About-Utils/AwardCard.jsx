import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const AwardCard = ({ award }) => {
    return (
        <Card
            sx={{
                position: 'relative',
                width: '100%',
                height: '300px', // Ensure consistent height for the flip effect
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: 3,
                backgroundColor: 'white',
                perspective: '1000px', // Enables 3D effect
                transition: 'transform 0.6s',
                '&:hover .flip-card-inner': {
                    transform: 'rotateY(180deg)',
                },
            }}
        >
            <Box
                className="flip-card-inner"
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                }}
            >
                {/* Front Side */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <CardMedia
                        component="img"
                        image={award.photo}
                        alt={award.title}
                        sx={{
                            height: '100%',
                            objectFit: 'cover',
                            width: '100%',
                        }}
                    />
                </Box>
                {/* Back Side */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '16px',
                        boxShadow: 3,
                        border: '2px solid blue', // Add blue border
                        borderRadius: '8px' // Optional: to give rounded corners to the border
                    }}
                >
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" component="div">
                            {award.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {award.description}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    );
};

export default AwardCard;
