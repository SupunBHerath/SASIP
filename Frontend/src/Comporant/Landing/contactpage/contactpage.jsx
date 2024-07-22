import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Box, Link, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, Send, YouTube, Email, Phone } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../../Config/map';
import 'aos/dist/aos.css';
import AOS from 'aos';

const ContactPage = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '595px',
    borderRadius: '8px',
  };
  const center = {
    lat: 6.9052,
    lng: 79.9585,
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
    } else {
      alert('Message sent successfully!');
      // Handle form submission here
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {/* Left Column - Map View */}
        <Grid item xs={12} md={6} data-aos="fade-right">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </Grid>

        {/* Right Column - Contact Form */}
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
              We're open for any suggestion or just to have a chat
            </Typography>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>ADDRESS:</Typography>
                <Typography variant="body1">
                  Sasip Institute<br />
                  282/7, Highlevel Road,<br />
                  Nugegoda,<br />
                  Sri Lanka<br />
                  Postal Code: 10250
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  <Email sx={{ mr: 1, verticalAlign: 'middle' }} /> EMAIL:
                </Typography>
                <Typography variant="body1">
                  <Link href="mailto:sasip.physics@gmail.com" color="inherit">sasip.physics@gmail.com</Link>
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
                  <Phone sx={{ mr: 1, verticalAlign: 'middle' }} /> PHONE:
                </Typography>
                <Typography variant="body1">
                  0723 825 193<br />
                  0112 825 193
                </Typography>
              </Grid>
            </Grid>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                margin="normal"
                variant="outlined"
                size="small"
                value={formData.subject}
                onChange={handleChange}
                mt={1}
              />
              <TextField
                fullWidth
                label="Create a message here..."
                name="message"
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                size="small"
                value={formData.message}
                onChange={handleChange}
                mt={2}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<Send />}
                sx={{ mt: 2 }}
              >
                Send
              </Button>
            </Box>

            <Box mt={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>Follow us here</Typography>
              <Box display="flex" gap={2}>
                <Link href="#" color="inherit">
                  <Facebook fontSize="large" sx={{ color: '#4267B2' }} />
                </Link>
                <Link href="#" color="inherit">
                  <Twitter fontSize="large" sx={{ color: '#1DA1F2' }} />
                </Link>
                <Link href="#" color="inherit">
                  <Instagram fontSize="large" sx={{ color: '#C13584' }} />
                </Link>
                <Link href="#" color="inherit">
                  <YouTube fontSize="large" sx={{ color: '#FF0000' }} />
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
