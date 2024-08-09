import React from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import StaffMemberCard from './StaffMemberCard'; // Adjust the path as needed

const staffMembers = [
    {
        name: 'Asela Amarasekara',
        photo: '../../../../accests/landing/a.jpg',
        description: 'Management'
    },
    {
        name: 'Ruchika Pussella',
        photo: '../../../../accests/landing/a.jpg',
        description: 'Management'
    },
    {
        name: 'Chandika Jeewanath',
        photo: '../../../../accests/landing/a.jpg',
        description: 'Management'
    },
    {
        name: 'Ajith Balasooriya',
        photo: '../../../../accests/landing/a.jpg',
        description: 'Management'
    }
];

const StaffSection = () => {
    return (
        <Box 
            sx={{ 
                p: { xs: 2, sm: 4 }, // Padding adjusted for different screen sizes
                width: '100%',
                height: 'auto', // Change height to auto for better responsiveness
                mt: { xs: 2, sm: 5 } // Margin-top adjusted for different screen sizes
            }}
        >
            <Typography 
                variant="h3" 
                gutterBottom 
                align="center" 
                sx={{ 
                    fontWeight: 'bold', 
                    fontSize: { xs: 'h5.fontSize', sm: 'h3.fontSize' } // Responsive font size
                }}
            >
                Our Staff
            </Typography>
            <Grid container spacing={4} justifyContent="center" mt={4}>
                {staffMembers.map((staff, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StaffMemberCard staff={staff} />
                    </Grid>
                ))}
            </Grid>
            <Box mt={4} textAlign="center">
                <Typography variant="body1" color="primary">
                    <IconButton href="#" color="primary">
                        View More <ArrowForward />
                    </IconButton>
                </Typography>
            </Box>
        </Box>
    );
};

export default StaffSection;
