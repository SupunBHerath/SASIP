import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const facilities = [
    {
        title: 'CCTV Surveillance',
        description: 'The entire institution including lecture halls, lobby area restaurants, front office premises are covered by a CCTV camera system throughout the opening hours, and all activities are monitored.',
        imgSrc: 'https://picsum.photos/400/300?random=1',
        position: 'left',
    },
    {
        title: 'Disciplinary Monitoring',
        description: 'When every child joins the institution, they agree to follow a system of disciplinary rules, and they are monitored to see if they act in accordance with them.',
        imgSrc: 'https://picsum.photos/400/300?random=2',
        position: 'right',
    },
    {
        title: 'Emergency Contact',
        description: 'The student is not allowed to go outside the institution for any reason before the end of the class, and in case of an emergency such as illness, the institution gives the opportunity to make a phone call at home or with the special permission of the concerned teacher, so the child can always engage in educational activities safely.',
        imgSrc: 'https://picsum.photos/400/300?random=3',
        position: 'bottom',
    },
    {
        title: 'Identity System',
        description: 'It is computerized to assign an identity number to each child through a barcode ID card. Since it includes all the information provided by the child and parents to the institution, it is easier and safer to deal with the child in case of an emergency as well as when an inquiry is to be made about the child.',
        imgSrc: 'https://picsum.photos/400/300?random=4',
        position: 'left',
    },
    {
        title: 'Experienced Faculty',
        description: 'As a group of famous and experienced teachers of the island work for the faculty of the institution, both the parents and the child get a chance to work with full confidence.',
        imgSrc: 'https://picsum.photos/400/300?random=5',
        position: 'right',
    },
    {
        title: 'On-Site Facilities',
        description: 'There is no need for children to go out of the institution as there are spacious, orderly and clean restaurants, sanitary facilities and basic first aid service in the institution.',
        imgSrc: 'https://picsum.photos/400/300?random=6',
        position: 'bottom',
    },
    {
        title: 'Trained Staff',
        description: 'A well-trained and disciplined workforce is established in the institution and they are always on duty with their uniform and identity card. There is an operation office and kind staff who can solve any problem that may arise about the child.',
        imgSrc: 'https://picsum.photos/400/300?random=7',
        position: 'left',
    },
    {
        title: 'Secure Environment',
        description: 'As no outside person is allowed to enter the lecture hall premises, the child is able to engage in educational activities freely and safely.',
        imgSrc: 'https://picsum.photos/400/300?random=8',
        position: 'right',
    }
];

const FacilitiesSection = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Our Facilities
            </Typography>
            <Grid container spacing={3}> {/* Adjusted spacing */}
                {facilities.map((facility, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            mb: 2, // Margin-bottom for spacing between items
                        }}
                    >
                        <Box sx={{ width: '100%', mb: 1 }}>
                            <img
                                src={facility.imgSrc}
                                alt={facility.title}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            {facility.title}
                        </Typography>
                        <Typography variant="body1">
                            {facility.description}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FacilitiesSection;
