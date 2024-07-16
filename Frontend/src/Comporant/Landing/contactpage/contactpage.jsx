import React from 'react';
import { Container, Grid, Typography, TextField, Box, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, SportsBasketball, Send, MailOutline, Phone, LocationOn } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../../Config/map';

const ContactPage = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '595px',  // Adjust the height as needed
    borderRadius: '8px',
  };
  const center = {
    lat: 6.9052,  // Latitude for Nugegoda, Sri Lanka
    lng: 79.9585, // Longitude for Nugegoda, Sri Lanka
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {/* Left Column - Map View */}
        <Grid item xs={12} md={6}>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}  // Adjust zoom level as needed
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </Grid>

        {/* Right Column - Contact Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: '#f5f5f5',  // Dark white color (light gray)
              borderRadius: '8px',
              padding: '16px',  // Reduced padding for the form
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography variant="h4" gutterBottom>Contact us</Typography>
            <Typography variant="body1" gutterBottom>
              We're open for any suggestion or just to have a chat
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">ADDRESS:</Typography>
                <Typography variant="body1" gutterBottom>
                  198 West 21th Street, Suite 721 New York NY 10016
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">EMAIL:</Typography>
                <Typography variant="body1" gutterBottom>
                  info@yoursite.com
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">PHONE:</Typography>
                <Typography variant="body1" gutterBottom>
                  + 1235 2355 98
                </Typography>
              </Grid>
            </Grid>

            <Box component="form" mt={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    size="small"  // Reduced input size
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    size="small"  // Reduced input size
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Subject"
                margin="normal"
                variant="outlined"
                size="small"  // Reduced input size
                mt={1}
              />
              <TextField
                fullWidth
                label="Create a message here..."
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                size="small"  // Reduced input size
                mt={2}
                InputProps={{
                  endAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Send color="primary" />
                    </Box>
                  ),
                }}
              />
            </Box>

            <Box mt={2}>
              <Typography variant="h6">Follow us here</Typography>
              <Box mt={1} display="flex" gap={2}>
                <Link href="#" color="inherit">
                  <Facebook fontSize="large" sx={{ color: '#4267B2' }} />  {/* Facebook Blue */}
                </Link>
                <Link href="#" color="inherit">
                  <Twitter fontSize="large" sx={{ color: '#1DA1F2' }} />  {/* Twitter Blue */}
                </Link>
                <Link href="#" color="inherit">
                  <Instagram fontSize="large" sx={{ color: '#C13584' }} />  {/* Instagram Pink */}
                </Link>
                <Link href="#" color="inherit">
                  <SportsBasketball fontSize="large" sx={{ color: '#FF6F00' }} />  {/* Dribbble Orange */}
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
