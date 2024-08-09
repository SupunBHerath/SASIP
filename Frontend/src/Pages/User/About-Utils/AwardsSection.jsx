import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AwardCard from './AwardCard'; // Adjust the path as needed

const awards = [
    {
        title: 'Best Innovation',
        photo: 'https://picsum.photos/200/300?random=1',
        description: 'Awarded for the most innovative project of the year.'
    },
    {
        title: 'Outstanding Achievement',
        photo: 'https://picsum.photos/200/300?random=2',
        description: 'Recognized for outstanding achievements in research.'
    },
    {
        title: 'Top Performer',
        photo: 'https://picsum.photos/200/300?random=3',
        description: 'Honored as the top performer in the industry.'
    },
    {
        title: 'Excellence in Education',
        photo: 'https://picsum.photos/200/300?random=4',
        description: 'Awarded for excellence in educational practices.'
    },
    {
        title: 'Best Design',
        photo: 'https://picsum.photos/200/300?random=5',
        description: 'Awarded for the best design of the year.'
    }
];

const AwardsSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (awards.length - 3)); // Loop through slides
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                overflow: 'hidden',
                padding: '20px',
                boxSizing: 'border-box',
                '@media (max-width: 600px)': {
                    padding: '10px',
                },
            }}
        >
            {/* Header */}
            <Typography
                variant="h3"
                component="h2"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: '50px', // Space between header and slideshow
                    textAlign: 'center',
                    '@media (max-width: 600px)': {
                        fontSize: '1.5rem',
                        marginBottom: '30px',
                    },
                }}
            >
                Our Awards
            </Typography>

            {/* Slideshow */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    '@media (max-width: 600px)': {
                        height: 'auto', // Adjust height for small screens
                    },
                    '& .slide-container': {
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${currentIndex * 100 / 4}%)`,
                        width: `${(awards.length + 3) * (100 / 4)}%`, // Ensure enough space for sliding
                        '@media (max-width: 600px)': {
                            width: `${(awards.length + 1) * 100}%`, // Adjust width for small screens
                        },
                    },
                    '& .slide': {
                        flexShrink: 0,
                        width: 'calc(25% - 20px)', // Width of each card minus the margin
                        margin: '0 10px', // Adjust the spacing between cards
                        '@media (max-width: 600px)': {
                            width: 'calc(50% - 10px)', // Adjust width for small screens
                            margin: '0 5px', // Adjust margin for small screens
                        },
                    }
                }}
            >
                <Box className="slide-container">
                    {awards.map((award, index) => (
                        <Box key={index} className="slide">
                            <AwardCard award={award} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default AwardsSlideshow;
