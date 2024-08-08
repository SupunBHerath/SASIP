import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

const InstituteHistory = () => {
    return (
        <Box mt={5} ml={4}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold' }}>
                        Great History Of Our Institute
                    </Typography>
                    <Typography variant="body1" paragraph>
                        In 2009, the esteemed Amit Pussella had a vision to create an institution that would provide unparalleled education to the youth of Sri Lanka. With the guidance and naming by the revered scholar Arizen Ahubudu, Sasip Institute was born. From its inception, Sasip Institute set out to be more than just a place of learning—it aimed to be a beacon of hope and opportunity for students across the nation.
                        <br /><br />
                        Over the past 15 years, Sasip Institute has grown into a well-known and respected educational institution, recognized for its dedication to quality education and student success. Our growth is driven by a team of over 100 of the country’s most talented and experienced teachers, each bringing their unique expertise and passion to the classroom. Their commitment ensures that our students receive a holistic education that prepares them for the challenges of the future.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img
                        src="../../../accests/landing/logoback.png"
                        alt="Institute History"
                        style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default InstituteHistory;
