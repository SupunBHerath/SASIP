import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Box, Link, Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Color } from '../../CSS/Css';
import Navbar from '../../Navibar/Navbar';
import Footer from '../../../Pages/User/Footer';
import { contactInfo } from '../../../Data/contactData'; 

const ContactPage = () => {
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
    <>
      <Navbar fixed={true} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          {/* Left Column - Map View */}
          <Grid item xs={12} md={6} data-aos="fade-right">
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15844.848858274774!2d79.8945365!3d6.8651537!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xedc7e5d860211b64!2sSASIP%20Institute!5e0!3m2!1sen!2slk!4v1613981112665!5m2!1sen!2slk"
              sx={{
                width: '100%',
                height: '595px',
                borderRadius: '8px',
                border: 0,
              }}
              allowFullScreen=""
              loading="lazy"
            />
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
              <Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: "center", fontWeight: 900, color: Color.PrimaryColor }}>
                Contact Us
              </Typography>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>ADDRESS:</Typography>
                  <Typography variant="body1">
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.line2}<br />
                    {contactInfo.address.city}<br />
                    {contactInfo.address.country}<br />
                    Postal Code: {contactInfo.address.postalCode}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>EMAIL:</Typography>
                  <Typography variant="body1">
                    <Link href={`mailto:${contactInfo.email}`} color="inherit">{contactInfo.email}</Link>
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 800 }}>PHONE:</Typography>
                  <Typography variant="body1">
                    {contactInfo.phone.join('<br />')}
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
                  sx={{ mt: 1 }}
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
                  sx={{ mt: 2 }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                  sx={{ mt: 2 }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <br /><br />
      <Footer />
    </>
  );
};

export default ContactPage;
