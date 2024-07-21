import React, { useState } from 'react';
import { Box, Container, Grid, Typography, IconButton, InputBase, Paper, Link, Divider, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Home, Info, School, Schedule, ContactMail, ContactPhone } from '@mui/icons-material';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openDialog, setOpenDialog] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            // Simulate an API call to subscribe the email
            try {
                // Simulate a successful response
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSnackbarMessage('Thank you for subscribing!');
                setSnackbarSeverity('success');
            } catch (error) {
                setSnackbarMessage('Failed to subscribe. Please try again.');
                setSnackbarSeverity('error');
            }
        } else {
            setSnackbarMessage('Please enter a valid email address.');
            setSnackbarSeverity('warning');
        }
        setOpenSnackbar(true);
        setEmail('');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <Box component="footer" sx={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '3rem 0' }}>
            <Container>
                <Grid container spacing={4}>
                    {/* Left Column: Logo, Description, Social Media Icons */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                            <img src="../../../public/Logo/logohe.png" alt="Sasip Logo" style={{ width: '150px', marginBottom: '1.5rem' }} />
                            <Typography variant="body1" paragraph sx={{ maxWidth: '300px', marginBottom: '1.5rem' }}>
                                Sasip is an educational website providing quality content and resources.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#3b5998', '&:hover': { color: '#fff' } }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#00acee', '&:hover': { color: '#fff' } }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#E1306C', '&:hover': { color: '#fff' } }}>
                                    <Instagram />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Middle Column: Quick Links */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: '1rem' }}>
                            <Link to="/" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', '&:hover': { color: 'primary.main' } }}>
                                <Home />
                                Home
                            </Link>
                            <Link to="/about" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', '&:hover': { color: 'primary.main' } }}>
                                <Info />
                                About
                            </Link>
                            <Link to="/lectures" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', '&:hover': { color: 'primary.main' } }}>
                                <School />
                                Lectures
                            </Link>
                            <Link to="/timetable/all/all" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', '&:hover': { color: 'primary.main' } }}>
                                <Schedule />
                                Timetable
                            </Link>
                            <Link to="/contact" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', '&:hover': { color: 'primary.main' } }}>
                                <ContactMail />
                                Contact Us
                            </Link>
                        </Box>
                    </Grid>

                    {/* Right Column: Subscription */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            Subscribe to our Newsletter
                        </Typography>
                        <Paper component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', marginTop: '1rem', backgroundColor: '#333', borderRadius: '30px' }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1, color: '#fff' }}
                                placeholder="Enter your email"
                                inputProps={{ 'aria-label': 'subscribe to newsletter' }}
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <IconButton type="submit" sx={{ color: '#fff' }}>
                                <Email />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider sx={{ margin: '2rem 0', backgroundColor: '#444' }} />

                <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Sasip. All rights reserved.
                    </Typography>
                    <Typography
                        variant="body2"
                        onClick={handleOpenDialog}
                        sx={{ cursor: 'pointer', textDecoration: 'underline', '&:hover': { color: 'primary.main' } }}
                    >
                        Developed by Nalanda IUHS Campus students
                    </Typography>
                </Box>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Developers</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            Supun B Herath
                        </Typography>
                        <Typography variant="body1">
                            Tharuska Heshan
                        </Typography>
                        <Typography variant="body1">
                            Dhammika prasath
                        </Typography>
                        <Typography variant="body1">
                            Bihan
                        </Typography>
                        <Typography variant="body1">
                            Akash
                        </Typography>
                        <Typography variant="body1">
                            Malindu
                        </Typography>
                        <Typography variant="body1">
                            Himansha Supun
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                            <ContactPhone />
                            Contact us
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Footer;
